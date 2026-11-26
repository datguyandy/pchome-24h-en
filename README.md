# PChome 24h EN — iOS Shopping Helper

**Live App:** [https://pchome-24h-en.lurien.workers.dev](https://pchome-24h-en.lurien.workers.dev)

A zero-dependency, iPhone-first Progressive Web App (PWA) + Safari Userscript that makes browsing and checking out on **PChome 24h (`24h.pchome.com.tw`)** painless in English.

## Features

* **English Search → Taiwan Traditional Chinese**: Search in plain English (with a built-in Taiwan shopping glossary so *mouse* searches `滑鼠`, *power bank* searches `行動電源`, *extension cord* searches `延長線`, etc.) and see or edit the exact Chinese query sent to PChome.
* **Live Translated Results**: Real-time PChome 24h search, NT$ prices (with optional USD/AUD/EUR/GBP estimates), star ratings, 24h-only toggle, NT$ price range filter, and live stock checks.
* **Saved Wishlist**: Bookmark items locally on your iPhone to compare before checking out.
* **Checkout Vault (Local-Only)**: Store your Traditional Chinese address, Taiwan mobile number, name, and e-invoice barcode (`載具`) in `localStorage` with 1-tap Copy buttons—plus ready-to-paste Taiwanese delivery driver notes. Nothing is ever sent to a server.
* **Guide & Quick Translator**: Searchable PChome checkout glossary + instant `繁體中文 ↔ English` paste translator for error popups and courier SMS messages.
* **iOS Safari Checkout Userscript** ([`public/userscript/pchome-en-ios.user.js`](public/userscript/pchome-en-ios.user.js)): Adds inline English labels directly onto PChome's cart, shipping, invoice, and checkout buttons in Safari, and hides mobile app download banners.

---

## Use on iPhone

1. Open **[https://pchome-24h-en.lurien.workers.dev](https://pchome-24h-en.lurien.workers.dev)** in **Safari**.
2. Tap **Share** (square with arrow) → **Add to Home Screen**.
3. *(Optional)* For English button labels directly on PChome's checkout pages in Safari, install the free **Userscripts** app from the iOS App Store, enable it for `24h.pchome.com.tw` and `ecssl.pchome.com.tw`, and load [`/userscript/pchome-en-ios.user.js`](https://pchome-24h-en.lurien.workers.dev/userscript/pchome-en-ios.user.js).

---

## Local Development & Deployment

Requires **Node.js 18+** (zero `npm` dependencies).

```bash
# Run locally with Node.js (prints LAN URL for iPhone testing)
npm start

# Deploy to Cloudflare Workers
npm run deploy
```
