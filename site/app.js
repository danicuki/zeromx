/* ZeroMX site logic. All copy lives in i18n.js (TRANSLATIONS). */

const state = {
  lang: 'en',
  provider: 'gmail',
  view: 'user',
  selectedId: 'm1',
  searchQuery: '',
  activeFlow: 'inbound',
  activeStepIndex: 0,
  customSentByLang: { en: [], pt: [] },
  lensPos: 56,
  lensTouched: false,
  lastFocus: null,
  waitlist: {
    draftEmail: '',
    submittedEmail: '',
    provider: 'gmail',
    // No default: an untouched choice must not count as "reads mail in the browser".
    mailClient: null,
    ownsDomain: 'yes',
    planInterest: 'fiat-sub',
    prefsSaved: false,
    wtpReserved: false
  },
  tracked: new Set()
};

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

function trackEvent(event, once = false) {
  if (once && state.tracked.has(event)) return;
  if (once) state.tracked.add(event);
  if (['localhost', '127.0.0.1', ''].includes(window.location.hostname)) return;
  if (typeof window.va === 'function' && event !== 'pageview') {
    window.va('event', { name: event });
  }
  fetch('/api/event', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, source: getSource() }),
    keepalive: true
  }).catch(() => {});
}

const ICON_PATHS = {
  check: '<path d="M5 12.5l4.5 4.5L19 7.5" />',
  x: '<path d="M6 6l12 12M18 6L6 18" />',
  half: '<path d="M6 12h12" />',
  arrows: '<path d="M9 7l-5 5 5 5M15 7l5 5-5 5" />',
  file: '<path d="M7 3h7l4 4v14H7z" /><path d="M14 3v4h4" />',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 018 0v3" />',
  reply: '<path d="M10 8L5 12l5 4" /><path d="M5 12h9a5 5 0 015 5v1" />',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" />',
  disk: '<ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" /><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />'
};

function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
}

function t() {
  return TRANSLATIONS[state.lang];
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* Deterministic base64-looking filler, so ciphertext is stable per message. */
const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

function gibberish(seed, length) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  }
  let out = '';
  for (let i = 0; i < length; i += 1) {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    out += B64[(h >>> 0) % 64];
  }
  return out;
}

function hexToken(seed, length) {
  const HEX = '0123456789abcdef';
  return gibberish(seed, length)
    .split('')
    .map((c) => HEX[B64.indexOf(c) % 16])
    .join('');
}

function envelopeText(mail) {
  const lines = [];
  for (let i = 0; i < 7; i += 1) {
    lines.push(gibberish(`${mail.id}:${i}`, 60));
  }
  return [
    '-----BEGIN ZEROMX ENVELOPE-----',
    'Version: ZeroMX/1.0',
    'Suite: HPKE X25519+ML-KEM-768, ChaCha20-Poly1305',
    `Sealed-By: ${mail.sealedBy}`,
    `Padding: Padme, ${mail.padded}`,
    '',
    ...lines,
    `=${gibberish(`${mail.id}:crc`, 4)}`,
    '-----END ZEROMX ENVELOPE-----'
  ].join('\n');
}

function providerName() {
  return state.provider === 'gmail' ? 'Google' : 'Microsoft';
}

function getAllEmails() {
  return [...state.customSentByLang[state.lang], ...t().emails];
}

function getFilteredEmails() {
  const q = state.searchQuery.trim().toLowerCase();
  const list = getAllEmails();
  if (!q) return list;

  const matchesReal = (mail) =>
    [mail.realFrom, mail.realSubject, mail.realBody].some((v) => v.toLowerCase().includes(q));

  return list.filter((mail) => {
    if (state.view === 'user' || !mail.protected) return matchesReal(mail);
    // The provider can only match what it can read: the opaque envelope fields.
    return [mail.opaqueFrom, mail.opaqueSubject].some((v) => v.toLowerCase().includes(q));
  });
}

/* ---------- Static copy and list sections ---------- */
function applyStaticTranslations() {
  const dict = t();
  document.documentElement.lang = state.lang === 'en' ? 'en' : 'pt-BR';
  document.title = dict.pageTitle;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute('content', dict.metaDescription);

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const value = dict[el.getAttribute('data-i18n')];
    if (typeof value === 'string') el.textContent = value;
  });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const value = dict[el.getAttribute('data-i18n-html')];
    if (typeof value === 'string') el.innerHTML = value;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const value = dict[el.getAttribute('data-i18n-placeholder')];
    if (typeof value === 'string') el.setAttribute('placeholder', value);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const value = dict[el.getAttribute('data-i18n-aria')];
    if (typeof value === 'string') el.setAttribute('aria-label', value);
  });

  document.getElementById('originPersonalChip').innerHTML = dict.originPersonal;
  document.getElementById('originWorkChip').innerHTML = dict.originWork;

  document.getElementById('howSteps').innerHTML = dict.how_steps
    .map(
      (s, i) => `
      <li class="step">
        <span class="step-n" aria-hidden="true">${i + 1}</span>
        <h3>${s.title}</h3>
        <p>${s.body}</p>
      </li>`
    )
    .join('');

  document.getElementById('proofGrid').innerHTML = dict.tiers
    .map(
      (tier) => `
      <article class="tier-card">
        <span class="tier-badge">${tier.badge}</span>
        <h3>${tier.title}</h3>
        <p>${tier.body}</p>
        <p class="rests-on">${tier.restsOn}</p>
      </article>`
    )
    .join('');

  document.getElementById('gapsGrid').innerHTML = `
    <div class="ledger-col ledger-yes">
      <h3>${icon('check')}${dict.protects_title}</h3>
      <ul>${dict.protects.map((p) => `<li>${p}</li>`).join('')}</ul>
    </div>
    <div class="ledger-col ledger-no">
      <h3>${icon('x')}${dict.limits_title}</h3>
      <ul>${dict.limits.map((p) => `<li>${p}</li>`).join('')}</ul>
    </div>`;

  document.getElementById('onboardingGrid').innerHTML = dict.onboardingSteps
    .map(
      (s, i) => `
      <li class="onboard-step">
        <span class="onboard-num">0${i + 1}</span>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
        ${s.code ? `<div class="code-mini">${s.code}</div>` : ''}
      </li>`
    )
    .join('');

  document.getElementById('roadmapList').innerHTML = dict.roadmap
    .map(
      (r) => `
      <li class="road-item state-${r.state}">
        <span class="road-when">${r.when}</span>
        <h3>${r.title}</h3>
        <p>${r.body}</p>
      </li>`
    )
    .join('');

  document.getElementById('faqList').innerHTML = dict.faq
    .map(
      (f) => `
      <details class="faq-item">
        <summary>${f.q}</summary>
        <p>${f.a}</p>
      </details>`
    )
    .join('');

  renderCompare();

  const invStats = document.getElementById('invStats');
  if (invStats) {
    invStats.innerHTML = dict.inv_stats
      .map(
        (s) => `
        <div class="stat">
          <span class="stat-n">${s.n}</span>
          <span class="stat-l">${s.l}</span>
          <span class="stat-s">${s.s}</span>
        </div>`
      )
      .join('');
  }

  const invPoints = document.getElementById('invPoints');
  if (invPoints) {
    invPoints.innerHTML = dict.inv_points
      .map((p) => `<div class="point"><h3>${p.t}</h3><p>${p.b}</p></div>`)
      .join('');
  }

  document.getElementById('devStack').innerHTML = dict.dev_stack.map((s) => `<li>${s}</li>`).join('');

  document.getElementById('jamPoints').innerHTML = dict.jam_points
    .map((p) => `<div class="jam-point"><h4>${p.t}</h4><p>${p.b}</p></div>`)
    .join('');

  document.getElementById('devProblems').innerHTML = dict.dev_problems
    .map(
      (p, i) => `
      <article class="problem">
        <span class="problem-n">0${i + 1}</span>
        <h3>${p.t}</h3>
        <p>${p.b}</p>
        <span class="problem-tag">${p.tag}</span>
      </article>`
    )
    .join('');
}

function renderCompare() {
  const { cols, rows } = t().compare;
  const cell = (value, isUs) => {
    const [kind, note] = value.split(':');
    const glyph = kind === 'yes' ? 'check' : kind === 'no' ? 'x' : 'half';
    return `<td class="${isUs ? 'col-us' : ''}">
      <span class="mark mark-${kind}"><i>${icon(glyph)}</i>${note ? `<span>${note}</span>` : ''}</span>
    </td>`;
  };

  document.getElementById('compareTable').innerHTML = `
    <table class="compare-table">
      <thead>
        <tr>
          <th scope="col"></th>
          ${cols.map((c, i) => `<th scope="col" class="${i === cols.length - 1 ? 'col-us' : ''}">${c}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            ([label, ...values]) => `
          <tr>
            <th scope="row">${label}</th>
            ${values.map((v, i) => cell(v, i === values.length - 1)).join('')}
          </tr>`
          )
          .join('')}
      </tbody>
    </table>`;
}

/* ---------- Hero lens ---------- */
function renderLens() {
  const L = t().lens;
  const lens = document.getElementById('lens');
  lens.style.setProperty('--pos', `${state.lensPos}%`);

  lens.innerHTML = `
    <div class="lens-pane lens-plain">
      <span class="lens-tab">${escapeHtml(L.plainLabel)}</span>
      <div class="lens-row"><span>${escapeHtml(L.fromLabel)}</span><span>${escapeHtml(L.from)}</span></div>
      <div class="lens-row"><span>${escapeHtml(L.subjectLabel)}</span><span>${escapeHtml(L.subject)}</span></div>
      <div class="lens-body">${L.body.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}</div>
      <div class="lens-attach">${icon('file')}<span>${escapeHtml(L.attach)}</span><small>${escapeHtml(L.attachMeta)}</small></div>
    </div>
    <div class="lens-pane lens-cipher" aria-hidden="true">
      <span class="lens-tab">${escapeHtml(L.cipherLabel)}</span>
      <div class="lens-row"><span>${escapeHtml(L.fromLabel)}</span><span>${escapeHtml(L.cFrom)}</span></div>
      <div class="lens-row"><span>${escapeHtml(L.subjectLabel)}</span><span>${escapeHtml(L.cSubject)}</span></div>
      <div class="lens-body" id="lensCipherBody">${gibberish('lens', 900)}</div>
      <div class="lens-attach">${icon('lock')}<span>${gibberish('lens-att', 12)}.bin</span><small>${escapeHtml(L.cAttachMeta)}</small></div>
    </div>
    <div class="lens-handle">
      <button type="button" class="lens-knob" role="slider" aria-orientation="horizontal"
        aria-label="${escapeHtml(L.sliderLabel)}" aria-valuemin="0" aria-valuemax="100"
        aria-valuenow="${Math.round(state.lensPos)}">${icon('arrows')}</button>
    </div>`;

  const wrap = lens.parentElement;
  let hint = wrap.querySelector('.lens-hint');
  if (!hint) {
    hint = document.createElement('p');
    hint.className = 'lens-hint';
    wrap.appendChild(hint);
  }
  hint.textContent = L.hint;
}

function setLensPos(pos) {
  state.lensPos = Math.max(4, Math.min(96, pos));
  const lens = document.getElementById('lens');
  lens.style.setProperty('--pos', `${state.lensPos}%`);
  const knob = lens.querySelector('.lens-knob');
  if (knob) knob.setAttribute('aria-valuenow', String(Math.round(state.lensPos)));
}

function initLens(reducedMotion) {
  const lens = document.getElementById('lens');
  let dragging = false;

  const posFromEvent = (e) => {
    const rect = lens.getBoundingClientRect();
    return ((e.clientX - rect.left) / rect.width) * 100;
  };

  lens.addEventListener('pointerdown', (e) => {
    dragging = true;
    state.lensTouched = true;
    trackEvent('lens_drag', true);
    lens.setPointerCapture(e.pointerId);
    setLensPos(posFromEvent(e));
  });
  lens.addEventListener('pointermove', (e) => {
    if (dragging) setLensPos(posFromEvent(e));
  });
  const stop = () => {
    dragging = false;
  };
  lens.addEventListener('pointerup', stop);
  lens.addEventListener('pointercancel', stop);

  lens.addEventListener('keydown', (e) => {
    if (!e.target.classList.contains('lens-knob')) return;
    const step = e.shiftKey ? 12 : 4;
    if (e.key === 'ArrowLeft') setLensPos(state.lensPos - step);
    else if (e.key === 'ArrowRight') setLensPos(state.lensPos + step);
    else if (e.key === 'Home') setLensPos(0);
    else if (e.key === 'End') setLensPos(100);
    else return;
    state.lensTouched = true;
    e.preventDefault();
  });

  if (reducedMotion) return;

  // One slow sweep on load so it is obvious the seam moves.
  const keyframes = [
    [0, 56],
    [900, 56],
    [1900, 24],
    [3100, 78],
    [4000, 56]
  ];
  const start = performance.now();
  const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
  const sweep = (now) => {
    if (state.lensTouched) return;
    const elapsed = Math.max(0, now - start);
    const idx = keyframes.findIndex(([time]) => time > elapsed);
    if (idx === -1) {
      setLensPos(56);
      return;
    }
    const [t0, p0] = keyframes[Math.max(0, idx - 1)];
    const [t1, p1] = keyframes[idx];
    setLensPos(t1 === t0 ? p1 : p0 + (p1 - p0) * ease((elapsed - t0) / (t1 - t0)));
    requestAnimationFrame(sweep);
  };
  requestAnimationFrame(sweep);

  // Ciphertext flickers a little while it is on screen.
  let visible = true;
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    }).observe(lens);
  }
  setInterval(() => {
    if (!visible || document.hidden) return;
    const body = document.getElementById('lensCipherBody');
    if (!body) return;
    const chars = body.textContent.split('');
    for (let i = 0; i < 14; i += 1) {
      chars[Math.floor(Math.random() * chars.length)] = B64[Math.floor(Math.random() * 64)];
    }
    body.textContent = chars.join('');
  }, 160);
}

/* ---------- Inbox simulator ---------- */
function renderSimulator() {
  const dict = t();
  const win = document.getElementById('mailWindow');
  const extensionBadge = document.getElementById('extensionBadge');
  const statusBanner = document.getElementById('statusBanner');
  const mailList = document.getElementById('mailList');
  const mailDetail = document.getElementById('mailDetail');

  const isGmail = state.provider === 'gmail';
  const isUser = state.view === 'user';
  const provider = providerName();

  win.className = `mail-window ${isGmail ? 'provider-gmail' : 'provider-outlook'}${isUser ? '' : ' view-bigtech'}`;
  document.getElementById('providerTitle').textContent = isGmail ? dict.providerTitleGmail : dict.providerTitleOutlook;
  document.getElementById('inboxCount').textContent = String(getAllEmails().length);

  extensionBadge.className = `extension-pill ${isUser ? 'active-shield' : 'raw-server'}`;
  extensionBadge.textContent = isUser ? dict.extActive : dict.extRaw(provider);
  statusBanner.className = `status-banner ${isUser ? 'banner-user' : 'banner-bigtech'}`;
  document.getElementById('statusBannerText').innerHTML = isUser ? dict.bannerUser : dict.bannerBigTech(provider);
  document.getElementById('searchEngineStatus').textContent = isUser
    ? dict.searchStatusUser
    : dict.searchStatusBigTech(provider);

  const filtered = getFilteredEmails();

  if (filtered.length === 0) {
    mailList.innerHTML = `
      <div class="empty-state">
        <strong>${escapeHtml(dict.noResultsTitle(state.searchQuery.trim()))}</strong>
        <p>${escapeHtml(isUser ? dict.noResultsUser : dict.noResultsBigTech(provider))}</p>
      </div>`;
    mailDetail.innerHTML = `<p class="empty-detail">${escapeHtml(dict.noMailSelected)}</p>`;
    return;
  }

  if (!filtered.some((m) => m.id === state.selectedId)) {
    state.selectedId = filtered[0].id;
  }

  mailList.innerHTML = filtered
    .map((m) => {
      const showCipher = !isUser && m.protected;
      const cipherClass = showCipher ? ' cipher-font' : '';
      const sender = showCipher ? m.opaqueFrom : m.realFrom;
      const subject = showCipher ? m.opaqueSubject : m.realSubject;
      const snippet = showCipher ? gibberish(`${m.id}:snip`, 46) : m.realBody.replace(/\n+/g, ' ').slice(0, 80);
      const badgeClass = showCipher
        ? 'badge-cipher'
        : m.tier === 'e2ee'
        ? 'badge-e2ee'
        : m.tier === 'tee'
        ? 'badge-tee'
        : 'badge-plain';

      return `
        <button type="button" class="mail-row${m.id === state.selectedId ? ' selected' : ''}" data-mail-id="${escapeHtml(m.id)}">
          <div class="mail-row-top">
            <span class="mail-sender${cipherClass}">${escapeHtml(sender)}</span>
            <span class="mail-time">${escapeHtml(m.time)}</span>
          </div>
          <div class="mail-subject${cipherClass}">${escapeHtml(subject)}</div>
          <div class="mail-snippet${cipherClass}">${escapeHtml(snippet)}</div>
          <span class="badge-trust ${badgeClass}">${escapeHtml(showCipher ? dict.serverCipherBadge : dict.badgeShort[m.tier])}</span>
        </button>`;
    })
    .join('');

  mailList.querySelectorAll('.mail-row').forEach((row) => {
    row.addEventListener('click', () => {
      state.selectedId = row.getAttribute('data-mail-id');
      renderSimulator();
    });
  });

  const current = filtered.find((m) => m.id === state.selectedId) || filtered[0];

  if (!isUser && current.protected) {
    mailDetail.innerHTML = `
      <div>
        <div class="detail-header">
          <div class="detail-subject cipher-font">${escapeHtml(current.opaqueSubject)}</div>
          <dl class="detail-meta">
            <dt>${escapeHtml(dict.envelopeFromLabel)}</dt><dd><code>${escapeHtml(current.opaqueFrom)}</code></dd>
            <dt>${escapeHtml(dict.toLabel)}</dt><dd><code>${escapeHtml(current.realTo)}</code></dd>
          </dl>
        </div>
        <div class="cipher-box">${escapeHtml(envelopeText(current))}</div>
        <div class="ai-probe-box">
          <strong>${escapeHtml(dict.probeTitle(provider))}</strong>
          ${escapeHtml(dict.probeDesc)}
        </div>
      </div>
      <div class="detail-actions">
        <button type="button" class="btn" id="switchBackUserBtn">${icon('eye')}${escapeHtml(dict.switchBackUserBtn)}</button>
      </div>`;
    document.getElementById('switchBackUserBtn').addEventListener('click', () => setView('user'));
    return;
  }

  const attachment = current.attachment
    ? `<div class="detail-attach">${icon('file')}<span>${escapeHtml(current.attachment.name)}</span><small>${escapeHtml(current.attachment.size)}</small></div>`
    : '';
  const note = current.note && isUser ? `<p class="detail-note">${escapeHtml(current.note)}</p>` : '';
  const mcpBox =
    isUser && current.protected
      ? `<div class="ai-probe-box"><strong>${escapeHtml(dict.mcpTitle)}</strong>${escapeHtml(dict.mcpDesc)}</div>`
      : '';

  mailDetail.innerHTML = `
    <div>
      <div class="detail-header">
        <div class="detail-subject">${escapeHtml(current.realSubject)}</div>
        <dl class="detail-meta">
          <dt>${escapeHtml(dict.fromLabel)}</dt><dd>${escapeHtml(current.realFrom)}</dd>
          <dt>${escapeHtml(dict.toLabel)}</dt><dd>${escapeHtml(current.realTo)}</dd>
          <dt>${escapeHtml(dict.protectionLabel)}</dt><dd>${escapeHtml(current.trustLabel)}</dd>
        </dl>
      </div>
      <div class="detail-content">${escapeHtml(current.realBody)}</div>
      ${attachment}
      ${note}
      ${mcpBox}
    </div>
    <div class="detail-actions">
      ${
        isUser
          ? `<button type="button" class="btn btn-primary" id="replySecureBtn">${icon('reply')}${escapeHtml(dict.replySecureBtn)}</button>
             <button type="button" class="btn btn-ghost" id="peekServerBtn">${icon('disk')}${escapeHtml(dict.peekServerBtn(provider))}</button>`
          : `<button type="button" class="btn" id="switchBackUserBtn">${icon('eye')}${escapeHtml(dict.switchBackUserBtn)}</button>`
      }
    </div>`;

  const replyBtn = document.getElementById('replySecureBtn');
  if (replyBtn) replyBtn.addEventListener('click', () => openComposeModal(current));
  const peekBtn = document.getElementById('peekServerBtn');
  if (peekBtn) peekBtn.addEventListener('click', () => setView('bigtech'));
  const backBtn = document.getElementById('switchBackUserBtn');
  if (backBtn) backBtn.addEventListener('click', () => setView('user'));
}

function setView(view) {
  state.view = view;
  if (view === 'bigtech') trackEvent('demo_provider_view', true);
  document.querySelectorAll('#viewToggle .seg-btn').forEach((btn) => {
    const active = btn.getAttribute('data-view') === view;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  renderSimulator();
}

/* ---------- Flow explorer ---------- */
function renderArchitecture() {
  const dict = t();
  const steps = dict.flows[state.activeFlow];
  if (state.activeStepIndex >= steps.length) state.activeStepIndex = 0;

  const row = document.getElementById('flowNodesRow');
  row.innerHTML = steps
    .map(
      (s, idx) => `
      <button type="button" class="flow-node${idx === state.activeStepIndex ? ' active-step' : ''}"
        data-step-idx="${idx}" aria-pressed="${idx === state.activeStepIndex}">
        <span class="step-num">${escapeHtml(s.step)}</span>
        <h4>${escapeHtml(s.title)}</h4>
        <p>${escapeHtml(s.short)}</p>
      </button>`
    )
    .join('');

  row.querySelectorAll('.flow-node').forEach((el) => {
    el.addEventListener('click', () => {
      state.activeStepIndex = Number(el.getAttribute('data-step-idx'));
      renderArchitecture();
      const next = row.querySelector(`[data-step-idx="${state.activeStepIndex}"]`);
      if (next) next.focus({ preventScroll: true });
    });
  });

  const active = steps[state.activeStepIndex];
  document.getElementById('stepInspector').innerHTML = `
    <div class="inspector-what">
      <h3>${escapeHtml(active.detailTitle)}</h3>
      <p>${escapeHtml(active.detailBody)}</p>
    </div>
    <div class="inspector-visibility">
      <div class="vis-title">${escapeHtml(dict.visMatrixTitle)}</div>
      <div class="vis-legend" aria-hidden="true">
        <span><i class="vis-dot vis-no"></i>${escapeHtml(dict.visLegend.no)}</span>
        <span><i class="vis-dot vis-part"></i>${escapeHtml(dict.visLegend.part)}</span>
        <span><i class="vis-dot vis-yes"></i>${escapeHtml(dict.visLegend.yes)}</span>
      </div>
      ${active.vis
        .map(
          ([actor, kind, text]) => `
        <div class="vis-row">
          <i class="vis-dot vis-${kind}" aria-hidden="true"></i>
          <b>${escapeHtml(actor)}</b>
          <span>${escapeHtml(text)}</span>
        </div>`
        )
        .join('')}
    </div>`;
}

/* ---------- Modals ---------- */
function showModal() {
  const backdrop = document.getElementById('modalBackdrop');
  if (!backdrop.classList.contains('open')) state.lastFocus = document.activeElement;
  backdrop.classList.add('open');
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  if (state.lastFocus && typeof state.lastFocus.focus === 'function' && document.contains(state.lastFocus)) {
    state.lastFocus.focus({ preventScroll: true });
  }
  state.lastFocus = null;
}

function isZeroMxPeer(address) {
  return /sovereign\.dev|soberano\.dev|zeromx/i.test(address);
}

function openComposeModal(replyTarget = null) {
  const cm = t().composeModal;
  const content = document.getElementById('modalContent');
  const replyAddress = replyTarget ? (replyTarget.realFrom.match(/<([^>]+)>/) || [])[1] : null;
  const toVal = replyAddress || cm.defaultTo;
  const subjVal = replyTarget ? `Re: ${replyTarget.realSubject}` : cm.defaultSubj;

  showModal();
  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span class="modal-tag">${escapeHtml(cm.tag)}</span>
        <h3>${escapeHtml(cm.title)}</h3>
      </div>
      <button type="button" class="modal-close" id="closeModalBtn" aria-label="Close">&times;</button>
    </div>
    <div class="form-field">
      <label for="composeFrom">${escapeHtml(cm.fromLabel)}</label>
      <input type="text" id="composeFrom" value="${escapeHtml(cm.fromAddr)}" disabled />
    </div>
    <div class="form-field">
      <label for="composeTo">${escapeHtml(cm.toLabel)}</label>
      <input type="text" id="composeTo" value="${escapeHtml(toVal)}" autocomplete="off" />
      <div class="route-hint" id="routeHint"></div>
    </div>
    <div class="form-field">
      <label for="composeSubject">${escapeHtml(cm.subjLabel)}</label>
      <input type="text" id="composeSubject" value="${escapeHtml(subjVal)}" autocomplete="off" />
    </div>
    <div class="form-field">
      <label for="composeBody">${escapeHtml(cm.bodyLabel)}</label>
      <textarea rows="5" id="composeBody">${escapeHtml(cm.defaultBody)}</textarea>
    </div>
    <div class="modal-foot">
      <span>${escapeHtml(cm.footerNote)}</span>
      <button type="button" class="btn btn-primary" id="sendSecureMailBtn">${escapeHtml(cm.sendBtn)}</button>
    </div>`;

  const toInput = document.getElementById('composeTo');
  const routeHint = document.getElementById('routeHint');
  const updateRoute = () => {
    const peer = isZeroMxPeer(toInput.value);
    routeHint.textContent = peer ? cm.routeE2ee : cm.routeRelay;
    routeHint.classList.toggle('is-e2ee', peer);
  };
  toInput.addEventListener('input', updateRoute);
  updateRoute();

  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  document.getElementById('sendSecureMailBtn').addEventListener('click', () => {
    const to = toInput.value.trim() || cm.defaultTo;
    const subj = document.getElementById('composeSubject').value.trim() || cm.noSubject;
    const body = document.getElementById('composeBody').value.trim();
    const peer = isZeroMxPeer(to);
    const newId = `sent_${Date.now()}`;

    state.customSentByLang[state.lang].unshift({
      id: newId,
      protected: true,
      tier: peer ? 'e2ee' : 'tee',
      trustLabel: peer ? cm.sentTierE2ee : cm.sentTierTee,
      realFrom: `${cm.youLabel} → ${to}`,
      realTo: to,
      realSubject: subj,
      time: cm.sentNow,
      opaqueFrom: 'self-7c21e0@in.zeromx.network',
      opaqueSubject: `🔒 Thread #${hexToken(newId, 12)}`,
      realBody: body,
      sealedBy: cm.sentSealedBy,
      padded: '4 KiB'
    });

    state.selectedId = newId;
    state.searchQuery = '';
    document.getElementById('inboxSearch').value = '';
    closeModal();
    renderSimulator();
  });

  toInput.focus();
}

function openMobileGapModal() {
  const mm = t().mobileModal;
  const content = document.getElementById('modalContent');

  showModal();
  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span class="modal-tag">${escapeHtml(mm.tag)}</span>
        <h3>${escapeHtml(mm.title)}</h3>
      </div>
      <button type="button" class="modal-close" id="closeModalBtn" aria-label="Close">&times;</button>
    </div>
    <div class="phone-compare">
      <div class="phone-card is-bad">
        <strong>${escapeHtml(mm.badTitle)}</strong>
        <p>${escapeHtml(mm.badDesc)}</p>
        <div class="notif">relay-3d7b12@in.zeromx.network
🔒 Thread #a72f91c04e1b
${gibberish('notif', 58)}</div>
      </div>
      <div class="phone-card">
        <strong>${escapeHtml(mm.goodTitle)}</strong>
        <p>${escapeHtml(mm.goodDesc)}</p>
        <div class="notif">${escapeHtml(mm.goodSample)}</div>
      </div>
    </div>
    <p class="modal-summary">${mm.summary}</p>
    <div class="modal-foot">
      <span></span>
      <button type="button" class="btn btn-primary" id="okMobileBtn">${escapeHtml(mm.okBtn)}</button>
    </div>`;

  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  const ok = document.getElementById('okMobileBtn');
  ok.addEventListener('click', closeModal);
  ok.focus();
}

/* ---------- Waitlist (2-step frictionless signup + optional profile + WTP test) ---------- */
async function postWaitlist(payload) {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // The local-preview fallback below must never hide a broken API in production.
  const isLocalPreview = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);
  if (!res.ok && !(isLocalPreview && [404, 405, 501].includes(res.status))) {
    throw new Error('API rejected');
  }

  if (!res.ok) {
    const localEntries = JSON.parse(localStorage.getItem('zeromx_waitlist_preview') || '[]');
    localEntries.push(payload);
    localStorage.setItem('zeromx_waitlist_preview', JSON.stringify(localEntries));
  }
}

function syncWaitlistMounts() {
  renderInlineWaitlist();
  const modalMount = document.getElementById('modalWaitlistMount');
  if (modalMount) mountWaitlistWidget(modalMount);
}

function mountWaitlistWidget(container) {
  if (!container) return;
  const wf = t().waitlistForm;

  const renderChips = (items, selectedId, attrName) =>
    items
      .map(
        (item) => `
        <button
          type="button"
          class="wl-chip ${item.id === selectedId ? 'selected' : ''}"
          data-${attrName}="${escapeHtml(item.id)}"
        >${escapeHtml(item.label)}</button>
      `
      )
      .join('');

  // STEP 2: Email already captured — show confirmation, WTP founding-slot test, and optional setup profile
  if (state.waitlist.submittedEmail) {
    const wtpBlock = state.waitlist.wtpReserved
      ? `
        <div class="wtp-box is-reserved">
          <div class="wtp-box-title">${escapeHtml(wf.wtpReservedTitle)}</div>
          <p style="margin-bottom:0;">${escapeHtml(wf.wtpReservedDesc)}</p>
        </div>`
      : `
        <div class="wtp-box">
          <div class="wtp-box-title">${escapeHtml(wf.wtpTitle)}</div>
          <p>${escapeHtml(wf.wtpDesc)}</p>
          <button type="button" class="btn btn-ink btn-sm wl-wtp-btn">${escapeHtml(wf.wtpBtn)}</button>
        </div>`;

    container.innerHTML = `
      <div class="wl-success-box">
        <div class="wl-success-head">
          <svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true" style="width: 34px; height: 34px;">
            <circle cx="16" cy="16" r="16" fill="currentColor" />
            <path d="M9.5 16.5l4.5 4.5 8.5-9.5" fill="none" stroke="#f3efe6" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <h3>${escapeHtml(wf.successTitle)}</h3>
        </div>
        <p>${wf.successBody(escapeHtml(state.waitlist.submittedEmail))}</p>

        ${wtpBlock}

        <div class="wl-step2-panel">
          <div class="wl-step2-title">${escapeHtml(wf.step2Title)}</div>
          <div class="wl-chip-group">
            <span class="wl-chip-label">${escapeHtml(wf.providerLabel)}</span>
            <div class="wl-chips">${renderChips(wf.providers, state.waitlist.provider, 'wl-provider')}</div>
          </div>
          <div class="wl-chip-group">
            <span class="wl-chip-label">${escapeHtml(wf.clientLabel)}</span>
            <div class="wl-chips">${renderChips(wf.clients, state.waitlist.mailClient, 'wl-client')}</div>
          </div>
          <div class="wl-chip-group">
            <span class="wl-chip-label">${escapeHtml(wf.domainLabel)}</span>
            <div class="wl-chips">${renderChips(wf.domains, state.waitlist.ownsDomain, 'wl-domain')}</div>
          </div>
          <div class="wl-chip-group">
            <span class="wl-chip-label">${escapeHtml(wf.planLabel)}</span>
            <div class="wl-chips">${renderChips(wf.plans, state.waitlist.planInterest, 'wl-plan')}</div>
          </div>
          <div class="wl-actions-row">
            <button type="button" class="btn btn-primary btn-sm wl-save-prefs-btn">
              ${escapeHtml(state.waitlist.prefsSaved ? wf.prefsSaved : wf.savePrefsBtn)}
            </button>
            <button type="button" class="btn btn-secondary btn-sm wl-share-btn">${escapeHtml(wf.shareBtn)}</button>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-wl-provider]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.waitlist.provider = btn.getAttribute('data-wl-provider');
        state.waitlist.prefsSaved = false;
        mountWaitlistWidget(container);
      });
    });
    container.querySelectorAll('[data-wl-client]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.waitlist.mailClient = btn.getAttribute('data-wl-client');
        state.waitlist.prefsSaved = false;
        mountWaitlistWidget(container);
      });
    });
    container.querySelectorAll('[data-wl-domain]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.waitlist.ownsDomain = btn.getAttribute('data-wl-domain');
        state.waitlist.prefsSaved = false;
        mountWaitlistWidget(container);
      });
    });
    container.querySelectorAll('[data-wl-plan]').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.waitlist.planInterest = btn.getAttribute('data-wl-plan');
        state.waitlist.prefsSaved = false;
        mountWaitlistWidget(container);
      });
    });

    const wtpBtn = container.querySelector('.wl-wtp-btn');
    if (wtpBtn) {
      wtpBtn.addEventListener('click', async () => {
        wtpBtn.disabled = true;
        try {
          await postWaitlist({
            email: state.waitlist.submittedEmail,
            stage: 'wtp',
            willingToPay: 'founding-15',
            provider: state.waitlist.provider,
            mailClient: state.waitlist.mailClient || 'unspecified',
            ownsDomain: state.waitlist.ownsDomain,
            planInterest: state.waitlist.planInterest,
            lang: state.lang,
            referrer: getSource()
          });
          state.waitlist.wtpReserved = true;
          trackEvent('wtp_founding_click', true);
          syncWaitlistMounts();
        } catch (_) {
          wtpBtn.disabled = false;
        }
      });
    }

    const savePrefsBtn = container.querySelector('.wl-save-prefs-btn');
    if (savePrefsBtn) {
      savePrefsBtn.addEventListener('click', async () => {
        savePrefsBtn.disabled = true;
        try {
          await postWaitlist({
            email: state.waitlist.submittedEmail,
            stage: 'profile',
            provider: state.waitlist.provider,
            mailClient: state.waitlist.mailClient || 'unspecified',
            ownsDomain: state.waitlist.ownsDomain,
            planInterest: state.waitlist.planInterest,
            lang: state.lang,
            referrer: getSource()
          });
          state.waitlist.prefsSaved = true;
          trackEvent('waitlist_profile', true);
          syncWaitlistMounts();
        } catch (_) {
          savePrefsBtn.disabled = false;
        }
      });
    }

    const shareBtn = container.querySelector('.wl-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(window.location.origin + window.location.pathname);
        } catch (_) {
          /* ignore */
        }
        shareBtn.textContent = wf.copiedBtn;
      });
    }
    return;
  }

  // STEP 1: Zero-friction single-field capture
  container.innerHTML = `
    <form class="wl-form" novalidate>
      <input type="text" name="website_url" class="hp-hidden" tabindex="-1" autocomplete="off" />
      <div class="wl-input-row">
        <input
          type="email"
          name="email"
          class="wl-email-input"
          value="${escapeHtml(state.waitlist.draftEmail)}"
          placeholder="${escapeHtml(wf.emailPlaceholder)}"
          required
        />
        <button type="submit" class="btn btn-primary wl-submit-btn">${escapeHtml(wf.submitBtn)}</button>
      </div>
      <div class="wl-error" style="display: none;"></div>
      <div class="wl-note">${escapeHtml(wf.privacyNote)}</div>
    </form>
  `;

  const form = container.querySelector('.wl-form');
  const emailInput = container.querySelector('input[name="email"]');
  const hpInput = container.querySelector('input[name="website_url"]');
  const submitBtn = container.querySelector('.wl-submit-btn');
  const errorEl = container.querySelector('.wl-error');

  emailInput.addEventListener('input', (e) => {
    state.waitlist.draftEmail = e.target.value;
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorEl.style.display = 'none';

    const email = emailInput.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errorEl.textContent = wf.invalidEmail;
      errorEl.style.display = 'block';
      emailInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = wf.submittingBtn;

    try {
      await postWaitlist({
        email,
        stage: 'signup',
        website_url: hpInput.value,
        lang: state.lang,
        referrer: getSource()
      });

      state.waitlist.submittedEmail = email;
      trackEvent('waitlist_submit', true);
      syncWaitlistMounts();
    } catch (_) {
      submitBtn.disabled = false;
      submitBtn.textContent = wf.submitBtn;
      errorEl.textContent = wf.genericError;
      errorEl.style.display = 'block';
    }
  });
}

function renderInlineWaitlist() {
  const inlineMount = document.getElementById('inlineWaitlistMount');
  if (inlineMount) mountWaitlistWidget(inlineMount);
}

function openWaitlistModal() {
  const wf = t().waitlistForm;
  const content = document.getElementById('modalContent');

  showModal();
  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span class="modal-tag">${escapeHtml(wf.modalTag)}</span>
        <h3>${escapeHtml(wf.modalTitle)}</h3>
        <p style="font-size: 0.88rem; color: var(--ink-2); margin-top: 6px;">${escapeHtml(wf.modalSub)}</p>
      </div>
      <button type="button" class="modal-close" id="closeModalBtn" aria-label="Close">&times;</button>
    </div>
    <div id="modalWaitlistMount"></div>
  `;

  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  mountWaitlistWidget(document.getElementById('modalWaitlistMount'));
  const modalEmail = content.querySelector('input[name="email"]');
  if (modalEmail) modalEmail.focus();
}

function openWaitlistFor(planInterest) {
  if (planInterest) state.waitlist.planInterest = planInterest;
  trackEvent('waitlist_open', true);
  renderInlineWaitlist();
  openWaitlistModal();
}

function openContributorModal() {
  const dm = t().dev_modal;
  const wf = t().waitlistForm;
  const content = document.getElementById('modalContent');

  showModal();
  content.innerHTML = `
    <div class="modal-top">
      <div>
        <span class="modal-tag">${escapeHtml(dm.tag)}</span>
        <h3>${escapeHtml(dm.title)}</h3>
        <p style="font-size: 0.88rem; color: var(--ink-2); margin-top: 6px;">${escapeHtml(dm.sub)}</p>
      </div>
      <button type="button" class="modal-close" id="closeModalBtn" aria-label="Close">&times;</button>
    </div>
    <form class="wl-form" id="devAccessForm" novalidate>
      <input type="text" name="website_url" class="hp-hidden" tabindex="-1" autocomplete="off" />
      <div class="form-field">
        <label for="devEmail">${escapeHtml(dm.emailLabel)}</label>
        <input type="email" id="devEmail" placeholder="${escapeHtml(dm.emailPh)}" required />
      </div>
      <div class="form-field">
        <label for="devNote">${escapeHtml(dm.noteLabel)}</label>
        <textarea id="devNote" rows="3" placeholder="${escapeHtml(dm.notePh)}"></textarea>
      </div>
      <div class="wl-error" id="devErr" style="display: none;"></div>
      <div class="modal-foot">
        <span>${escapeHtml(wf.privacyNote)}</span>
        <button type="submit" class="btn btn-primary" id="devSubmitBtn">${escapeHtml(dm.submitBtn)}</button>
      </div>
    </form>
  `;

  document.getElementById('closeModalBtn').addEventListener('click', closeModal);
  const emailEl = document.getElementById('devEmail');
  const noteEl = document.getElementById('devNote');
  const errEl = document.getElementById('devErr');
  const btnEl = document.getElementById('devSubmitBtn');
  const form = document.getElementById('devAccessForm');
  const hpEl = form.querySelector('input[name="website_url"]');

  emailEl.focus();
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errEl.style.display = 'none';
    const email = emailEl.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errEl.textContent = wf.invalidEmail;
      errEl.style.display = 'block';
      emailEl.focus();
      return;
    }

    btnEl.disabled = true;
    btnEl.textContent = wf.submittingBtn;
    try {
      await postWaitlist({
        email,
        stage: 'contributor',
        planInterest: 'contribute',
        note: noteEl.value.trim(),
        website_url: hpEl.value,
        lang: state.lang,
        referrer: getSource()
      });
      trackEvent('contributor_submit', true);
      form.innerHTML = `
        <div class="wl-success-box">
          <h3>${escapeHtml(dm.doneTitle)}</h3>
          <p>${escapeHtml(dm.doneBody)}</p>
        </div>
      `;
    } catch (_) {
      btnEl.disabled = false;
      btnEl.textContent = dm.submitBtn;
      errEl.textContent = wf.genericError;
      errEl.style.display = 'block';
    }
  });
}

/* ---------- Language ---------- */
function setLang(lang) {
  state.lang = lang;
  state.selectedId = 'm1';
  document.querySelectorAll('#langSwitch .lang-btn').forEach((btn) => {
    const active = btn.getAttribute('data-lang') === lang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', String(active));
  });
  try {
    localStorage.setItem('zeromx_lang', lang);
  } catch (_) {
    /* storage unavailable: the choice just won't persist */
  }
  applyStaticTranslations();
  renderLens();
  renderSimulator();
  renderArchitecture();
  renderInlineWaitlist();
}

function initialLang() {
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'en' || fromUrl === 'pt') return fromUrl;
  try {
    const saved = localStorage.getItem('zeromx_lang');
    if (saved === 'en' || saved === 'pt') return saved;
  } catch (_) {
    /* ignore */
  }
  return (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

/* ---------- Scroll reveals ---------- */
function initReveals(reducedMotion) {
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  const targets = document.querySelectorAll(
    '.section-header, .steps-grid, .pillars-grid, .sim-controls-bar, .mail-window, .compare-scroll, .flow-tabs, .flow-stage, .tier-grid, .ledger, .trust-note, .onboarding-grid, .pricing-note, .stat-row, .point-grid, .stack-row, .problem-grid, .jam-panel, .band-cta, .roadmap, .waitlist-banner, .faq-list, .manifesto-text'
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        entry.target.querySelectorAll('.redact.pending').forEach((el) => {
          el.classList.add('animate');
          el.classList.remove('pending');
        });
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
  );
  document.querySelectorAll('.redact').forEach((el) => el.classList.add('pending'));
  targets.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('#langSwitch .lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
  });

  document.querySelectorAll('#providerToggle .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.provider = btn.getAttribute('data-provider');
      document.querySelectorAll('#providerToggle .seg-btn').forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
      renderSimulator();
    });
  });

  document.querySelectorAll('#viewToggle .seg-btn').forEach((btn) => {
    btn.addEventListener('click', () => setView(btn.getAttribute('data-view')));
  });

  document.getElementById('inboxSearch').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderSimulator();
  });

  document.getElementById('openComposeBtn').addEventListener('click', () => {
    trackEvent('demo_compose', true);
    openComposeModal(null);
  });
  document.getElementById('mobilePreviewBtn').addEventListener('click', openMobileGapModal);
  document.getElementById('navWaitlistBtn').addEventListener('click', () => openWaitlistFor(null));
  document.getElementById('heroWaitlistBtn').addEventListener('click', () => openWaitlistFor(null));
  const invCta = document.getElementById('invCtaBtn');
  if (invCta) invCta.addEventListener('click', () => openWaitlistFor('invest'));
  const devCta = document.getElementById('devCtaBtn');
  if (devCta) devCta.addEventListener('click', openContributorModal);

  document.getElementById('modalBackdrop').addEventListener('mousedown', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modalBackdrop').classList.contains('open')) closeModal();
  });

  document.querySelectorAll('#flowTabs .flow-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.activeFlow = tab.getAttribute('data-flow');
      state.activeStepIndex = 0;
      document.querySelectorAll('#flowTabs .flow-tab').forEach((other) => {
        other.classList.toggle('active', other === tab);
        other.setAttribute('aria-pressed', String(other === tab));
      });
      renderArchitecture();
    });
  });

  setLang(initialLang());
  initLens(reducedMotion);
  initReveals(reducedMotion);
  trackEvent('pageview', true);
});
