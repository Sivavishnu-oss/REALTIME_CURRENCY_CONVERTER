// DOM Elements
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const swapBtn = document.getElementById('swap-btn');
const rateText = document.getElementById('exchange-rate-text');
const inverseRateText = document.getElementById('inverse-rate-text');
const resultText = document.getElementById('converted-amount-text');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const currencySymbol = document.getElementById('currency-symbol');
const amountBadge = document.getElementById('amount-currency-badge');
const lastUpdatedText = document.getElementById('last-updated');
const presetBtns = document.querySelectorAll('.preset-btn');

const BASE_API_URL = 'https://open.er-api.com/v6/latest';

// Comprehensive Currency Code -> Country Code (FlagCDN) Mapping
const currencyToCountryMap = {
  USD: 'us', EUR: 'eu', GBP: 'gb', INR: 'in', JPY: 'jp',
  AUD: 'au', CAD: 'ca', CHF: 'ch', CNY: 'cn', NZD: 'nz',
  BRL: 'br', SGD: 'sg', HKD: 'hk', SEK: 'se', NOK: 'no',
  KRW: 'kr', MXN: 'mx', ZAR: 'za', TRY: 'tr', RUB: 'ru',
  AED: 'ae', SAR: 'sa', THB: 'th', IDR: 'id', MYR: 'my',
  PHP: 'ph', VND: 'vn', PLN: 'pl', CZK: 'cz', HUF: 'hu',
  DKK: 'dk', ILS: 'il', EGP: 'eg', ARS: 'ar', CLP: 'cl',
  COP: 'co', PEN: 'pe', PKR: 'pk', BDT: 'bd', LKR: 'lk',
  NGN: 'ng', KES: 'ke', GHS: 'gh', QAR: 'qa', KWD: 'kw',
  BHD: 'bh', OMR: 'om', JOD: 'jo', ISK: 'is', HRK: 'hr'
};

// Currency Code -> Currency Symbol Helper
function getCurrencySymbol(code) {
  try {
    const symbol = (1).toLocaleString('en-US', {
      style: 'currency',
      currency: code,
      currencyDisplay: 'narrowSymbol'
    }).replace(/[\d\s,.]/g, '');
    return symbol || code;
  } catch (e) {
    return code;
  }
}

// Get Flag URL from Currency Code
function getFlagUrl(currencyCode) {
  const code = currencyCode.toUpperCase();
  const countryCode = currencyToCountryMap[code] || code.substring(0, 2).toLowerCase();
  return `https://flagcdn.com/w40/${countryCode}.png`;
}

// Update Flags & Symbols UI
function updateCurrencyUI() {
  const fromCode = fromSelect.value;
  const toCode = toSelect.value;

  if (fromCode) {
    fromFlag.src = getFlagUrl(fromCode);
    fromFlag.alt = `${fromCode} Flag`;
    amountBadge.textContent = fromCode;
    currencySymbol.textContent = getCurrencySymbol(fromCode);
  }

  if (toCode) {
    toFlag.src = getFlagUrl(toCode);
    toFlag.alt = `${toCode} Flag`;
  }
}

// Initialize Application
async function initApp() {
  try {
    rateText.textContent = 'Loading currency list...';
    
    // Fetch rate list
    const response = await fetch(`${BASE_API_URL}/USD`);
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('Failed to load currency options');
    }

    const currencies = Object.keys(data.rates).sort();

    // Populate dropdowns
    populateDropdowns(currencies);

    // Set defaults
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';

    updateCurrencyUI();
    calculateConversion();
  } catch (error) {
    rateText.textContent = 'Error initializing app.';
    console.error(error);
  }
}

// Populate <select> elements
function populateDropdowns(currencies) {
  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  currencies.forEach((code) => {
    const optFrom = document.createElement('option');
    optFrom.value = code;
    optFrom.textContent = code;
    fromSelect.appendChild(optFrom);

    const optTo = document.createElement('option');
    optTo.value = code;
    optTo.textContent = code;
    toSelect.appendChild(optTo);
  });
}

// Perform Exchange Rate Conversion
async function calculateConversion() {
  const amount = parseFloat(amountInput.value);
  const from = fromSelect.value;
  const to = toSelect.value;

  if (!from || !to) return;

  if (isNaN(amount) || amount < 0) {
    resultText.textContent = '--';
    rateText.textContent = 'Please enter a valid amount';
    inverseRateText.textContent = '';
    return;
  }

  try {
    rateText.textContent = 'Fetching current rate...';

    const response = await fetch(`${BASE_API_URL}/${from}`);
    const data = await response.json();

    if (data.result !== 'success') {
      throw new Error('Failed to fetch exchange rates');
    }

    const exchangeRate = data.rates[to];
    const inverseRate = 1 / exchangeRate;
    const convertedValue = amount * exchangeRate;

    // Format output currency
    const formattedResult = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: to,
      maximumFractionDigits: 2,
    }).format(convertedValue);

    resultText.textContent = formattedResult;
    rateText.textContent = `1 ${from} = ${exchangeRate.toFixed(4)} ${to}`;
    inverseRateText.textContent = `1 ${to} = ${inverseRate.toFixed(4)} ${from}`;

    // Update last updated time badge
    const now = new Date();
    lastUpdatedText.textContent = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  } catch (error) {
    rateText.textContent = 'Unable to fetch rates.';
    resultText.textContent = '--';
    inverseRateText.textContent = '';
    console.error(error);
  }
}

// Swap Currencies
function swapCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;

  updateCurrencyUI();
  calculateConversion();
}

// Preset Amount Click Handlers
presetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    presetBtns.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    
    const presetVal = btn.getAttribute('data-preset');
    amountInput.value = presetVal;
    calculateConversion();
  });
});

// Event Listeners
amountInput.addEventListener('input', () => {
  // Clear preset active highlight if custom amount entered
  presetBtns.forEach((b) => {
    if (b.getAttribute('data-preset') === amountInput.value) {
      b.classList.add('active');
    } else {
      b.classList.remove('active');
    }
  });
  calculateConversion();
});

fromSelect.addEventListener('change', () => {
  updateCurrencyUI();
  calculateConversion();
});

toSelect.addEventListener('change', () => {
  updateCurrencyUI();
  calculateConversion();
});

swapBtn.addEventListener('click', swapCurrencies);

// Run Application
initApp();