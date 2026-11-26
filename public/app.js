const QUICK_CATEGORIES = [
  { en: 'Dehumidifier', zh: '除濕機' },
  { en: 'USB-C GaN Charger', zh: '氮化鎵充電器' },
  { en: 'Power Bank', zh: '行動電源' },
  { en: 'Extension Cord', zh: '延長線' },
  { en: 'Air Purifier', zh: '空氣清淨機' },
  { en: 'Wireless Mouse', zh: '無線滑鼠' },
  { en: 'Electric Fan', zh: '電風扇' },
  { en: 'Bed Sheets', zh: '床包組' },
  { en: 'Protein Powder', zh: '乳清蛋白' },
  { en: 'Toilet Paper', zh: '衛生紙' },
  { en: 'Mosquito Repellent', zh: '防蚊液' },
  { en: 'Water Filter', zh: '濾水壺' },
];

const VAULT_FIELDS = [
  { key: 'name', label: 'Name for Delivery', zh: '收件人姓名', placeholder: 'e.g. 王小明 or John Smith (Chinese preferred)' },
  { key: 'phone', label: 'Taiwan Mobile Number', zh: '手機號碼', placeholder: 'e.g. 0912345678' },
  { key: 'postal', label: 'Postal Code (3+3 / 5 digits)', zh: '郵遞區號', placeholder: 'e.g. 106' },
  { key: 'address', label: 'Traditional Chinese Address', zh: '中文收件地址', placeholder: 'e.g. 台北市大安區仁愛路四段...' },
  { key: 'carrier', label: 'E-Invoice Barcode (載具)', zh: '手機條碼載具', placeholder: 'e.g. /ABC1234' },
  { key: 'store', label: 'Preferred 7-11 / FamilyMart', zh: '常用超商門市', placeholder: 'e.g. 7-11 敦南門市' },
];

const DELIVERY_PHRASES = [
  { en: 'Leave with building guard / reception', zh: '請交給大樓管理室／警衛室代收，謝謝！' },
  { en: 'Please text me (limited Chinese)', zh: '我是外國人，中文不太流利，抵達前請傳簡訊聯絡，謝謝！' },
  { en: 'Call me when downstairs', zh: '到樓下請打電話給我，我馬上出來拿，謝謝！' },
  { en: 'Weekday daytime delivery preferred', zh: '請於平日白天配送，謝謝！' },
  { en: 'Evening delivery after 6 PM preferred', zh: '請於晚上六點後配送，謝謝！' },
];

const GLOSSARY_ITEMS = [
  { zh: '加入購物車', en: 'Add to Cart', tip: 'Adds the item to your PChome 24h shopping cart.' },
  { zh: '立即購買 / 直接購買', en: 'Buy Now', tip: 'Skips cart browsing and jumps straight to checkout.' },
  { zh: '貨到通知我 / 補貨中', en: 'Out of Stock', tip: 'Currently sold out. Tap to get an email when restocked.' },
  { zh: '宅配', en: 'Home Delivery (24h)', tip: 'Fastest option. Requires a Traditional Chinese address.' },
  { zh: '超商取貨 (7-11 / 全家)', en: 'Convenience Store Pickup', tip: 'Great if you have no building guard. Bring your ARC/passport matching the recipient name.' },
  { zh: '信用卡一次付清', en: 'Credit Card (Full Payment)', tip: 'Choose this for normal credit/debit cards. Foreign cards may fail 3DS; try LINE Pay or Apple Pay if so.' },
  { zh: '信用卡分期', en: 'Credit Card Installments', tip: 'Usually only works with Taiwanese-issued bank cards.' },
  { zh: '貨到付款', en: 'Cash on Delivery (COD)', tip: 'Pay cash at your door or at the 7-11/FamilyMart counter.' },
  { zh: '手機條碼載具', en: 'Mobile E-Invoice Barcode', tip: 'Your /XXXXXXX receipt lottery barcode. Saves paper and auto-checks Taiwan receipt lottery!' },
  { zh: '個人電子發票', en: 'Personal E-Invoice', tip: 'Default option if you do not have a 載具 barcode yet (PChome holds it and emails you if you win).' },
  { zh: '公司用發票 / 統一編號', en: 'Company Tax ID (統編)', tip: 'Only needed if expensing to a Taiwanese company.' },
  { zh: '捐贈發票', en: 'Donate Receipt', tip: 'Donates your receipt lottery chance to charity.' },
  { zh: '收件人資訊', en: 'Recipient Information', tip: 'Name, Taiwan mobile (09xx), and Traditional Chinese address.' },
  { zh: '免運 / 運費', en: 'Free Shipping / Shipping Fee', tip: 'PChome 24h typically gives free shipping over NT$490.' },
  { zh: '折價券', en: 'Coupon / Voucher', tip: 'Check this box during checkout to apply any active store coupons.' },
  { zh: '查訂單', en: 'Order Tracking', tip: 'Check shipping progress or request a return/refund.' },
  { zh: '申請退貨', en: 'Request Return', tip: 'Taiwan consumer law gives a 7-day return window on online purchases.' },
];

// Approximate exchange rates for quick mental math (1 FX = X NTD)
const FX_RATES = {
  USD: { symbol: '$', perUnitNtd: 32.5 },
  AUD: { symbol: 'A$', perUnitNtd: 21.0 },
  EUR: { symbol: '€', perUnitNtd: 34.5 },
  GBP: { symbol: '£', perUnitNtd: 41.0 },
};

const STORAGE_KEYS = {
  saved: 'pchome_en_saved_v1',
  vault: 'pchome_en_vault_v1',
  currency: 'pchome_en_currency_v1',
};

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
  currency: localStorage.getItem(STORAGE_KEYS.currency) || 'USD',
  items: [],
  saved: loadJson(STORAGE_KEYS.saved, []),
  vault: loadJson(STORAGE_KEYS.vault, {}),
  trDirection: 'zh-en',
  lastTrResult: '',
};

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
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function formatFx(ntd) {
  if (!ntd || state.currency === 'NONE' || !FX_RATES[state.currency]) return '';
  const { symbol, perUnitNtd } = FX_RATES[state.currency];
  const converted = ntd / perUnitNtd;
  return `≈ ${symbol}${converted.toFixed(converted >= 100 ? 0 : 2)} ${state.currency}`;
}

let toastTimer = null;
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.add('hidden'), 2200);
}

async function copyText(text, label = 'Copied') {
  if (!text) return showToast('Nothing to copy yet');
  try {
    await navigator.clipboard.writeText(text);
    showToast(`${label} copied`);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    showToast(`${label} copied`);
  }
}

// --- Tabs ---
function switchTab(tabName) {
  document.querySelectorAll('.tab-panel').forEach((p) => {
    p.classList.toggle('active', p.id === `tab-${tabName}`);
  });
  document.querySelectorAll('.tab-btn').forEach((b) => {
    b.classList.toggle('active', b.dataset.tab === tabName);
  });
  if (tabName === 'saved') renderSaved();
}

// --- Search & Results ---
async function runSearch({ append = false } = {}) {
  const q = state.query.trim();
  if (!q) return;

  const statusEl = document.getElementById('search-status');
  const suggestionsEl = document.getElementById('home-suggestions');
  const gridEl = document.getElementById('results-grid');
  const paginationEl = document.getElementById('pagination-wrap');
  const loadMoreBtn = document.getElementById('load-more-btn');

  suggestionsEl.classList.add('hidden');
  if (!append) {
    state.page = 1;
    state.items = [];
    gridEl.innerHTML = '';
    paginationEl.classList.add('hidden');
    statusEl.textContent = 'Searching PChome 24h & translating results...';
    statusEl.classList.remove('hidden');
  } else {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';
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
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Search failed');

    state.totalRows = data.totalRows || 0;
    state.totalPage = data.totalPage || 0;
    state.items = append ? [...state.items, ...(data.items || [])] : data.items || [];

    const banner = document.getElementById('query-banner');
    document.getElementById('zh-query-display').textContent = data.zhQuery || q;
    document.getElementById('result-count-badge').textContent = `${state.totalRows.toLocaleString()} items`;
    banner.classList.remove('hidden');
    banner.dataset.zhQuery = data.zhQuery || q;

    if (!state.items.length) {
      statusEl.textContent = `No results found on PChome (${state.scope === '24h' ? '24h Only' : 'All'}). Try switching off "24h Only" or editing the Chinese query.`;
      statusEl.classList.remove('hidden');
      paginationEl.classList.add('hidden');
    } else {
      statusEl.classList.add('hidden');
      renderProductGrid(gridEl, state.items);
      if (state.page < state.totalPage) {
        paginationEl.classList.remove('hidden');
        loadMoreBtn.disabled = false;
        loadMoreBtn.textContent = `Load More (Page ${state.page} of ${state.totalPage})`;
      } else {
        paginationEl.classList.add('hidden');
      }
    }
  } catch (err) {
    statusEl.textContent = `Error: ${err.message}`;
    statusEl.classList.remove('hidden');
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = 'Load More Results';
  }
}

function isSaved(id) {
  return state.saved.some((item) => item.id === id);
}

function toggleSave(item) {
  const exists = isSaved(item.id);
  if (exists) {
    state.saved = state.saved.filter((x) => x.id !== item.id);
    showToast('Removed from Saved');
  } else {
    state.saved = [item, ...state.saved];
    showToast('Saved to wishlist');
  }
  saveJson(STORAGE_KEYS.saved, state.saved);
  updateSavedBadge();
  renderProductGrid(document.getElementById('results-grid'), state.items);
  if (document.getElementById('tab-saved').classList.contains('active')) {
    renderSaved();
  }
}

function updateSavedBadge() {
  const pill = document.getElementById('saved-count-pill');
  if (state.saved.length > 0) {
    pill.textContent = String(state.saved.length);
    pill.classList.remove('hidden');
  } else {
    pill.classList.add('hidden');
  }
}

function renderProductGrid(container, items) {
  container.innerHTML = '';
  const frag = document.createDocumentFragment();

  for (const item of items) {
    const card = document.createElement('article');
    card.className = 'product-card';
    const saved = isSaved(item.id);
    const fx = formatFx(item.price);
    const showOrig = item.originPrice > item.price;

    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.nameEn)}" loading="lazy" />
        ${item.is24h ? '<span class="badge-24h">24h</span>' : ''}
        <button type="button" class="save-heart ${saved ? 'saved' : ''}" aria-label="${saved ? 'Remove bookmark' : 'Save item'}">
          <svg viewBox="0 0 24 24" fill="${saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-title">${escapeHtml(item.nameEn)}</h3>
        ${state.showZh ? `<p class="product-zh">${escapeHtml(item.nameZh)}</p>` : ''}
        ${item.rating ? `<div class="product-rating">★ ${item.rating.toFixed(1)} (${item.reviewCount})</div>` : ''}
        <div class="product-price-row">
          <span class="price-nt">NT$${item.price.toLocaleString()}</span>
          ${showOrig ? `<span class="price-orig">NT$${item.originPrice.toLocaleString()}</span>` : ''}
          ${fx ? `<span class="price-fx">${escapeHtml(fx)}</span>` : ''}
        </div>
      </div>
    `;

    card.querySelector('.save-heart').addEventListener('click', (e) => {
      e.stopPropagation();
      toggleSave(item);
    });
    card.addEventListener('click', () => openProductSheet(item));
    frag.appendChild(card);
  }

  container.appendChild(frag);
}

// --- Product Detail Bottom Sheet ---
async function openProductSheet(item) {
  const backdrop = document.getElementById('sheet-backdrop');
  const body = document.getElementById('sheet-body');
  const fx = formatFx(item.price);
  const saved = isSaved(item.id);

  body.innerHTML = `
    <div class="sheet-hero">
      <img class="sheet-img" src="${escapeHtml(item.image)}" alt="${escapeHtml(item.nameEn)}" />
      <div>
        <h2 class="sheet-title" id="sheet-title">${escapeHtml(item.nameEn)}</h2>
        <div class="sheet-price">NT$${item.price.toLocaleString()}</div>
        ${fx ? `<div class="muted" style="font-size:13px;">${escapeHtml(fx)}</div>` : ''}
        <div id="sheet-stock"><span class="stock-pill low">Checking live stock...</span></div>
      </div>
    </div>

    ${item.describeEn ? `
      <div class="sheet-block">
        <div class="sheet-block-label">Highlights (Translated)</div>
        <div>${escapeHtml(item.describeEn)}</div>
      </div>
    ` : ''}

    <div class="sheet-block">
      <div class="sheet-block-label" style="display:flex;justify-content:space-between;align-items:center;">
        <span>Original Chinese Title</span>
        <button type="button" id="sheet-copy-zh" class="link-btn">Copy 中文</button>
      </div>
      <div>${escapeHtml(item.nameZh)}</div>
    </div>

    <div class="sheet-block">
      <div class="sheet-block-label">Buying on iPhone Tip</div>
      <div>Tap <strong>加入購物車</strong> (Add to Cart) on PChome, then switch back to the <strong>Vault</strong> tab here to copy your Chinese address &amp; 載具 barcode in one tap.</div>
    </div>

    <div class="sheet-actions">
      <a class="btn-primary" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">Open on PChome 24h &rarr;</a>
      <button type="button" id="sheet-save-btn" class="btn-secondary">${saved ? 'Saved ♥' : 'Save'}</button>
    </div>
  `;

  backdrop.classList.remove('hidden');
  document.body.style.overflow = 'hidden';

  body.querySelector('#sheet-copy-zh').addEventListener('click', () => copyText(item.nameZh, 'Chinese title'));
  body.querySelector('#sheet-save-btn').addEventListener('click', (e) => {
    toggleSave(item);
    e.currentTarget.textContent = isSaved(item.id) ? 'Saved ♥' : 'Save';
  });

  // Fetch real-time stock from PChome product API
  try {
    const res = await fetch(`/api/product/${encodeURIComponent(item.id)}`);
    if (!res.ok) throw new Error('unavailable');
    const detail = await res.json();
    const stockEl = document.getElementById('sheet-stock');
    if (!stockEl) return;
    if (!detail.inStock) {
      stockEl.innerHTML = '<span class="stock-pill out">Out of Stock (補貨中)</span>';
    } else if (typeof detail.qty === 'number' && detail.qty <= 5) {
      stockEl.innerHTML = `<span class="stock-pill low">Low Stock &mdash; ${detail.qty} left</span>`;
    } else {
      stockEl.innerHTML = `<span class="stock-pill in">In Stock${detail.is24h ? ' · 24h Fast Ship' : ''}</span>`;
    }
  } catch {
    const stockEl = document.getElementById('sheet-stock');
    if (stockEl) stockEl.innerHTML = '<span class="stock-pill in">Check live stock on PChome</span>';
  }
}

function closeProductSheet() {
  document.getElementById('sheet-backdrop').classList.add('hidden');
  document.body.style.overflow = '';
}

// --- Saved Tab ---
function renderSaved() {
  const grid = document.getElementById('saved-grid');
  const empty = document.getElementById('saved-empty');
  const clearBtn = document.getElementById('clear-saved-btn');

  if (!state.saved.length) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    clearBtn.classList.add('hidden');
    return;
  }
  empty.classList.add('hidden');
  clearBtn.classList.remove('hidden');
  renderProductGrid(grid, state.saved);
}

// --- Checkout Vault ---
function renderVault() {
  const container = document.getElementById('vault-fields');
  container.innerHTML = '';

  for (const field of VAULT_FIELDS) {
    const card = document.createElement('div');
    card.className = 'vault-card';
    const value = state.vault[field.key] || '';
    card.innerHTML = `
      <div class="vault-label-row">
        <label class="vault-label" for="vault-${field.key}">${escapeHtml(field.label)}</label>
        <span class="vault-zh">${escapeHtml(field.zh)}</span>
      </div>
      <div class="vault-input-row">
        <input id="vault-${field.key}" type="text" value="${escapeHtml(value)}" placeholder="${escapeHtml(field.placeholder)}" />
        <button type="button" class="copy-btn">Copy</button>
      </div>
    `;
    const input = card.querySelector('input');
    input.addEventListener('input', () => {
      state.vault[field.key] = input.value;
      saveJson(STORAGE_KEYS.vault, state.vault);
    });
    card.querySelector('.copy-btn').addEventListener('click', () => {
      copyText(input.value.trim(), field.label);
    });
    container.appendChild(card);
  }

  const phraseWrap = document.getElementById('delivery-phrases');
  phraseWrap.innerHTML = '';
  for (const p of DELIVERY_PHRASES) {
    const card = document.createElement('div');
    card.className = 'phrase-card';
    card.innerHTML = `
      <div>
        <div class="phrase-en">${escapeHtml(p.en)}</div>
        <div class="phrase-zh">${escapeHtml(p.zh)}</div>
      </div>
      <button type="button" class="copy-btn" style="padding:8px 12px;">Copy</button>
    `;
    card.querySelector('button').addEventListener('click', () => copyText(p.zh, 'Chinese note'));
    phraseWrap.appendChild(card);
  }
}

// --- Guide & Translator ---
function renderGlossary(filterText = '') {
  const list = document.getElementById('glossary-list');
  const needle = filterText.trim().toLowerCase();
  const filtered = GLOSSARY_ITEMS.filter(
    (g) =>
      !needle ||
      g.zh.toLowerCase().includes(needle) ||
      g.en.toLowerCase().includes(needle) ||
      g.tip.toLowerCase().includes(needle)
  );
  list.innerHTML = filtered
    .map(
      (g) => `
      <div class="glossary-item">
        <div class="glossary-top">
          <span class="glossary-zh">${escapeHtml(g.zh)}</span>
          <span class="glossary-en">${escapeHtml(g.en)}</span>
        </div>
        <p class="glossary-tip">${escapeHtml(g.tip)}</p>
      </div>
    `
    )
    .join('');
}

async function runQuickTranslate() {
  const input = document.getElementById('tr-input').value.trim();
  const outEl = document.getElementById('tr-output');
  const copyBtn = document.getElementById('tr-copy');
  if (!input) return;

  outEl.textContent = 'Translating...';
  outEl.classList.remove('hidden');
  copyBtn.classList.add('hidden');

  const to = state.trDirection === 'en-zh' ? 'zh-TW' : 'en';
  try {
    const res = await fetch(`/api/translate?to=${encodeURIComponent(to)}&text=${encodeURIComponent(input)}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Translation failed');
    state.lastTrResult = data.translated || '';
    outEl.textContent = state.lastTrResult;
    copyBtn.classList.remove('hidden');
  } catch (err) {
    outEl.textContent = `Error: ${err.message}`;
  }
}

// --- Init ---
function init() {
  // Quick categories
  const quickEl = document.getElementById('quick-categories');
  for (const cat of QUICK_CATEGORIES) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quick-card';
    btn.innerHTML = `<span class="qc-en">${escapeHtml(cat.en)}</span><span class="qc-zh">${escapeHtml(cat.zh)}</span>`;
    btn.addEventListener('click', () => {
      document.getElementById('search-input').value = cat.en;
      document.getElementById('search-clear').classList.remove('hidden');
      state.query = cat.en;
      state.rawZh = false;
      runSearch();
    });
    quickEl.appendChild(btn);
  }

  // Currency select
  const currencySel = document.getElementById('currency-select');
  currencySel.value = state.currency;
  currencySel.addEventListener('change', () => {
    state.currency = currencySel.value;
    localStorage.setItem(STORAGE_KEYS.currency, state.currency);
    if (state.items.length) renderProductGrid(document.getElementById('results-grid'), state.items);
    if (document.getElementById('tab-saved').classList.contains('active')) renderSaved();
  });

  // Search form
  const searchInput = document.getElementById('search-input');
  const searchClear = document.getElementById('search-clear');
  searchInput.addEventListener('input', () => {
    searchClear.classList.toggle('hidden', !searchInput.value);
  });
  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.classList.add('hidden');
    searchInput.focus();
  });
  document.getElementById('search-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const val = searchInput.value.trim();
    if (!val) return;
    searchInput.blur();
    state.query = val;
    state.rawZh = false;
    runSearch();
  });

  // Filters
  const toggle24h = document.getElementById('toggle-24h');
  toggle24h.addEventListener('click', () => {
    state.scope = state.scope === '24h' ? 'all' : '24h';
    const is24 = state.scope === '24h';
    toggle24h.classList.toggle('active', is24);
    toggle24h.setAttribute('aria-pressed', String(is24));
    if (state.query) runSearch();
  });

  const sortSelect = document.getElementById('sort-select');
  sortSelect.addEventListener('change', () => {
    state.sort = sortSelect.value;
    if (state.query) runSearch();
  });

  const priceBar = document.getElementById('price-filter-bar');
  const togglePriceBtn = document.getElementById('toggle-price');
  togglePriceBtn.addEventListener('click', () => {
    priceBar.classList.toggle('hidden');
    togglePriceBtn.classList.toggle('active', !priceBar.classList.contains('hidden'));
  });
  document.getElementById('apply-price').addEventListener('click', () => {
    state.minPrice = document.getElementById('min-price').value.trim();
    state.maxPrice = document.getElementById('max-price').value.trim();
    if (state.query) runSearch();
  });
  document.getElementById('clear-price').addEventListener('click', () => {
    document.getElementById('min-price').value = '';
    document.getElementById('max-price').value = '';
    state.minPrice = '';
    state.maxPrice = '';
    if (state.query) runSearch();
  });

  const toggleZhBtn = document.getElementById('toggle-zh');
  toggleZhBtn.addEventListener('click', () => {
    state.showZh = !state.showZh;
    toggleZhBtn.classList.toggle('active', state.showZh);
    toggleZhBtn.setAttribute('aria-pressed', String(state.showZh));
    if (state.items.length) renderProductGrid(document.getElementById('results-grid'), state.items);
  });

  document.getElementById('edit-zh-query').addEventListener('click', () => {
    const currentZh = document.getElementById('query-banner').dataset.zhQuery || state.query;
    const edited = window.prompt('Edit the Traditional Chinese query sent to PChome:', currentZh);
    if (edited && edited.trim()) {
      searchInput.value = edited.trim();
      searchClear.classList.remove('hidden');
      state.query = edited.trim();
      state.rawZh = true;
      runSearch();
    }
  });

  document.getElementById('load-more-btn').addEventListener('click', () => {
    if (state.page < state.totalPage) {
      state.page += 1;
      runSearch({ append: true });
    }
  });

  // Saved clear
  document.getElementById('clear-saved-btn').addEventListener('click', () => {
    if (!window.confirm('Remove all saved items?')) return;
    state.saved = [];
    saveJson(STORAGE_KEYS.saved, []);
    updateSavedBadge();
    renderSaved();
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  // Sheet close
  document.getElementById('sheet-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'sheet-backdrop') closeProductSheet();
  });
  document.getElementById('sheet-close-bar').addEventListener('click', closeProductSheet);

  // Translator
  const btnZhEn = document.getElementById('tr-dir-zh-en');
  const btnEnZh = document.getElementById('tr-dir-en-zh');
  const trInput = document.getElementById('tr-input');
  btnZhEn.addEventListener('click', () => {
    state.trDirection = 'zh-en';
    btnZhEn.classList.add('active');
    btnEnZh.classList.remove('active');
    trInput.placeholder = 'Paste Chinese text from PChome or an SMS...';
  });
  btnEnZh.addEventListener('click', () => {
    state.trDirection = 'en-zh';
    btnEnZh.classList.add('active');
    btnZhEn.classList.remove('active');
    trInput.placeholder = 'Type an English note for the delivery driver...';
  });
  document.getElementById('tr-btn').addEventListener('click', runQuickTranslate);
  document.getElementById('tr-copy').addEventListener('click', () => copyText(state.lastTrResult, 'Translation'));

  // Glossary filter
  document.getElementById('glossary-filter').addEventListener('input', (e) => {
    renderGlossary(e.target.value);
  });

  updateSavedBadge();
  renderVault();
  renderGlossary();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
}

init();
