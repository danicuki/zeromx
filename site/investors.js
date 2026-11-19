/* ZeroMX dedicated Investor Brief page logic. Shares TRANSLATIONS from i18n.js. */

let currentLang = 'en';
let investorSubmitted = '';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSource() {
  const params = new URLSearchParams(window.location.search);
  const utm = params.get('utm_source') || params.get('ref');
  if (utm) return utm;
  if (document.referrer) {
    try {
      return new URL(document.referrer).hostname.replace(/^www\./, '');
    } catch (_) {
      return 'direct';
    }
  }
  return 'direct';
}

window.va = window.va || function () {
  (window.vaq = window.vaq || []).push(arguments);
};

function trackEvent(event) {
  if (['localhost', '127.0.0.1', ''].includes(window.location.hostname)) return;
  if (typeof window.va === 'function' && event !== 'investor_pageview') {
    window.va('event', { name: event });
  }
  fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, source: getSource() }),
    keepalive: true
  }).catch(() => {});
}

function renderInvestorForm() {
  const dict = TRANSLATIONS[currentLang];
  const mount = document.getElementById('investorFormMount');
  if (!mount) return;

  if (investorSubmitted) {
    mount.innerHTML = `
      <div class="wl-success-box">
        <div class="wl-success-head">
          <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" style="width: 36px; height: 36px;">
            <circle cx="16" cy="16" r="16" fill="currentColor" />
            <path d="M9.5 16.5l4.5 4.5 8.5-9.5" fill="none" stroke="#f3efe6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3>${escapeHtml(dict.inv_form_done_title)}</h3>
        </div>
        <p>${escapeHtml(dict.inv_form_done_body)}</p>
      </div>
    `;
    return;
  }

  mount.innerHTML = `
    <form class="wl-form" id="investorForm" novalidate>
      <input type="text" name="website_url" class="hp-hidden" tabindex="-1" autocomplete="off" />
      <div class="form-field">
        <label for="invEmail">${escapeHtml(dict.inv_form_email_label)}</label>
        <input type="email" id="invEmail" name="email" class="wl-email-input" placeholder="${escapeHtml(dict.inv_form_email_ph)}" required />
      </div>
      <div class="form-field">
        <label for="invNote">${escapeHtml(dict.inv_form_note_label)}</label>
        <textarea id="invNote" name="note" rows="4" placeholder="${escapeHtml(dict.inv_form_note_ph)}"></textarea>
      </div>
      <div class="wl-error" id="invError" style="display: none;"></div>
      <div class="wl-actions-row">
        <button type="submit" class="btn btn-primary" id="invSubmitBtn">${escapeHtml(dict.inv_form_submit)}</button>
      </div>
      <div class="wl-note">${escapeHtml(dict.waitlistForm.privacyNote)}</div>
    </form>
  `;

  const form = document.getElementById('investorForm');
  const emailEl = document.getElementById('invEmail');
  const noteEl = document.getElementById('invNote');
  const hpEl = form.querySelector('input[name="website_url"]');
  const errEl = document.getElementById('invError');
  const btnEl = document.getElementById('invSubmitBtn');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEl.style.display = 'none';
    const email = emailEl.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errEl.textContent = dict.waitlistForm.invalidEmail;
      errEl.style.display = 'block';
      emailEl.focus();
      return;
    }

    btnEl.disabled = true;
    btnEl.textContent = dict.waitlistForm.submittingBtn;

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          stage: 'investor',
          planInterest: 'invest',
          note: noteEl.value.trim(),
          website_url: hpEl.value,
          lang: currentLang,
          referrer: getSource()
        })
      });

      const isLocal = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
      if (!res.ok && !(isLocal && [404, 405, 501].includes(res.status))) {
        throw new Error('rejected');
      }

      investorSubmitted = email;
      trackEvent('investor_submit');
      renderInvestorForm();
    } catch (_) {
      btnEl.disabled = false;
      btnEl.textContent = dict.inv_form_submit;
      errEl.textContent = dict.waitlistForm.genericError;
      errEl.style.display = 'block';
    }
  });
}

function setLang(lang) {
  currentLang = lang;
  const dict = TRANSLATIONS[lang];
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-BR';
  document.title = dict.inv_page_title;

  document.querySelectorAll('#langSwitch .lang-btn').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = dict[el.getAttribute('data-i18n')];
    if (typeof val === 'string') el.textContent = val;
  });

  document.getElementById('invStats').innerHTML = dict.inv_stats
    .map(
      (s) => `
      <div class="stat">
        <span class="stat-n">${s.n}</span>
        <span class="stat-l">${s.l}</span>
        <span class="stat-s">${s.s}</span>
      </div>`
    )
    .join('');

  document.getElementById('invPoints').innerHTML = dict.inv_points
    .map((p) => `<div class="point"><h3>${p.t}</h3><p>${p.b}</p></div>`)
    .join('');

  renderInvestorForm();
}

function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'en' || fromUrl === 'pt') return fromUrl;
  try {
    const saved = localStorage.getItem('zeromx_lang');
    if (saved === 'en' || saved === 'pt') return saved;
  } catch (_) {}
  return (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#langSwitch .lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-lang');
      try { localStorage.setItem('zeromx_lang', next); } catch (_) {}
      setLang(next);
    });
  });

  setLang(initialLang());
  trackEvent('investor_pageview');
});
