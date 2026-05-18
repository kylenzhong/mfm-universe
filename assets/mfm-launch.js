/* MFM Universe — launch instrumentation + newsletter widgets.
 *
 * What this file does, in order:
 *   1. Bootstraps Vercel Web Analytics + Speed Insights queues so any
 *      tracking calls made before the deferred scripts load are buffered.
 *   2. Exposes window.mfm.track(name, props) — a thin wrapper around
 *      window.va('event', ...) so we have one chokepoint for events.
 *   3. Auto-instruments tile clicks, nav clicks, scroll depth (25/50/75/100),
 *      and outbound link clicks. No per-element setup required.
 *   4. Wires up any <form data-mfm-form="newsletter" data-source="..."> on the
 *      page so it submits to /api/subscribe and shows success/error state.
 *   5. Injects the newsletter modal popup, triggering on whichever fires
 *      first: 60s after pageload OR exit-intent (mouse leaves toward top edge,
 *      or pagehide on mobile). 30-day suppression after dismiss; permanent
 *      after submit.
 *
 * The popup is opt-in via <body data-mfm-popup="newsletter">. Subpages that
 * don't carry the cream-blue v2 design system (App_Pipeline, MFM_Episodes,
 * etc.) skip the popup but still get analytics.
 */

(function () {
  'use strict';

  // ── Analytics bootstrap (queues events before script loads) ────────────
  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };
  window.si = window.si || function () {
    (window.siq = window.siq || []).push(arguments);
  };

  // Public helper. Use mfm.track('event_name', { foo: 'bar' }).
  // Event names are lower_snake_case. Props are flat strings/numbers only.
  function track(name, props) {
    try {
      window.va('event', { name: String(name).slice(0, 64), ...(props || {}) });
    } catch (e) {
      // analytics must never break the page
      if (window.console) console.warn('[mfm.track]', e);
    }
  }

  // ── Auto-instrumentation ───────────────────────────────────────────────
  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  function instrumentClicks() {
    document.addEventListener('click', function (e) {
      const target = e.target.closest('a, button, [data-mfm-click]');
      if (!target) return;

      // Tiles (home page grid)
      const tile = target.closest('.tile');
      if (tile) {
        const cls = [...tile.classList].find(c => c !== 'tile' && c !== 'coming-soon');
        track('tile_click', {
          tile: cls || 'unknown',
          coming_soon: tile.classList.contains('coming-soon') ? 1 : 0,
        });
        return;
      }

      // Explicit opt-in via data-mfm-click="name"
      const explicit = target.getAttribute('data-mfm-click');
      if (explicit) {
        track(explicit, { href: target.getAttribute('href') || '' });
        return;
      }

      // Outbound links
      if (target.tagName === 'A' && target.href) {
        const isOutbound = target.host && target.host !== window.location.host;
        if (isOutbound) {
          track('outbound_click', {
            host: target.host,
            path: target.pathname || '/',
          });
        }
      }
    }, { capture: true });
  }

  function instrumentScroll() {
    const milestones = [25, 50, 75, 100];
    const seen = new Set();
    function onScroll() {
      const doc = document.documentElement;
      const h = (doc.scrollHeight - doc.clientHeight) || 1;
      const pct = Math.min(100, Math.round((doc.scrollTop / h) * 100));
      for (const m of milestones) {
        if (pct >= m && !seen.has(m)) {
          seen.add(m);
          track('scroll_depth', { pct: m });
        }
      }
    }
    let raf = 0;
    window.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(function () { raf = 0; onScroll(); });
    }, { passive: true });
  }

  // ── Form submission ────────────────────────────────────────────────────
  async function submitEmail(email, source) {
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: source || 'unknown' }),
      });
      if (!r.ok) {
        let err = 'server_error';
        try { const j = await r.json(); err = j.error || err; } catch (e) {}
        return { ok: false, error: err };
      }
      return await r.json();
    } catch (e) {
      return { ok: false, error: 'network_error' };
    }
  }

  function wireForms() {
    const forms = document.querySelectorAll('form[data-mfm-form="newsletter"]');
    forms.forEach(function (form) {
      if (form.__mfmWired) return;
      form.__mfmWired = true;
      const input  = form.querySelector('input[type="email"]');
      const submit = form.querySelector('button[type="submit"], .mfm-submit');
      const status = form.querySelector('.mfm-form-status') ||
                     form.parentElement.querySelector('.mfm-form-status');
      const source = form.getAttribute('data-source') || 'inline';

      function setStatus(text, kind) {
        if (!status) return;
        status.textContent = text;
        status.classList.remove('is-error', 'is-success');
        if (kind) status.classList.add('is-' + kind);
      }

      form.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = (input.value || '').trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
          input.setAttribute('aria-invalid', 'true');
          setStatus("That email doesn't look right.", 'error');
          input.focus();
          return;
        }
        input.removeAttribute('aria-invalid');
        if (submit) { submit.disabled = true; submit.dataset.label = submit.textContent; submit.textContent = 'Adding…'; }
        setStatus('', null);

        track('newsletter_submit_attempt', { source: source });
        const result = await submitEmail(email, source);

        if (result.ok) {
          track('newsletter_submit_success', { source: source, provider: result.provider || 'log' });
          form.style.display = 'none';
          setStatus("You're on the list. Look for the first issue soon.", 'success');
          // Permanently suppress the popup once any signup succeeds.
          try { localStorage.setItem('mfm_newsletter_signed_up', '1'); } catch (e) {}
        } else {
          track('newsletter_submit_error', { source: source, error: result.error || 'unknown' });
          setStatus("Couldn't add that — try again in a moment.", 'error');
          if (submit) { submit.disabled = false; submit.textContent = submit.dataset.label || 'Subscribe'; }
        }
      });
    });
  }

  // ── Popup ──────────────────────────────────────────────────────────────
  const POPUP_HTML = `
    <div class="mfm-modal-root" id="mfm-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="mfm-modal-title">
      <div class="mfm-modal-overlay" data-mfm-dismiss="overlay"></div>
      <div class="mfm-modal-card">
        <button class="mfm-modal-close" type="button" aria-label="Close" data-mfm-dismiss="close">&times;</button>
        <div class="mfm-modal-badge">Newsletter · Launching soon</div>
        <h2 class="mfm-modal-title" id="mfm-modal-title">Get the operator&rsquo;s digest</h2>
        <p class="mfm-modal-body">A weekly read for people who screenshot ideas from MFM and never go back to them. <strong>One email, every Friday.</strong> No spam, unsubscribe in one click.</p>
        <form class="mfm-form" data-mfm-form="newsletter" data-source="popup" novalidate>
          <input class="mfm-input" type="email" name="email" placeholder="you@working-on-it.com" autocomplete="email" required>
          <button class="mfm-submit" type="submit">Subscribe</button>
        </form>
        <div class="mfm-form-status" aria-live="polite"></div>
        <p class="mfm-form-note">Built by a 4-year fan, not the MFM team.</p>
      </div>
    </div>
  `;

  const POPUP_KEY_DISMISSED = 'mfm_newsletter_popup_dismissed_until';
  const POPUP_KEY_SIGNED_UP = 'mfm_newsletter_signed_up';
  const SUPPRESS_DAYS = 30;
  const DELAY_MS = 60 * 1000;

  function popupSuppressed() {
    try {
      if (localStorage.getItem(POPUP_KEY_SIGNED_UP) === '1') return true;
      const until = parseInt(localStorage.getItem(POPUP_KEY_DISMISSED) || '0', 10);
      return until && Date.now() < until;
    } catch (e) {
      return false;
    }
  }

  function markDismissed() {
    try {
      localStorage.setItem(POPUP_KEY_DISMISSED, String(Date.now() + SUPPRESS_DAYS * 86400 * 1000));
    } catch (e) {}
  }

  function injectPopup() {
    if (popupSuppressed()) return null;
    const host = document.createElement('div');
    host.innerHTML = POPUP_HTML;
    const root = host.firstElementChild;
    document.body.appendChild(root);
    return root;
  }

  function setupPopup() {
    if (document.body.getAttribute('data-mfm-popup') !== 'newsletter') return;
    const root = injectPopup();
    if (!root) return;

    wireForms(); // wire the newly injected form

    let shown = false;
    let timer = 0;
    function open(trigger) {
      if (shown || popupSuppressed()) return;
      shown = true;
      clearTimeout(timer);
      root.setAttribute('data-open', 'true');
      root.setAttribute('aria-hidden', 'false');
      track('newsletter_popup_shown', { trigger: trigger });
      // Focus the email input for accessibility.
      const input = root.querySelector('input[type="email"]');
      if (input) setTimeout(function () { input.focus(); }, 280);
    }
    function close(reason) {
      if (!shown) return;
      shown = false;
      root.removeAttribute('data-open');
      root.setAttribute('aria-hidden', 'true');
      markDismissed();
      track('newsletter_popup_dismissed', { reason: reason });
    }

    // Dismiss on overlay click, close button, ESC.
    root.addEventListener('click', function (e) {
      const t = e.target.closest('[data-mfm-dismiss]');
      if (!t) return;
      close(t.getAttribute('data-mfm-dismiss'));
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && shown) close('esc');
    });

    // Trigger 1 — 60s timer.
    timer = setTimeout(function () { open('timer'); }, DELAY_MS);

    // Trigger 2 — exit-intent (desktop).
    function onMouseOut(e) {
      if (e.clientY > 5) return;          // only top edge
      if (e.relatedTarget) return;         // moved to another element
      if (document.hasFocus && !document.hasFocus()) return;
      open('exit_intent');
    }
    document.addEventListener('mouseout', onMouseOut);

    // Trigger 3 — pagehide on mobile (close-tab / app-switch heuristic).
    // Fires once; we don't show popup *after* hide, but we record intent.
    window.addEventListener('pagehide', function () {
      // No DOM operation here — page is leaving. The localStorage write in
      // markDismissed() would be cancelled. Just track intent.
      if (!shown) track('newsletter_popup_skipped', { reason: 'pagehide' });
    });
  }

  // ── Boot ───────────────────────────────────────────────────────────────
  ready(function () {
    instrumentClicks();
    instrumentScroll();
    wireForms();
    setupPopup();
    track('page_view', {
      path: window.location.pathname,
      ref: (document.referrer || '').slice(0, 200),
    });
  });

  // Expose tiny public API for ad-hoc tracking from page scripts.
  window.mfm = window.mfm || {};
  window.mfm.track = track;
})();
