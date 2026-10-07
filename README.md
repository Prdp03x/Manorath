# Manorath — React + Vite store with WhatsApp ordering

    npm install
    npm run dev       # development
    npm run build     # production build -> dist/

## Before publishing
Edit `src/config.js`: phone, whatsapp (e.g. 919099760150), email, address, advancePercent.
Products and inclusions live in `src/data/products.js`; images in `public/assets/`.

## How it works
- `/` storefront: GSAP + ScrollTrigger animations, Lenis smooth scroll, category filters, product modal, bag drawer (quantities saved in localStorage).
- `/checkout` form + order summary (GST/shipping extra, 50% advance calculated).
  "Place order on WhatsApp" validates the form and opens WhatsApp with the full order pre-filled for your number.
- No payments are processed; your team confirms the quotation and advance on WhatsApp.
- On a host, redirect all paths to index.html (SPA routing).
