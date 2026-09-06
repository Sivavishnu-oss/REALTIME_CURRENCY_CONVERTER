# 💱 CurrencyX &mdash; Real-Time Currency Converter

A modern, high-performance, and stylish currency converter web application built with HTML5, CSS3 (Glassmorphism & Pure Black Theme), and Vanilla JavaScript. It fetches real-time market exchange rates and features dynamic country flag indicators, quick amount presets, and inverse rate calculations.

---

## ✨ Features

- **⚡ Real-Time Rates**: Live exchange rate updates using the Open Exchange Rates API (`open.er-api.com`).
- **🎨 Sleek Dark Theme**: Pure black (`#000000`) OLED-friendly background paired with translucent glassmorphic elements and glowing gradient accents.
- **🚩 Dynamic Country Flags**: Automatically displays matching flag badges (`FlagCDN`) for each currency selected.
- **⚡ Quick Presets**: Instant amount shortcuts (`$10`, `$100`, `$500`, `$1,000`, `$5,000`).
- **🔀 Smooth Currency Swap**: One-click currency swap button with rotation micro-animation.
- **📊 Rich Rate Details**: Displays primary converted amount, unit exchange rate, inverse conversion rate, and timestamp of the last update.
- **📱 Fully Responsive**: Seamless layout on mobile, tablet, and desktop screens.

---

## 🚀 Getting Started

### Prerequisites
All you need is a modern web browser (Google Chrome, Mozilla Firefox, Apple Safari, Microsoft Edge, etc.).

### Running Locally
1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/api-currency-converter.git
   ```
2. Open `index.html` directly in your browser:
   - Double-click `index.html` or open it with your preferred local web server (e.g., VS Code Live Server, `npx serve`, or `python3 -m http.server 8000`).

---

## 📁 Project Structure

```
API_CURRENCY_CONVERTER/
├── index.html     # HTML structure with semantic elements & external fonts/icons
├── style.css      # Custom styling, dark design tokens, glassmorphism & responsive rules
├── app.js         # API fetching logic, currency-to-flag mapping, event listeners
└── README.md      # Project documentation
```

---

## 🛠️ Technologies Used

- **HTML5**: Structured markup & semantic tags.
- **CSS3**: Custom design tokens, CSS Grid/Flexbox, Glassmorphism, animations.
- **JavaScript (ES6+)**: Async/Await API fetching, DOM manipulation, `Intl.NumberFormat`.
- **APIs & Assets**:
  - Exchange Rate API: `https://open.er-api.com/v6/latest`
  - Flag Icons: [FlagCDN](https://flagcdn.com/)
  - Typography: Google Font [`Plus Jakarta Sans`](https://fonts.google.com/specimen/Plus+Jakarta+Sans)
  - Icons: [Font Awesome](https://fontawesome.com/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
