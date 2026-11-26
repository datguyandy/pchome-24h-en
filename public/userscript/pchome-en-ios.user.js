// ==UserScript==
// @name         PChome 24h English Checkout Helper (iOS Safari)
// @namespace    https://24h.pchome.com.tw/
// @version      1.0.0
// @description  Declutters PChome 24h on iPhone Safari and adds inline English labels to cart, shipping, invoice, and checkout buttons.
// @match        https://24h.pchome.com.tw/*
// @match        https://ecssl.pchome.com.tw/*
// @match        https://shopping.pchome.com.tw/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  const PHRASE_MAP = [
    ['加入購物車', 'Add to Cart'],
    ['放入購物車', 'Add to Cart'],
    ['立即購買', 'Buy Now'],
    ['直接購買', 'Buy Now'],
    ['前往結帳', 'Go to Checkout'],
    ['立即結帳', 'Checkout Now'],
    ['結帳', 'Checkout'],
    ['購物車', 'Cart'],
    ['貨到通知我', 'Notify When In Stock'],
    ['補貨中', 'Out of Stock'],
    ['售完', 'Sold Out'],
    ['已售完', 'Sold Out'],
    ['搶購一空', 'Sold Out'],
    ['登入', 'Sign In'],
    ['註冊', 'Sign Up'],
    ['會員中心', 'My Account'],
    ['查訂單', 'My Orders'],
    ['顧客中心', 'Help'],
    ['宅配', 'Home Delivery'],
    ['超商取貨', '7-11 / FamilyMart Pickup'],
    ['7-ELEVEN取貨', '7-11 Pickup'],
    ['全家取貨', 'FamilyMart Pickup'],
    ['貨到付款', 'Cash on Delivery'],
    ['信用卡一次付清', 'Credit Card (Full)'],
    ['信用卡分期', 'Credit Card Installments'],
    ['信用卡', 'Credit Card'],
    ['發票資訊', 'Invoice / Receipt'],
    ['手機條碼載具', 'Mobile E-Invoice Barcode'],
    ['手機條碼', 'Mobile Barcode (載具)'],
    ['共通性載具', 'Mobile Barcode (載具)'],
    ['捐贈發票', 'Donate Receipt'],
    ['公司用發票', 'Company Tax ID (統編)'],
    ['統一編號', 'Company Tax ID'],
    ['個人電子發票', 'Personal E-Invoice'],
    ['收件人資訊', 'Recipient Info'],
    ['收件人姓名', 'Recipient Name'],
    ['收件人', 'Recipient'],
    ['聯絡電話', 'Phone Number'],
    ['手機號碼', 'Mobile (+886 / 09xx)'],
    ['收件地址', 'Delivery Address'],
    ['地址', 'Address'],
    ['備註', 'Delivery Note'],
    ['使用折價券', 'Apply Coupon'],
    ['折價券', 'Coupon'],
    ['運費', 'Shipping Fee'],
    ['免運', 'Free Shipping'],
    ['總金額', 'Total'],
    ['應付總金額', 'Total Due'],
    ['確認送出', 'Confirm & Place Order'],
    ['送出訂單', 'Place Order'],
    ['申請退貨', 'Request Return'],
    ['取消訂單', 'Cancel Order'],
    ['商品規格', 'Specs'],
    ['商品特色', 'Highlights'],
    ['詳細介紹', 'Details'],
    ['搜尋', 'Search'],
  ];

  let enabled = true;

  const style = document.createElement('style');
  style.textContent = `
    .pc-en-badge {
      display: inline-block;
      margin-left: 4px;
      padding: 1px 5px;
      border-radius: 4px;
      background: rgba(220, 38, 38, 0.14);
      color: #b91c1c;
      font-size: 11px !important;
      font-weight: 600 !important;
      line-height: 1.3 !important;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif !important;
      vertical-align: middle;
      white-space: nowrap;
      pointer-events: none;
    }
    body.pc-en-off .pc-en-badge { display: none !important; }
    [class*="appDownload"], [class*="AppDownload"], [class*="downloadBanner"], #appBanner {
      display: none !important;
    }
    #pc-en-toggle {
      position: fixed;
      right: 12px;
      bottom: calc(env(safe-area-inset-bottom, 12px) + 74px);
      z-index: 2147483647;
      background: #111827;
      color: #ffffff;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 999px;
      padding: 8px 12px;
      font-size: 12px;
      font-weight: 700;
      font-family: -apple-system, BlinkMacSystemFont, sans-serif;
      box-shadow: 0 4px 16px rgba(0,0,0,0.35);
      -webkit-tap-highlight-color: transparent;
    }
  `;
  document.head.appendChild(style);

  function annotate(root) {
    if (!enabled || !root) return;
    const selector = 'button, a, label, span, h1, h2, h3, h4, dt, th, [role="button"]';
    const els = root.querySelectorAll ? root.querySelectorAll(selector) : [];
    for (const el of els) {
      if (el.dataset.pcEnDone === '1') continue;
      if (el.children.length > 1) continue;
      const text = (el.textContent || '').trim();
      if (!text || text.length > 24) continue;
      for (const [zh, en] of PHRASE_MAP) {
        if (text === zh || (text.includes(zh) && text.length <= zh.length + 4)) {
          const badge = document.createElement('span');
          badge.className = 'pc-en-badge';
          badge.textContent = en;
          el.appendChild(badge);
          el.dataset.pcEnDone = '1';
          break;
        }
      }
    }
  }

  function addToggle() {
    if (document.getElementById('pc-en-toggle')) return;
    const btn = document.createElement('button');
    btn.id = 'pc-en-toggle';
    btn.type = 'button';
    btn.textContent = 'EN: ON';
    btn.addEventListener('click', () => {
      enabled = !enabled;
      document.body.classList.toggle('pc-en-off', !enabled);
      btn.textContent = enabled ? 'EN: ON' : 'EN: OFF';
      if (enabled) annotate(document.body);
    });
    document.body.appendChild(btn);
  }

  addToggle();
  annotate(document.body);

  let timer = null;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => annotate(document.body), 250);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
