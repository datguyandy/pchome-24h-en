// Shared, runtime-agnostic PChome 24h + translation logic.
// Works on Cloudflare Workers (using Workers AI) and locally on Node.js 18+ (using Google Translate).

const TW_SHOPPING_GLOSSARY = new Map([
  ['mouse', '滑鼠'],
  ['wireless mouse', '無線滑鼠'],
  ['silent mouse', '靜音滑鼠'],
  ['gaming mouse', '電競滑鼠'],
  ['keyboard', '鍵盤'],
  ['mechanical keyboard', '機械鍵盤'],
  ['monitor', '電腦螢幕'],
  ['laptop', '筆記型電腦'],
  ['power bank', '行動電源'],
  ['powerbank', '行動電源'],
  ['portable charger', '行動電源'],
  ['flash drive', '隨身碟'],
  ['usb drive', '隨身碟'],
  ['thumb drive', '隨身碟'],
  ['hard drive', '外接硬碟'],
  ['ssd', '固態硬碟 SSD'],
  ['charger', '充電器'],
  ['usb-c charger', 'USB-C 充電器'],
  ['gan charger', '氮化鎵充電器'],
  ['adapter', '轉接頭'],
  ['power strip', '延長線'],
  ['extension cord', '延長線'],
  ['earbuds', '藍牙耳機'],
  ['headphones', '耳罩式耳機'],
  ['dehumidifier', '除濕機'],
  ['humidifier', '加濕器'],
  ['air purifier', '空氣清淨機'],
  ['space heater', '電暖器'],
  ['heater', '電暖器'],
  ['electric fan', '電風扇'],
  ['fan', '電風扇'],
  ['rice cooker', '電鍋'],
  ['electric kettle', '快煮壺'],
  ['kettle', '快煮壺'],
  ['microwave', '微波爐'],
  ['air fryer', '氣炸鍋'],
  ['blender', '果汁機'],
  ['vacuum', '吸塵器'],
  ['vacuum cleaner', '吸塵器'],
  ['hair dryer', '吹風機'],
  ['water filter', '濾水壺'],
  ['water bottle', '保溫瓶'],
  ['thermos', '保溫瓶'],
  ['bedsheet', '床包'],
  ['bed sheets', '床包組'],
  ['mattress', '床墊'],
  ['pillow', '枕頭'],
  ['blanket', '棉被'],
  ['duvet', '被胎'],
  ['towel', '毛巾'],
  ['bath towel', '浴巾'],
  ['toilet paper', '衛生紙'],
  ['tissue', '抽取式衛生紙'],
  ['paper towel', '廚房紙巾'],
  ['laundry detergent', '洗衣精'],
  ['detergent', '洗衣精'],
  ['dish soap', '洗碗精'],
  ['trash bag', '垃圾袋'],
  ['garbage bag', '垃圾袋'],
  ['shampoo', '洗髮精'],
  ['conditioner', '潤髮乳'],
  ['body wash', '沐浴乳'],
  ['toothpaste', '牙膏'],
  ['toothbrush', '牙刷'],
  ['electric toothbrush', '電動牙刷'],
  ['sunscreen', '防曬乳'],
  ['deodorant', '止汗劑'],
  ['mosquito repellent', '防蚊液'],
  ['bug spray', '防蚊液'],
  ['protein powder', '乳清蛋白'],
  ['whey protein', '乳清蛋白'],
  ['vitamins', '維他命'],
  ['coffee beans', '咖啡豆'],
  ['instant coffee', '即溶咖啡'],
  ['olive oil', '橄欖油'],
  ['oatmeal', '燕麥片'],
  ['cat litter', '貓砂'],
  ['cat food', '貓飼料'],
  ['dog food', '狗飼料'],
  ['umbrella', '雨傘'],
  ['raincoat', '雨衣'],
  ['suitcase', '行李箱'],
  ['luggage', '行李箱'],
  ['backpack', '後背包'],
  ['yoga mat', '瑜珈墊'],
  ['dumbbell', '啞鈴'],
  ['contact lenses', '隱形眼鏡'],
  ['contact lens solution', '隱形眼鏡保養液'],
  ['wet wipes', '濕紙巾'],
  ['diapers', '尿布'],
  ['phone case', '手機殼'],
  ['screen protector', '保護貼'],
  ['hdmi cable', 'HDMI 線'],
  ['usb-c cable', 'Type-C 充電線'],
  ['lightning cable', 'Lightning 充電線'],
  ['sd card', '記憶卡'],
  ['webcam', '網路攝影機'],
  ['router', '無線路由器'],
  ['desk lamp', '檯燈'],
  ['light bulb', 'LED 燈泡'],
  ['hanger', '衣架'],
  ['storage box', '收納箱'],
  ['drying rack', '曬衣架'],
]);

const translationCache = new Map();
const CACHE_LIMIT = 4000;

function cacheSet(key, value) {
  if (translationCache.size >= CACHE_LIMIT) {
    const firstKey = translationCache.keys().next().value;
    translationCache.delete(firstKey);
  }
  translationCache.set(key, value);
}

function hasCJK(str) {
  return /[\u3400-\u9FFF\uF900-\uFAFF]/.test(str);
}

async function workersAiTranslateSingle(ai, text, sl, tl) {
  const isToZh = tl === 'zh-TW';
  const system = isToZh
    ? 'Translate the user text into natural Taiwan Traditional Chinese (台灣繁體中文). Output ONLY the translated text with no quotes, notes, or explanations.'
    : 'Translate the Taiwan Traditional Chinese text into natural, concise English. Keep brand names and model numbers accurate. Output ONLY the translated text with no quotes or notes.';

  const res = await ai.run('@cf/meta/llama-3.1-8b-instruct-fast', {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: text },
    ],
    temperature: 0.1,
    max_tokens: 512,
  });

  const out = (res?.response || '').trim();
  if (!out) throw new Error('Empty Workers AI response');
  return out;
}

async function workersAiTranslateBatch(ai, texts, sl, tl) {
  const isToZh = tl === 'zh-TW';
  const numbered = texts.map((t, i) => `${i + 1}. ${t}`).join('\n');
  const system = isToZh
    ? 'Translate each numbered item into natural Taiwan Traditional Chinese (台灣繁體中文). Preserve the exact numbering (1., 2., ...) and one item per line. Output ONLY the numbered translations.'
    : 'Translate each numbered Taiwan e-commerce product text into concise, natural English. Keep brand names, model numbers, and specs accurate. Preserve the exact numbering (1., 2., ...) with one item per line and the exact same number of lines. Output ONLY the numbered translations.';

  const res = await ai.run('@cf/meta/llama-3.1-8b-instruct-fast', {
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: numbered },
    ],
    temperature: 0.1,
    max_tokens: 1800,
  });

  const raw = (res?.response || '').trim();
  const map = new Map();
  for (const line of raw.split('\n')) {
    const m = line.trim().match(/^(\d+)[\.\)\-:]\s*(.+)$/);
    if (m) {
      map.set(Number(m[1]) - 1, m[2].trim());
    }
  }

  return texts.map((orig, i) => map.get(i) || orig);
}

export async function googleTranslate(text, sl, tl) {
  const clean = (text || '').trim();
  if (!clean) return '';

  const url =
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${encodeURIComponent(sl)}` +
    `&tl=${encodeURIComponent(tl)}&dt=t&q=${encodeURIComponent(clean)}`;

  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0' },
  });
  if (!res.ok) {
    throw new Error(`Translate HTTP ${res.status}`);
  }
  const data = await res.json();
  return Array.isArray(data?.[0])
    ? data[0].map((seg) => (Array.isArray(seg) ? seg[0] || '' : '')).join('')
    : clean;
}

async function translateSingle(text, sl, tl, ai) {
  const clean = (text || '').trim();
  if (!clean) return '';
  const cacheKey = `${sl}|${tl}|${clean}`;
  if (translationCache.has(cacheKey)) {
    return translationCache.get(cacheKey);
  }

  let translated;
  if (ai) {
    try {
      translated = await workersAiTranslateSingle(ai, clean, sl, tl);
    } catch {
      translated = await googleTranslate(clean, sl, tl);
    }
  } else {
    translated = await googleTranslate(clean, sl, tl);
  }

  cacheSet(cacheKey, translated);
  return translated;
}

export async function batchTranslate(strings, sl, tl, ai) {
  if (!strings.length) return [];
  const results = new Array(strings.length);
  const missingIdx = [];
  const missingTexts = [];

  for (let i = 0; i < strings.length; i++) {
    const raw = (strings[i] || '').replace(/\s+/g, ' ').trim();
    if (!raw) {
      results[i] = '';
      continue;
    }
    const cacheKey = `${sl}|${tl}|${raw}`;
    if (translationCache.has(cacheKey)) {
      results[i] = translationCache.get(cacheKey);
    } else {
      missingIdx.push(i);
      missingTexts.push(raw);
    }
  }

  if (!missingTexts.length) return results;

  // Chunk into manageable batches (10 items per batch for fast parallel Workers AI calls)
  const batchSize = ai ? 10 : 20;
  const chunks = [];
  for (let i = 0; i < missingTexts.length; i += batchSize) {
    chunks.push({
      texts: missingTexts.slice(i, i + batchSize),
      indices: missingIdx.slice(i, i + batchSize),
    });
  }

  await Promise.all(
    chunks.map(async ({ texts, indices }) => {
      try {
        if (ai) {
          const translatedList = await workersAiTranslateBatch(ai, texts, sl, tl);
          for (let j = 0; j < texts.length; j++) {
            const val = translatedList[j] || texts[j];
            results[indices[j]] = val;
            cacheSet(`${sl}|${tl}|${texts[j]}`, val);
          }
          return;
        }

        const joined = texts.join('\n');
        const translatedJoined = await googleTranslate(joined, sl, tl);
        const parts = translatedJoined.split('\n');
        if (parts.length === texts.length) {
          for (let j = 0; j < texts.length; j++) {
            const val = parts[j].trim() || texts[j];
            results[indices[j]] = val;
            cacheSet(`${sl}|${tl}|${texts[j]}`, val);
          }
        } else {
          await Promise.all(
            texts.map(async (t, j) => {
              try {
                results[indices[j]] = await translateSingle(t, sl, tl, ai);
              } catch {
                results[indices[j]] = t;
              }
            })
          );
        }
      } catch {
        for (let j = 0; j < texts.length; j++) {
          results[indices[j]] = texts[j];
        }
      }
    })
  );

  return results;
}

export async function translateQueryToTW(query, ai) {
  const trimmed = (query || '').trim();
  if (!trimmed) return { zhQuery: '', translated: false, source: 'empty' };
  if (hasCJK(trimmed)) {
    return { zhQuery: trimmed, translated: false, source: 'native' };
  }

  const lower = trimmed.toLowerCase().replace(/\s+/g, ' ');
  if (TW_SHOPPING_GLOSSARY.has(lower)) {
    return {
      zhQuery: TW_SHOPPING_GLOSSARY.get(lower),
      translated: true,
      source: 'glossary',
    };
  }

  let prepped = trimmed;
  const sortedEntries = [...TW_SHOPPING_GLOSSARY.entries()].sort(
    (a, b) => b[0].length - a[0].length
  );
  for (const [en, zh] of sortedEntries) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    if (regex.test(prepped)) {
      prepped = prepped.replace(regex, zh);
      break;
    }
  }

  try {
    const zh = await translateSingle(prepped, 'en', 'zh-TW', ai);
    return {
      zhQuery: zh || trimmed,
      translated: true,
      source: ai ? 'workers-ai' : 'google',
    };
  } catch {
    return { zhQuery: prepped, translated: prepped !== trimmed, source: 'fallback' };
  }
}

export async function searchPchome(url, { ai } = {}) {
  const q = (url.searchParams.get('q') || '').trim();
  if (!q) {
    return { status: 400, body: { error: 'Missing query parameter q' } };
  }

  const raw = url.searchParams.get('raw') === '1';
  const scope = url.searchParams.get('scope') === 'all' ? 'all' : '24h';
  const allowedSorts = new Set(['rnk/dc', 'prc/ac', 'prc/dc', 'new/dc']);
  const sort = allowedSorts.has(url.searchParams.get('sort'))
    ? url.searchParams.get('sort')
    : 'rnk/dc';
  const page = Math.max(1, Math.min(100, Number(url.searchParams.get('page') || 1) || 1));
  const minPrice = (url.searchParams.get('minPrice') || '').replace(/\D/g, '');
  const maxPrice = (url.searchParams.get('maxPrice') || '').replace(/\D/g, '');

  const queryInfo = raw
    ? { zhQuery: q, translated: false, source: 'raw' }
    : await translateQueryToTW(q, ai);

  const searchParams = new URLSearchParams({
    q: queryInfo.zhQuery,
    page: String(page),
    sort,
  });
  if (minPrice || maxPrice) {
    searchParams.set('price', `${minPrice || 0}-${maxPrice || 999999}`);
  }

  const pchomeUrl = `https://ecshweb.pchome.com.tw/search/v4.3/${scope}/results?${searchParams.toString()}`;
  const pchomeRes = await fetch(pchomeUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15',
      Referer: 'https://24h.pchome.com.tw/',
    },
  });

  if (!pchomeRes.ok) {
    return { status: 502, body: { error: `PChome returned HTTP ${pchomeRes.status}` } };
  }

  const data = await pchomeRes.json();
  const prods = Array.isArray(data.Prods) ? data.Prods : [];

  const namesZh = prods.map((p) => p.Name || '');
  const descsZh = prods.map((p) => (p.Describe || '').slice(0, 140));

  const [namesEn, descsEn] = await Promise.all([
    batchTranslate(namesZh, 'zh-TW', 'en', ai),
    batchTranslate(descsZh, 'zh-TW', 'en', ai),
  ]);

  const items = prods.map((p, idx) => {
    const pic = p.PicB || p.PicS || '';
    const imageUrl = pic
      ? pic.startsWith('http')
        ? pic
        : `https://cs-a.ecimg.tw${pic}`
      : '';
    return {
      id: p.Id,
      nameZh: p.Name || '',
      nameEn: namesEn[idx] || p.Name || '',
      describeZh: p.Describe || '',
      describeEn: descsEn[idx] || '',
      price: Number(p.Price || 0),
      originPrice: Number(p.OriginPrice || p.Price || 0),
      image: imageUrl,
      is24h: scope === '24h' || p.isPChome === 1,
      rating: typeof p.ratingValue === 'number' ? p.ratingValue : null,
      reviewCount: typeof p.reviewCount === 'number' ? p.reviewCount : 0,
      url: `https://24h.pchome.com.tw/prod/${p.Id}`,
    };
  });

  return {
    status: 200,
    body: {
      originalQuery: q,
      zhQuery: queryInfo.zhQuery,
      queryTranslated: queryInfo.translated,
      querySource: queryInfo.source,
      scope,
      sort,
      page,
      totalRows: Number(data.TotalRows || 0),
      totalPage: Number(data.TotalPage || 0),
      items,
    },
  };
}

export async function getProductDetail(id, { ai } = {}) {
  const safeId = (id || '').replace(/[^A-Za-z0-9_-]/g, '');
  if (!safeId) {
    return { status: 400, body: { error: 'Invalid product ID' } };
  }

  const apiUrl = `https://ecapi.pchome.com.tw/ecshop/prodapi/v2/prod?id=${encodeURIComponent(
    safeId
  )}&fields=Name,Nick,Price,Pic,Qty,is24h,OriginPrice,Describe,Seq,Id`;

  const pchomeRes = await fetch(apiUrl, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15',
      Referer: 'https://24h.pchome.com.tw/',
    },
  });

  if (!pchomeRes.ok) {
    return { status: 502, body: { error: `PChome detail returned HTTP ${pchomeRes.status}` } };
  }

  const rawText = await pchomeRes.text();
  let parsed = {};
  try {
    parsed = rawText ? JSON.parse(rawText) : {};
  } catch {
    parsed = {};
  }

  const key = Object.keys(parsed)[0];
  const prod = key ? parsed[key] : null;
  if (!prod) {
    return { status: 404, body: { error: 'Product details unavailable' } };
  }

  const [nameEn, discountEn] = await batchTranslate(
    [prod.Name || prod.Nick || '', prod.Price?.DiscountText || ''],
    'zh-TW',
    'en',
    ai
  );

  const qty = typeof prod.Qty === 'number' ? prod.Qty : null;
  const picPath = prod.Pic?.B || prod.Pic?.S || '';
  const image = picPath
    ? picPath.startsWith('http')
      ? picPath
      : `https://cs-a.ecimg.tw${picPath}`
    : '';

  return {
    status: 200,
    body: {
      id: safeId,
      nameZh: prod.Name || prod.Nick || '',
      nameEn,
      price: Number(prod.Price?.P || 0),
      marketPrice: Number(prod.Price?.M || 0),
      discountTextZh: prod.Price?.DiscountText || '',
      discountTextEn: discountEn || '',
      qty,
      inStock: qty === null ? true : qty > 0,
      is24h: Boolean(prod.is24h),
      image,
      url: `https://24h.pchome.com.tw/prod/${safeId}`,
    },
  };
}

export async function translateText(url, { ai } = {}) {
  const text = (url.searchParams.get('text') || '').trim();
  const to = url.searchParams.get('to') === 'zh-TW' ? 'zh-TW' : 'en';
  const from = to === 'zh-TW' ? 'en' : 'zh-TW';

  if (!text) {
    return { status: 400, body: { error: 'Missing text parameter' } };
  }
  if (text.length > 2000) {
    return { status: 400, body: { error: 'Text too long (max 2000 chars)' } };
  }

  try {
    const translated = await translateSingle(text, from, to, ai);
    return { status: 200, body: { text, translated, from, to } };
  } catch (err) {
    return { status: 502, body: { error: err?.message || 'Translation failed' } };
  }
}
