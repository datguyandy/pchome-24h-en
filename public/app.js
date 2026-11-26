// --- Icons (inline, stroke-based, 24px grid) ---
const ICON_PATHS = {
  check: '<path d="M5 12.5 10 17.5 19 7"/>',
  copy: '<rect x="8.5" y="8.5" width="12" height="12" rx="2.5"/><path d="M15.5 8.5V6a2.5 2.5 0 0 0-2.5-2.5H6A2.5 2.5 0 0 0 3.5 6v7A2.5 2.5 0 0 0 6 15.5h2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
  external: '<path d="M7 17 17 7"/><path d="M8 7h9v9"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5"/><path d="M12 16.2v.3"/>',
  bolt: '<path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2z"/>',
  home: '<path d="M3.5 11 12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
  store: '<path d="M4 9.5 5.5 4h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M5.5 12v8h13v-8"/><path d="M10 20v-4.5h4V20"/>',
  receipt: '<path d="M6 3h12v18l-2.5-1.6L13 21l-2-1.6L8.5 21 6 19.4z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  lock: '<rect x="4.5" y="10.5" width="15" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  bulb: '<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3z"/>',
  star: '<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
  x: '<path d="m7 7 10 10M17 7 7 17"/>',
};

function icon(name, cls = '') {
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name] || ''}</svg>`;
}

const QUICK_CATEGORIES = [
  { en: 'Dehumidifier', zh: '除濕機', hue: 200, icon: '<path d="M12 3s6 6.2 6 10.5a6 6 0 0 1-12 0C6 9.2 12 3 12 3z"/><path d="M9.3 14.2A2.8 2.8 0 0 0 12 17"/>' },
  { en: 'USB-C GaN Charger', zh: '氮化鎵充電器', hue: 42, icon: '<path d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2z"/>' },
  { en: 'Power Bank', zh: '行動電源', hue: 145, icon: '<rect x="2.5" y="7" width="17" height="10" rx="2.5"/><path d="M22 10.5v3"/><path d="M11.8 9.5 9.6 12.4h3l-2.2 3"/>' },
  { en: 'Extension Cord', zh: '延長線', hue: 24, icon: '<path d="M9 2.5V7M15 2.5V7"/><path d="M6 7h12v4a6 6 0 0 1-12 0V7z"/><path d="M12 17v4.5"/>' },
  { en: 'Air Purifier', zh: '空氣清淨機', hue: 186, icon: '<path d="M3 8h10.5a3 3 0 1 0-3-3"/><path d="M3 12h15.5a3 3 0 1 1-3 3"/><path d="M3 16h7"/>' },
  { en: 'Wireless Mouse', zh: '無線滑鼠', hue: 255, icon: '<rect x="6" y="3" width="12" height="18" rx="6"/><path d="M12 7v3.5"/>' },
  { en: 'Electric Fan', zh: '電風扇', hue: 210, icon: '<circle cx="12" cy="10.5" r="7.5"/><circle cx="12" cy="10.5" r="1.5"/><path d="M12 9V4.5M13.3 11.3l3.9 2.2M10.7 11.3l-3.9 2.2"/><path d="M12 18v3M8.5 21h7"/>' },
  { en: 'Bed Sheets', zh: '床包組', hue: 280, icon: '<path d="M3 19V6"/><path d="M3 14.5h18V19"/><path d="M21 14.5V12a3 3 0 0 0-3-3h-7v5.5"/><circle cx="7" cy="11.2" r="1.8"/>' },
  { en: 'Protein Powder', zh: '乳清蛋白', hue: 12, icon: '<path d="M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11"/>' },
  { en: 'Toilet Paper', zh: '衛生紙', hue: 330, icon: '<circle cx="8" cy="9" r="5"/><circle cx="8" cy="9" r="1.5"/><path d="M8 4h8.5a4 4 0 0 1 4 4v12.5h-7.5V14"/>' },
  { en: 'Mosquito Repellent', zh: '防蚊液', hue: 95, icon: '<path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3z"/><path d="m9 12 2 2 4-4"/>' },
  { en: 'Water Filter', zh: '濾水壺', hue: 195, icon: '<path d="M6 4h11l-1 2.5V19a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4z"/><path d="M16 8.5h1.5A2.5 2.5 0 0 1 20 11v2.5a2.5 2.5 0 0 1-2.5 2.5H16"/><path d="M6 11.5h10"/>' },
];

const VAULT_FIELDS = [
  { key: 'name', label: 'Recipient name', zh: '收件人姓名', placeholder: 'e.g. 王小明 or John Smith', autocomplete: 'name' },
  { key: 'phone', label: 'Taiwan mobile', zh: '手機號碼', placeholder: 'e.g. 0912345678', type: 'tel', inputmode: 'tel', autocomplete: 'tel' },
  { key: 'postal', label: 'Postal code', zh: '郵遞區號', placeholder: 'e.g. 106', inputmode: 'numeric', autocomplete: 'postal-code' },
  { key: 'address', label: 'Address in Chinese', zh: '中文收件地址', placeholder: 'e.g. 台北市大安區仁愛路四段…' },
  { key: 'carrier', label: 'Mobile barcode (載具)', zh: '手機條碼載具', placeholder: 'e.g. /ABC1234', autocapitalize: 'characters' },
  { key: 'store', label: 'Preferred 7-11 / FamilyMart', zh: '常用超商門市', placeholder: 'e.g. 7-11 敦南門市' },
];

const VAULT_GROUPS = [
  { id: 'delivery', title: 'Home delivery', zh: '宅配收件', icon: 'home', fields: ['name', 'phone', 'postal', 'address'] },
  { id: 'pickup', title: 'Store pickup', zh: '超商取貨', icon: 'store', fields: ['store'] },
  { id: 'invoice', title: 'E-invoice', zh: '電子發票', icon: 'receipt', fields: ['carrier'] },
];

const DELIVERY_PHRASES = [
  { en: 'Leave with building guard / reception', zh: '請交給大樓管理室／警衛室代收，謝謝！' },
  { en: 'Please text me (limited Chinese)', zh: '我是外國人，中文不太流利，抵達前請傳簡訊聯絡，謝謝！' },
  { en: 'Call me when downstairs', zh: '到樓下請打電話給我，我馬上出來拿，謝謝！' },
  { en: 'Weekday daytime delivery preferred', zh: '請於平日白天配送，謝謝！' },
  { en: 'Evening delivery after 6 PM preferred', zh: '請於晚上六點後配送，謝謝！' },
];

const GLOSSARY_CATS = [
  { id: 'all', label: 'All' },
  { id: 'cart', label: 'Cart' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'payment', label: 'Payment' },
  { id: 'invoice', label: 'E-invoice' },
  { id: 'orders', label: 'Orders' },
];

const GLOSSARY_ITEMS = [
  { cat: 'cart', zh: '加入購物車', en: 'Add to Cart', tip: 'Adds the item to your PChome 24h shopping cart.' },
  { cat: 'cart', zh: '立即購買 / 直接購買', en: 'Buy Now', tip: 'Skips cart browsing and jumps straight to checkout.' },
  { cat: 'cart', zh: '貨到通知我 / 補貨中', en: 'Out of Stock', tip: 'Currently sold out. Tap to get an email when restocked.' },
  { cat: 'cart', zh: '折價券', en: 'Coupon / Voucher', tip: 'Check this box during checkout to apply any active store coupons.' },
  { cat: 'delivery', zh: '宅配', en: 'Home Delivery (24h)', tip: 'Fastest option. Requires a Traditional Chinese address.' },
  { cat: 'delivery', zh: '超商取貨 (7-11 / 全家)', en: 'Convenience Store Pickup', tip: 'Great if you have no building guard. Bring your ARC/passport matching the recipient name.' },
  { cat: 'delivery', zh: '收件人資訊', en: 'Recipient Information', tip: 'Name, Taiwan mobile (09xx), and Traditional Chinese address.' },
  { cat: 'delivery', zh: '免運 / 運費', en: 'Free Shipping / Shipping Fee', tip: 'PChome 24h typically gives free shipping over NT$490.' },
  { cat: 'payment', zh: '信用卡一次付清', en: 'Credit Card (Full Payment)', tip: 'Choose this for normal credit/debit cards. Foreign cards may fail 3DS; try LINE Pay or Apple Pay if so.' },
  { cat: 'payment', zh: '信用卡分期', en: 'Credit Card Installments', tip: 'Usually only works with Taiwanese-issued bank cards.' },
  { cat: 'payment', zh: '貨到付款', en: 'Cash on Delivery (COD)', tip: 'Pay cash at your door or at the 7-11/FamilyMart counter.' },
  { cat: 'invoice', zh: '手機條碼載具', en: 'Mobile E-Invoice Barcode', tip: 'Your /XXXXXXX receipt lottery barcode. Saves paper and auto-checks Taiwan receipt lottery!' },
  { cat: 'invoice', zh: '個人電子發票', en: 'Personal E-Invoice', tip: 'Default option if you do not have a 載具 barcode yet (PChome holds it and emails you if you win).' },
  { cat: 'invoice', zh: '公司用發票 / 統一編號', en: 'Company Tax ID (統編)', tip: 'Only needed if expensing to a Taiwanese company.' },
  { cat: 'invoice', zh: '捐贈發票', en: 'Donate Receipt', tip: 'Donates your receipt lottery chance to charity.' },
  { cat: 'orders', zh: '查訂單', en: 'Order Tracking', tip: 'Check shipping progress or request a return/refund.' },
  { cat: 'orders', zh: '申請退貨', en: 'Request Return', tip: 'Taiwan consumer law gives a 7-day return window on online purchases.' },
];

// Approximate exchange rates for quick mental math (1 FX = X NTD)
const FX_RATES = {
  USD: { symbol: '$', perUnitNtd: 32.5 },
  AUD: { symbol: 'A$', perUnitNtd: 21.0 },
  EUR: { symbol: '€', perUnitNtd: 34.5 },
  GBP: { symbol: '£', perUnitNtd: 41.0 },
};

const SORT_LABELS = {
  'rnk/dc': 'Best match',
  'prc/ac': 'Price ↑',
  'prc/dc': 'Price ↓',
  'new/dc': 'Newest',
};

const STORAGE_KEYS = {
  saved: 'pchome_en_saved_v1',
  vault: 'pchome_en_vault_v1',
  currency: 'pchome_en_currency_v1',
  recent: 'pchome_en_recent_v1',
};

const MAX_RECENT = 8;

const state = {
  query: '',
  rawZh: false,
  scope: '24h',
  sort: 'rnk/dc',
  minPrice: '',
  maxPrice: '',
  page: 1,
  totalPage: 0,
  totalRows: 0,
  showZh: false,
  currency: safeGet(STORAGE_KEYS.currency) || 'USD',
  items: [],
  saved: loadJson(STORAGE_KEYS.saved, []),
  vault: loadJson(STORAGE_KEYS.vault, {}),
  recent: loadJson(STORAGE_KEYS.recent, []),
  trDirection: 'zh-en',
  lastTrResult: '',
  glossaryCat: 'all',
  searchToken: 0,
};

function safeGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore private mode quota errors
  }
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatNtd(n) {
  return `NT$${Number(n || 0).toLocaleString('en-US')}`;
}

function formatFx(ntd) {
  if (!ntd || state.currency === 'NONE' || !FX_RATES[state.currency]) return '';
  const { symbol, perUnitNtd } = FX_RATES[state.currency];
  const converted = ntd / perUnitNtd;
  return `≈ ${symbol}${converted.toFixed(converted >= 100 ? 0 : 2)} ${state.currency}`;
}

function discountPct(item) {
  if (!item.originPrice || !(item.originPrice > item.price)) return 0;
  const pct = Math.round((1 - item.price / item.originPrice) * 100);
  return pct >= 1 ? pct : 0;
}

const $ = (id) => document.getElementById(id);

// --- Toast ---
let toastTimer = null;
function showToast(msg, { ok = true } = {}) {
  const el = $('toast');
  $('toast-msg').textContent = msg;
  el.classList.toggle('toast--plain', !ok);
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2000);
}

// --- Copy with inline button feedback ---
function copyButtonHtml(label = 'Copy', extraClass = '') {
  return `<button type="button" class="copy-btn ${extraClass}"><span class="copy-ico">${icon('copy')}</span><span class="copy-label">${escapeHtml(label)}</span></button>`;
}

function flashCopied(btn) {
  if (!btn) return;
  const labelEl = btn.querySelector('.copy-label');
  const icoEl = btn.querySelector('.copy-ico');
  if (!btn.dataset.label && labelEl) btn.dataset.label = labelEl.textContent;
  btn.classList.add('copied');
  if (labelEl) labelEl.textContent = 'Copied';
  if (icoEl) icoEl.innerHTML = icon('check');
  clearTimeout(btn._copyTimer);
  btn._copyTimer = setTimeout(() => {
    btn.classList.remove('copied');
    if (labelEl) labelEl.textContent = btn.dataset.label || 'Copy';
    if (icoEl) icoEl.innerHTML = icon('copy');
  }, 1600);
}

async function copyText(text, label = 'Text', btn = null) {
  if (!text) {
    showToast('Nothing to copy yet', { ok: false });
    return false;
  }
  let ok = false;
  try {
    await navigator.clipboard.writeText(text);
    ok = true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.fontSize = '16px';
    document.body.appendChild(ta);
    ta.select();
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    ta.remove();
  }
  if (ok) {
    flashCopied(btn);
    showToast(`${label} copied`);
    if (navigator.vibrate) navigator.vibrate(8);
  } else {
    showToast('Copy failed — long-press to copy', { ok: false });
  }
  return ok;
}

// --- Tabs ---
function switchTab(tabName) {
  const current = document.querySelector('.tab-panel.active');
  const isSame = current && current.id === `tab-${tabName}`;
  document.querySelectorAll('.tab-panel').forEach((p) => {
    p.classList.toggle('active', p.id === `tab-${tabName}`);
  });
  document.querySelectorAll('.tab-btn').forEach((b) => {
    const active = b.dataset.tab === tabName;
    b.classList.toggle('active', active);
    if (active) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  if (tabName === 'saved') renderSaved();
  // iOS behaviour: re-tapping the active tab scrolls to top; switching tabs starts at top.
  window.scrollTo({ top: 0, behavior: isSame ? 'smooth' : 'auto' });
}

// --- Home / recent searches ---
function addRecent(q, raw) {
  const key = q.toLowerCase();
  state.recent = [{ q, raw: Boolean(raw) }, ...state.recent.filter((r) => r && r.q && r.q.toLowerCase() !== key)].slice(0, MAX_RECENT);
  saveJson(STORAGE_KEYS.recent, state.recent);
}

function renderRecent() {
  const wrap = $('recent-wrap');
  const list = $('recent-list');
  const items = state.recent.filter((r) => r && r.q);
  wrap.classList.toggle('hidden', !items.length);
  list.innerHTML = '';
  for (const r of items) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'recent-chip';
    btn.innerHTML = `${icon('clock', 'recent-ico')}<span ${r.raw ? 'lang="zh-Hant"' : ''}>${escapeHtml(r.q)}</span>${r.raw ? '<span class="recent-tag">中</span>' : ''}`;
    btn.addEventListener('click', () => startSearch(r.q, { raw: r.raw }));
    list.appendChild(btn);
  }
}

function showHome() {
  state.searchToken += 1; // cancel any in-flight search rendering
  state.query = '';
  state.items = [];
  state.totalPage = 0;
  state.totalRows = 0;
  $('results-grid').innerHTML = '';
  $('results-grid').removeAttribute('aria-busy');
  $('query-banner').classList.add('hidden');
  $('search-status').classList.add('hidden');
  $('pagination-wrap').classList.add('hidden');
  $('home-suggestions').classList.remove('hidden');
  renderRecent();
}

function startSearch(q, { raw = false } = {}) {
  const input = $('search-input');
  input.value = q;
  $('search-clear').classList.toggle('hidden', !q);
  input.blur();
  state.query = q;
  state.rawZh = raw;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  runSearch();
}

// --- Search & Results ---
function renderSkeletons(container, count = 6) {
  container.setAttribute('aria-busy', 'true');
  container.innerHTML = Array.from(
    { length: count },
    (_, i) => `
      <div class="product-card skeleton" aria-hidden="true" style="--i:${i}">
        <div class="product-img-wrap"><div class="sk sk-img"></div></div>
        <div class="product-info">
          <div class="sk sk-line"></div>
          <div class="sk sk-line sk-w70"></div>
          <div class="sk sk-price"></div>
        </div>
      </div>`
  ).join('');
}

function setStatus(kind, title, sub = '', action = null) {
  const statusEl = $('search-status');
  const ico = kind === 'error' ? 'alert' : 'search';
  statusEl.className = `status-box status-box--${kind}`;
  statusEl.innerHTML = `
    <span class="empty-ico">${icon(ico)}</span>
    <p class="empty-title">${escapeHtml(title)}</p>
    ${sub ? `<p class="empty-sub">${escapeHtml(sub)}</p>` : ''}
    ${action ? `<button type="button" class="btn-secondary" id="status-action">${escapeHtml(action.label)}</button>` : ''}
  `;
  if (action) statusEl.querySelector('#status-action').addEventListener('click', action.onClick);
}

function setLoadMoreLoading(loading) {
  const btn = $('load-more-btn');
  btn.disabled = loading;
  btn.classList.toggle('is-loading', loading);
  if (loading) {
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Loading…';
  } else if (state.page < state.totalPage) {
    btn.innerHTML = `Load more <span class="btn-meta">Page ${state.page + 1} of ${state.totalPage}</span>`;
  } else {
    btn.textContent = 'Load more results';
  }
}

async function runSearch({ append = false } = {}) {
  const q = state.query.trim();
  if (!q) return;

  const token = ++state.searchToken;
  const statusEl = $('search-status');
  const gridEl = $('results-grid');
  const paginationEl = $('pagination-wrap');
  const banner = $('query-banner');

  $('home-suggestions').classList.add('hidden');
  closeZhEditor();

  if (!append) {
    state.page = 1;
    state.items = [];
    paginationEl.classList.add('hidden');
    statusEl.classList.add('hidden');
    renderSkeletons(gridEl);
    // Show the banner immediately in a "translating" state
    banner.classList.remove('hidden');
    banner.classList.add('is-loading');
    $('zh-query-display').textContent = q;
    $('result-count-badge').innerHTML = '<span class="spinner spinner--sm" aria-hidden="true"></span>Translating';
  } else {
    setLoadMoreLoading(true);
  }

  const params = new URLSearchParams({
    q,
    scope: state.scope,
    sort: state.sort,
    page: String(state.page),
  });
  if (state.rawZh) params.set('raw', '1');
  if (state.minPrice) params.set('minPrice', state.minPrice);
  if (state.maxPrice) params.set('maxPrice', state.maxPrice);

  try {
    const res = await fetch(`/api/search?${params.toString()}`);
    const data = await res.json().catch(() => ({}));
    if (token !== state.searchToken) return; // a newer search superseded this one
    if (!res.ok) throw new Error(data.error || `Search failed (${res.status})`);

    const newItems = data.items || [];
    state.totalRows = data.totalRows || 0;
    state.totalPage = data.totalPage || 0;
    state.items = append ? [...state.items, ...newItems] : newItems;

    if (!append) addRecent(q, state.rawZh);

    banner.classList.remove('is-loading');
    $('zh-query-display').textContent = data.zhQuery || q;
    $('result-count-badge').textContent = `${state.totalRows.toLocaleString('en-US')} ${state.totalRows === 1 ? 'item' : 'items'}`;
    banner.dataset.zhQuery = data.zhQuery || q;

    if (!state.items.length) {
      gridEl.innerHTML = '';
      gridEl.removeAttribute('aria-busy');
      const in24 = state.scope === '24h';
      setStatus(
        'empty',
        'No matches on PChome',
        in24
          ? 'Nothing in 24h fast-ship for this term. Try all sellers, or edit the Chinese query above.'
          : 'Try a simpler English term, or edit the Chinese query above.',
        in24 ? { label: 'Search all of PChome', onClick: () => setScope('all') } : null
      );
      paginationEl.classList.add('hidden');
    } else {
      statusEl.classList.add('hidden');
      if (append) {
        appendProducts(gridEl, newItems);
      } else {
        renderProductGrid(gridEl, state.items);
      }
      gridEl.removeAttribute('aria-busy');
      paginationEl.classList.toggle('hidden', !(state.page < state.totalPage));
      setLoadMoreLoading(false);
    }
  } catch (err) {
    if (token !== state.searchToken) return;
    banner.classList.remove('is-loading');
    $('result-count-badge').textContent = '';
    if (append) {
      state.page = Math.max(1, state.page - 1);
      setLoadMoreLoading(false);
      showToast(`Couldn't load more: ${err.message}`, { ok: false });
    } else {
      gridEl.innerHTML = '';
      gridEl.removeAttribute('aria-busy');
      setStatus('error', 'Something went wrong', err.message || 'Please check your connection and try again.', {
        label: 'Try again',
        onClick: () => runSearch(),
      });
    }
  }
}

function setScope(scope) {
  state.scope = scope;
  const btn = $('toggle-24h');
  const is24 = scope === '24h';
  btn.classList.toggle('active', is24);
  btn.setAttribute('aria-pressed', String(is24));
  if (state.query) runSearch();
}

function isSaved(id) {
  return state.saved.some((item) => item.id === id);
}

function toggleSave(item, sourceBtn = null) {
  const exists = isSaved(item.id);
  if (exists) {
    state.saved = state.saved.filter((x) => x.id !== item.id);
    showToast('Removed from Saved', { ok: false });
  } else {
    state.saved = [item, ...state.saved];
    showToast('Saved to your list');
  }
  saveJson(STORAGE_KEYS.saved, state.saved);
  updateSavedBadge();
  syncHearts();
  if (sourceBtn && !exists) {
    sourceBtn.classList.remove('pop');
    void sourceBtn.offsetWidth;
    sourceBtn.classList.add('pop');
  }
  if ($('tab-saved').classList.contains('active')) renderSaved();
}

function syncHearts() {
  document.querySelectorAll('.product-card[data-id]').forEach((card) => {
    const saved = isSaved(card.dataset.id);
    const btn = card.querySelector('.save-heart');
    if (!btn) return;
    btn.classList.toggle('saved', saved);
    btn.setAttribute('aria-pressed', String(saved));
    btn.setAttribute('aria-label', saved ? 'Remove from saved' : 'Save item');
  });
}

function updateSavedBadge() {
  const pill = $('saved-count-pill');
  const n = state.saved.length;
  if (n > 0) {
    pill.textContent = n > 99 ? '99+' : String(n);
    pill.classList.remove('hidden');
  } else {
    pill.classList.add('hidden');
  }
}

function buildProductCard(item) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = item.id;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `${item.nameEn}, ${formatNtd(item.price)}`);
  const saved = isSaved(item.id);
  const fx = formatFx(item.price);
  const off = discountPct(item);
  const hasRating = typeof item.rating === 'number' && item.rating > 0;

  card.innerHTML = `
    <div class="product-img-wrap">
      <img src="${escapeHtml(item.image)}" alt="" loading="lazy" decoding="async" />
      <div class="img-badges">
        ${item.is24h ? `<span class="badge-24h">${icon('bolt')}24h</span>` : ''}
      </div>
      ${off ? `<span class="badge-off">−${off}%</span>` : ''}
      <button type="button" class="save-heart ${saved ? 'saved' : ''}" aria-pressed="${saved}" aria-label="${saved ? 'Remove from saved' : 'Save item'}">
        ${icon('heart')}
      </button>
    </div>
    <div class="product-info">
      <h3 class="product-title">${escapeHtml(item.nameEn)}</h3>
      ${state.showZh ? `<p class="product-zh" lang="zh-Hant">${escapeHtml(item.nameZh)}</p>` : ''}
      ${hasRating ? `<div class="product-rating">${icon('star')}<span>${item.rating.toFixed(1)}</span><span class="muted">(${Number(item.reviewCount || 0).toLocaleString('en-US')})</span></div>` : ''}
      <div class="product-price-block">
        <div class="product-price-row">
          <span class="price-nt"><span class="cur">NT$</span>${Number(item.price || 0).toLocaleString('en-US')}</span>
          ${off ? `<span class="price-orig">${formatNtd(item.originPrice)}</span>` : ''}
        </div>
        ${fx ? `<span class="price-fx">${escapeHtml(fx)}</span>` : ''}
      </div>
    </div>
  `;

  const img = card.querySelector('img');
  img.addEventListener('error', () => card.querySelector('.product-img-wrap').classList.add('img-missing'), { once: true });
  img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
  if (img.complete && img.naturalWidth) img.classList.add('loaded');

  card.querySelector('.save-heart').addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSave(item, e.currentTarget);
  });
  card.addEventListener('click', () => openProductSheet(item));
  card.addEventListener('keydown', (e) => {
    if (e.target !== card) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProductSheet(item);
    }
  });
  return card;
}

function renderProductGrid(container, items) {
  container.innerHTML = '';
  appendProducts(container, items);
}

function appendProducts(container, items) {
  const frag = document.createDocumentFragment();
  for (const item of items) frag.appendChild(buildProductCard(item));
  container.appendChild(frag);
}

// --- Product Detail Bottom Sheet ---
let sheetCloseTimer = null;
let sheetLastFocus = null;
let sheetItemId = null;

function stockHtml(kind, text) {
  return `<span class="stock-pill ${kind}"><span class="stock-dot"></span>${text}</span>`;
}

async function openProductSheet(item) {
  const backdrop = $('sheet-backdrop');
  const body = $('sheet-body');
  const footer = $('sheet-footer');
  const fx = formatFx(item.price);
  const off = discountPct(item);
  const saving = off ? item.originPrice - item.price : 0;
  const hasRating = typeof item.rating === 'number' && item.rating > 0;
  sheetItemId = item.id;

  body.innerHTML = `
    <div class="sheet-media">
      <img class="sheet-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.nameEn)}" />
    </div>

    <div class="sheet-head">
      <div class="sheet-tags">
        ${item.is24h ? `<span class="badge-24h badge-24h--inline">${icon('bolt')}24h fast ship</span>` : ''}
        <span id="sheet-stock">${stockHtml('checking', 'Checking stock…')}</span>
      </div>
      <h2 class="sheet-title" id="sheet-title">${escapeHtml(item.nameEn)}</h2>
      ${hasRating ? `<div class="product-rating product-rating--lg">${icon('star')}<span>${item.rating.toFixed(1)}</span><span class="muted">· ${Number(item.reviewCount || 0).toLocaleString('en-US')} reviews</span></div>` : ''}
      <div class="sheet-price-card">
        <div class="sheet-price-main">
          <span class="sheet-price"><span class="cur">NT$</span>${Number(item.price || 0).toLocaleString('en-US')}</span>
          ${off ? `<span class="off-badge">−${off}%</span>` : ''}
        </div>
        <div class="sheet-price-sub">
          ${off ? `<span class="price-orig">${formatNtd(item.originPrice)}</span><span class="save-amt">You save ${formatNtd(saving)}</span>` : ''}
          ${fx ? `<span class="sheet-fx">${escapeHtml(fx)}</span>` : ''}
        </div>
      </div>
    </div>

    <section class="sheet-block sheet-block--zh">
      <div class="sheet-block-head">
        <span class="sheet-block-label">Original listing <span lang="zh-Hant">中文標題</span></span>
        ${copyButtonHtml('Copy 中文', 'copy-btn--sm')}
      </div>
      <p class="sheet-zh" lang="zh-Hant">${escapeHtml(item.nameZh)}</p>
    </section>

    ${item.describeEn ? `
      <section class="sheet-block">
        <div class="sheet-block-head"><span class="sheet-block-label">Highlights · translated</span></div>
        <p class="sheet-desc">${escapeHtml(item.describeEn)}</p>
      </section>
    ` : ''}

    <section class="sheet-tip">
      <span class="sheet-tip-ico">${icon('bulb')}</span>
      <p>On PChome tap <strong lang="zh-Hant">加入購物車</strong> (Add to Cart), then flip back to the <strong>Vault</strong> tab to copy your Chinese address &amp; 載具 barcode.</p>
    </section>
  `;

  footer.innerHTML = `
    <button type="button" id="sheet-save-btn" class="sheet-save" aria-pressed="false">${icon('heart')}<span>Save</span></button>
    <a class="btn-primary sheet-open" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Open on PChome ${icon('external', 'btn-ico')}</a>
  `;

  const setSaveBtn = () => {
    const btn = $('sheet-save-btn');
    if (!btn) return;
    const s = isSaved(item.id);
    btn.classList.toggle('saved', s);
    btn.setAttribute('aria-pressed', String(s));
    btn.querySelector('span').textContent = s ? 'Saved' : 'Save';
  };
  setSaveBtn();

  const sheetImg = body.querySelector('.sheet-img');
  sheetImg.addEventListener('error', () => body.querySelector('.sheet-media').classList.add('img-missing'), { once: true });

  body.querySelector('.sheet-block--zh .copy-btn').addEventListener('click', (e) => copyText(item.nameZh, 'Chinese title', e.currentTarget));
  footer.querySelector('#sheet-save-btn').addEventListener('click', (e) => {
    toggleSave(item, e.currentTarget);
    setSaveBtn();
  });

  // Animate in
  clearTimeout(sheetCloseTimer);
  sheetLastFocus = document.activeElement;
  const card = $('sheet-card');
  card.style.transform = '';
  body.scrollTop = 0;
  backdrop.classList.remove('hidden');
  void backdrop.offsetHeight; // force reflow so the transition runs
  backdrop.classList.add('open');
  document.documentElement.classList.add('sheet-locked');
  setTimeout(() => $('sheet-x').focus({ preventScroll: true }), 60);

  // Fetch real-time stock from PChome product API
  const requestedId = item.id;
  try {
    const res = await fetch(`/api/product/${encodeURIComponent(item.id)}`);
    if (!res.ok) throw new Error('unavailable');
    const detail = await res.json();
    const stockEl = $('sheet-stock');
    if (!stockEl || sheetItemId !== requestedId) return;
    if (!detail.inStock) {
      stockEl.innerHTML = stockHtml('out', 'Out of stock · <span lang="zh-Hant">補貨中</span>');
    } else if (typeof detail.qty === 'number' && detail.qty <= 5) {
      stockEl.innerHTML = stockHtml('low', `Only ${detail.qty} left`);
    } else {
      stockEl.innerHTML = stockHtml('in', 'In stock');
    }
  } catch {
    const stockEl = $('sheet-stock');
    if (stockEl && sheetItemId === requestedId) stockEl.innerHTML = stockHtml('unknown', 'Check stock on PChome');
  }
}

function closeProductSheet() {
  const backdrop = $('sheet-backdrop');
  if (backdrop.classList.contains('hidden')) return;
  backdrop.classList.remove('open');
  backdrop.classList.remove('dragging');
  $('sheet-card').style.transform = '';
  document.documentElement.classList.remove('sheet-locked');
  sheetItemId = null;
  clearTimeout(sheetCloseTimer);
  sheetCloseTimer = setTimeout(() => backdrop.classList.add('hidden'), 320);
  if (sheetLastFocus && typeof sheetLastFocus.focus === 'function') {
    sheetLastFocus.focus({ preventScroll: true });
  }
}

function initSheetDrag() {
  const handle = $('sheet-close-bar');
  const card = $('sheet-card');
  const backdrop = $('sheet-backdrop');
  let startY = 0;
  let dy = 0;
  let dragging = false;

  handle.addEventListener('touchstart', (e) => {
    if (e.target.closest('.sheet-x')) return;
    dragging = true;
    startY = e.touches[0].clientY;
    dy = 0;
    backdrop.classList.add('dragging');
  }, { passive: true });

  handle.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    dy = Math.max(0, e.touches[0].clientY - startY);
    card.style.transform = `translateY(${dy}px)`;
  }, { passive: true });

  const end = () => {
    if (!dragging) return;
    dragging = false;
    backdrop.classList.remove('dragging');
    if (dy > 110) {
      closeProductSheet();
    } else {
      card.style.transform = '';
    }
  };
  handle.addEventListener('touchend', end);
  handle.addEventListener('touchcancel', end);
}

// --- Saved Tab ---
function renderSaved() {
  const grid = $('saved-grid');
  const empty = $('saved-empty');
  const clearBtn = $('clear-saved-btn');
  const summary = $('saved-summary');

  if (!state.saved.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    clearBtn.classList.add('hidden');
    summary.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  clearBtn.classList.remove('hidden');

  const total = state.saved.reduce((sum, it) => sum + (Number(it.price) || 0), 0);
  const fx = formatFx(total);
  summary.innerHTML = `
    <div>
      <span class="summary-label">${state.saved.length} ${state.saved.length === 1 ? 'item' : 'items'} · one of each</span>
      <span class="summary-total">${formatNtd(total)}</span>
    </div>
    ${fx ? `<span class="summary-fx">${escapeHtml(fx)}</span>` : ''}
  `;
  summary.classList.remove('hidden');
  renderProductGrid(grid, state.saved);
}

// --- Checkout Vault ---
function vaultFilledCount() {
  return VAULT_FIELDS.filter((f) => (state.vault[f.key] || '').trim()).length;
}

function renderVaultProgress() {
  const el = $('vault-progress');
  const total = VAULT_FIELDS.length;
  const filled = vaultFilledCount();
  const pct = filled / total;
  const C = 2 * Math.PI * 18;
  const done = filled === total;
  el.classList.toggle('is-complete', done);
  el.innerHTML = `
    <div class="ring" aria-hidden="true">
      <svg viewBox="0 0 44 44">
        <circle class="ring-track" cx="22" cy="22" r="18"/>
        <circle class="ring-fill" cx="22" cy="22" r="18" stroke-dasharray="${C.toFixed(2)}" stroke-dashoffset="${(C * (1 - pct)).toFixed(2)}"/>
      </svg>
      <span class="ring-num">${done ? icon('check') : `${filled}/${total}`}</span>
    </div>
    <div class="vp-text">
      <strong>${done ? 'Checkout ready' : filled ? `${filled} of ${total} details saved` : 'Set up your checkout details'}</strong>
      <span>${icon('lock', 'vp-lock')}Stored only on this device — never uploaded.</span>
    </div>
  `;
}

function renderVault() {
  const container = $('vault-fields');
  container.innerHTML = '';
  const fieldsByKey = Object.fromEntries(VAULT_FIELDS.map((f) => [f.key, f]));

  for (const group of VAULT_GROUPS) {
    const section = document.createElement('section');
    section.className = 'vault-group';
    section.innerHTML = `
      <div class="vault-group-head">
        <span class="vg-ico vg-ico--${group.id}">${icon(group.icon)}</span>
        <h3 class="group-title">${escapeHtml(group.title)} <span class="group-zh" lang="zh-Hant">${escapeHtml(group.zh)}</span></h3>
      </div>
      <div class="vault-card"></div>
    `;
    const cardEl = section.querySelector('.vault-card');

    for (const key of group.fields) {
      const field = fieldsByKey[key];
      const value = state.vault[field.key] || '';
      const row = document.createElement('div');
      row.className = 'vault-row';
      row.classList.toggle('filled', Boolean(value.trim()));
      row.innerHTML = `
        <div class="vault-label-row">
          <label class="vault-label" for="vault-${field.key}">
            <span class="vault-check" aria-hidden="true">${icon('check')}</span>${escapeHtml(field.label)}
          </label>
          <span class="vault-zh" lang="zh-Hant">${escapeHtml(field.zh)}</span>
        </div>
        <div class="vault-input-row">
          <input id="vault-${field.key}" type="${field.type || 'text'}" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder)}"
            ${field.inputmode ? `inputmode="${field.inputmode}"` : ''}
            ${field.autocomplete ? `autocomplete="${field.autocomplete}"` : 'autocomplete="off"'}
            ${field.autocapitalize ? `autocapitalize="${field.autocapitalize}"` : ''}
            autocorrect="off" spellcheck="false" />
          ${copyButtonHtml('Copy')}
        </div>
      `;
      const input = row.querySelector('input');
      input.addEventListener('input', () => {
        state.vault[field.key] = input.value;
        saveJson(STORAGE_KEYS.vault, state.vault);
        row.classList.toggle('filled', Boolean(input.value.trim()));
        renderVaultProgress();
      });
      row.querySelector('.copy-btn').addEventListener('click', (e) => {
        copyText(input.value.trim(), field.label, e.currentTarget);
      });
      cardEl.appendChild(row);
    }
    container.appendChild(section);
  }
  renderVaultProgress();

  const phraseWrap = $('delivery-phrases');
  phraseWrap.innerHTML = '';
  for (const p of DELIVERY_PHRASES) {
    const card = document.createElement('div');
    card.className = 'phrase-card';
    card.innerHTML = `
      <div class="phrase-text">
        <div class="phrase-en">${escapeHtml(p.en)}</div>
        <div class="phrase-zh" lang="zh-Hant">${escapeHtml(p.zh)}</div>
      </div>
      ${copyButtonHtml('Copy')}
    `;
    card.querySelector('.copy-btn').addEventListener('click', (e) => copyText(p.zh, 'Chinese note', e.currentTarget));
    phraseWrap.appendChild(card);
  }
}

// --- Guide & Translator ---
function renderGlossaryCats() {
  const wrap = $('glossary-cats');
  wrap.innerHTML = GLOSSARY_CATS.map((c) => {
    const count = c.id === 'all' ? GLOSSARY_ITEMS.length : GLOSSARY_ITEMS.filter((g) => g.cat === c.id).length;
    const active = state.glossaryCat === c.id;
    return `<button type="button" role="tab" class="cat-chip ${active ? 'active' : ''}" aria-selected="${active}" data-cat="${c.id}">${escapeHtml(c.label)}<span class="cat-count">${count}</span></button>`;
  }).join('');
  wrap.querySelectorAll('.cat-chip').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.glossaryCat = btn.dataset.cat;
      renderGlossaryCats();
      renderGlossary($('glossary-filter').value);
    });
  });
}

function renderGlossary(filterText = '') {
  const list = $('glossary-list');
  const needle = filterText.trim().toLowerCase();
  const catLabel = Object.fromEntries(GLOSSARY_CATS.map((c) => [c.id, c.label]));
  const filtered = GLOSSARY_ITEMS.filter(
    (g) =>
      (state.glossaryCat === 'all' || g.cat === state.glossaryCat) &&
      (!needle ||
        g.zh.toLowerCase().includes(needle) ||
        g.en.toLowerCase().includes(needle) ||
        g.tip.toLowerCase().includes(needle))
  );

  if (!filtered.length) {
    list.innerHTML = `<div class="glossary-empty">No terms match “${escapeHtml(filterText.trim())}”.</div>`;
    return;
  }

  list.innerHTML = filtered
    .map(
      (g, i) => `
      <article class="glossary-item">
        <div class="glossary-top">
          <span class="glossary-tag glossary-tag--${g.cat}">${escapeHtml(catLabel[g.cat] || g.cat)}</span>
          <button type="button" class="copy-btn copy-btn--icon" data-idx="${GLOSSARY_ITEMS.indexOf(g)}" aria-label="Copy ${escapeHtml(g.zh)}"><span class="copy-ico">${icon('copy')}</span><span class="copy-label visually-hidden">Copy</span></button>
        </div>
        <p class="glossary-zh" lang="zh-Hant">${escapeHtml(g.zh)}</p>
        <p class="glossary-en">${escapeHtml(g.en)}</p>
        <p class="glossary-tip">${escapeHtml(g.tip)}</p>
      </article>
    `
    )
    .join('');

  list.querySelectorAll('.copy-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const g = GLOSSARY_ITEMS[Number(btn.dataset.idx)];
      if (g) copyText(g.zh, 'Chinese term', e.currentTarget);
    });
  });
}

function applyTrDirection() {
  const zhEn = state.trDirection === 'zh-en';
  $('tr-from').textContent = zhEn ? '繁體中文' : 'English';
  $('tr-to').textContent = zhEn ? 'English' : '繁體中文';
  $('tr-out-lang').textContent = zhEn ? 'English' : '繁體中文';
  $('tr-input').placeholder = zhEn
    ? 'Paste Chinese text from PChome or an SMS…'
    : 'Type an English note for the delivery driver…';
  $('tr-input').setAttribute('lang', zhEn ? 'zh-Hant' : 'en');
  $('tr-out-text').setAttribute('lang', zhEn ? 'en' : 'zh-Hant');
}

async function runQuickTranslate() {
  const input = $('tr-input').value.trim();
  const outEl = $('tr-output');
  const outText = $('tr-out-text');
  const copyBtn = $('tr-copy');
  const trBtn = $('tr-btn');
  if (!input) {
    $('tr-input').focus();
    return;
  }

  outEl.classList.remove('hidden', 'is-error');
  outEl.classList.add('is-loading');
  outText.innerHTML = '<span class="sk sk-line"></span><span class="sk sk-line sk-w70"></span>';
  copyBtn.classList.add('hidden');
  trBtn.disabled = true;
  trBtn.innerHTML = '<span class="spinner spinner--light" aria-hidden="true"></span>Translating…';

  const to = state.trDirection === 'en-zh' ? 'zh-TW' : 'en';
  try {
    const res = await fetch(`/api/translate?to=${encodeURIComponent(to)}&text=${encodeURIComponent(input)}`);
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || 'Translation failed');
    state.lastTrResult = data.translated || '';
    outText.textContent = state.lastTrResult;
    copyBtn.classList.remove('hidden');
  } catch (err) {
    outEl.classList.add('is-error');
    outText.textContent = `Couldn't translate: ${err.message}`;
  } finally {
    outEl.classList.remove('is-loading');
    trBtn.disabled = false;
    trBtn.textContent = 'Translate';
  }
}

// --- Inline 中文 query editor ---
function openZhEditor() {
  const banner = $('query-banner');
  const input = $('zh-edit-input');
  input.value = banner.dataset.zhQuery || state.query;
  $('qb-view').classList.add('hidden');
  $('zh-edit-form').classList.remove('hidden');
  input.focus();
  input.select();
}

function closeZhEditor() {
  $('zh-edit-form').classList.add('hidden');
  $('qb-view').classList.remove('hidden');
}

function updatePriceChip() {
  const label = $('price-chip-label');
  const btn = $('toggle-price');
  const { minPrice: min, maxPrice: max } = state;
  const fmt = (v) => Number(v).toLocaleString('en-US');
  let text = 'NT$ range';
  if (min && max) text = `NT$${fmt(min)}–${fmt(max)}`;
  else if (min) text = `NT$${fmt(min)}+`;
  else if (max) text = `Under NT$${fmt(max)}`;
  label.textContent = text;
  btn.classList.toggle('has-value', Boolean(min || max));
}

function updateSelectLabels() {
  $('sort-label').textContent = SORT_LABELS[state.sort] || 'Sort';
  $('currency-label').textContent = state.currency === 'NONE' ? 'NT$' : state.currency;
}

// --- Init ---
function init() {
  // Quick categories
  const quickEl = $('quick-categories');
  for (const cat of QUICK_CATEGORIES) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quick-card';
    btn.style.setProperty('--hue', cat.hue);
    btn.innerHTML = `
      <span class="qc-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${cat.icon}</svg></span>
      <span class="qc-text">
        <span class="qc-en">${escapeHtml(cat.en)}</span>
        <span class="qc-zh" lang="zh-Hant">${escapeHtml(cat.zh)}</span>
      </span>`;
    btn.addEventListener('click', () => startSearch(cat.en));
    quickEl.appendChild(btn);
  }
  renderRecent();
  $('clear-recent').addEventListener('click', () => {
    state.recent = [];
    saveJson(STORAGE_KEYS.recent, []);
    renderRecent();
  });

  // Currency select
  const currencySel = $('currency-select');
  currencySel.value = FX_RATES[state.currency] || state.currency === 'NONE' ? state.currency : 'USD';
  state.currency = currencySel.value;
  currencySel.addEventListener('change', () => {
    state.currency = currencySel.value;
    try {
      localStorage.setItem(STORAGE_KEYS.currency, state.currency);
    } catch {
      // ignore
    }
    updateSelectLabels();
    if (state.items.length) renderProductGrid($('results-grid'), state.items);
    if ($('tab-saved').classList.contains('active')) renderSaved();
  });

  // Search form
  const searchInput = $('search-input');
  const searchClear = $('search-clear');
  searchInput.addEventListener('input', () => {
    searchClear.classList.toggle('hidden', !searchInput.value);
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    if (state.query) showHome();
    searchInput.focus();
  });
  $('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (!val) {
      searchInput.focus();
      return;
    }
    startSearch(val);
  });

  // Filters
  $('toggle-24h').addEventListener('click', () => setScope(state.scope === '24h' ? 'all' : '24h'));

  const sortSelect = $('sort-select');
  sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    updateSelectLabels();
    if (state.query) runSearch();
  });

  const priceBar = $('price-filter-bar');
  const togglePriceBtn = $('toggle-price');
  togglePriceBtn.addEventListener('click', () => {
    priceBar.classList.toggle('hidden');
    const open = !priceBar.classList.contains('hidden');
    togglePriceBtn.classList.toggle('active', open);
    togglePriceBtn.setAttribute('aria-expanded', String(open));
    if (open) $('min-price').focus({ preventScroll: true });
  });
  const applyPrice = () => {
    state.minPrice = $('min-price').value.trim();
    state.maxPrice = $('max-price').value.trim();
    updatePriceChip();
    priceBar.classList.add('hidden');
    togglePriceBtn.classList.remove('active');
    togglePriceBtn.setAttribute('aria-expanded', 'false');
    document.activeElement?.blur?.();
    if (state.query) runSearch();
  };
  $('apply-price').addEventListener('click', applyPrice);
  ['min-price', 'max-price'].forEach((id) =>
    $(id).addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        applyPrice();
      }
    })
  );
  $('clear-price').addEventListener('click', () => {
    $('min-price').value = '';
    $('max-price').value = '';
    state.minPrice = '';
    state.maxPrice = '';
    updatePriceChip();
    if (state.query) runSearch();
  });

  const toggleZhBtn = $('toggle-zh');
  toggleZhBtn.addEventListener('click', () => {
    state.showZh = !state.showZh;
    toggleZhBtn.classList.toggle('active', state.showZh);
    toggleZhBtn.setAttribute('aria-pressed', String(state.showZh));
    if (state.items.length) renderProductGrid($('results-grid'), state.items);
    if ($('tab-saved').classList.contains('active')) renderSaved();
  });

  // Edit 中文 (inline editor)
  $('edit-zh-query').addEventListener('click', openZhEditor);
  $('zh-edit-cancel').addEventListener('click', closeZhEditor);
  $('zh-edit-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const edited = $('zh-edit-input').value.trim();
    if (!edited) return;
    closeZhEditor();
    startSearch(edited, { raw: true });
  });
  $('zh-edit-input').addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeZhEditor();
  });

  $('load-more-btn').addEventListener('click', () => {
    if (state.page < state.totalPage) {
      state.page += 1;
      runSearch({ append: true });
    }
  });

  // Saved clear
  $('clear-saved-btn').addEventListener('click', () => {
    if (!window.confirm('Remove all saved items?')) return;
    state.saved = [];
    saveJson(STORAGE_KEYS.saved, []);
    updateSavedBadge();
    syncHearts();
    renderSaved();
  });
  document.querySelectorAll('[data-goto]').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.goto));
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Sheet close
  $('sheet-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'sheet-backdrop') closeProductSheet();
  });
  $('sheet-x').addEventListener('click', closeProductSheet);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductSheet();
  });
  initSheetDrag();

  // Translator
  const trInput = $('tr-input');
  const trClear = $('tr-clear');
  applyTrDirection();
  $('tr-swap').addEventListener('click', (e) => {
    state.trDirection = state.trDirection === 'zh-en' ? 'en-zh' : 'zh-en';
    e.currentTarget.classList.toggle('flipped');
    // Like iOS Translate: swapping moves the result into the input
    if (state.lastTrResult && !$('tr-output').classList.contains('hidden')) {
      trInput.value = state.lastTrResult;
      state.lastTrResult = '';
      $('tr-output').classList.add('hidden');
      trClear.classList.toggle('hidden', !trInput.value);
    }
    applyTrDirection();
  });
  trInput.addEventListener('input', () => trClear.classList.toggle('hidden', !trInput.value));
  trInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      runQuickTranslate();
    }
  });
  trClear.addEventListener('click', () => {
    trInput.value = '';
    trClear.classList.add('hidden');
    $('tr-output').classList.add('hidden');
    state.lastTrResult = '';
    trInput.focus();
  });
  $('tr-btn').addEventListener('click', runQuickTranslate);
  const trCopy = $('tr-copy');
  trCopy.querySelector('.copy-ico').innerHTML = icon('copy');
  trCopy.addEventListener('click', (e) => copyText(state.lastTrResult, 'Translation', e.currentTarget));

  // Glossary filter
  $('glossary-filter').addEventListener('input', (e) => {
    renderGlossary(e.target.value);
  });

  // Header elevation on scroll
  const topBar = $('top-bar');
  const onScroll = () => topBar.classList.toggle('scrolled', window.scrollY > 4);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  updateSelectLabels();
  updatePriceChip();
  updateSavedBadge();
  renderVault();
  renderGlossaryCats();
  renderGlossary();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

init();
