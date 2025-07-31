/**
 * Currency utilities for invoice application
 */

export interface Currency {
  code: string;
  name: string;
  symbol: string;
  locale: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    locale: "en-US",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    locale: "en-EU",
  },
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    locale: "en-GB",
  },
  {
    code: "SGD",
    name: "Singapore Dollar",
    symbol: "S$",
    locale: "en-SG",
  },
  {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    locale: "ja-JP",
  },
  {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    locale: "en-AU",
  },
  {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    locale: "en-CA",
  },
  {
    code: "MYR",
    name: "Malaysian Ringgit",
    symbol: "RM",
    locale: "ms-MY",
  }
];

export const DEFAULT_CURRENCY = "USD";

/**
 * Get currency information by code
 */
export function getCurrencyByCode(code: string): Currency | undefined {
  return SUPPORTED_CURRENCIES.find(currency => currency.code === code);
}

/**
 * Format amount with currency
 */
export function formatCurrency(
  amount: number,
  currencyCode: string = DEFAULT_CURRENCY,
  options: Intl.NumberFormatOptions = {}
): string {
  const currency = getCurrencyByCode(currencyCode);
  
  if (!currency) {
    // Fallback to USD if currency not found
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      ...options,
    }).format(amount);
  }

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    ...options,
  }).format(amount);
}

/**
 * Get currency symbol by code
 */
export function getCurrencySymbol(currencyCode: string): string {
  const currency = getCurrencyByCode(currencyCode);
  return currency?.symbol || "$";
}

/**
 * Validate currency code
 */
export function isValidCurrencyCode(code: string): boolean {
  return SUPPORTED_CURRENCIES.some(currency => currency.code === code);
}

/**
 * Get currency options for dropdown
 */
export function getCurrencyOptions() {
  return SUPPORTED_CURRENCIES.map(currency => ({
    value: currency.code,
    label: `${currency.code} - ${currency.name}`,
    symbol: currency.symbol,
  }));
}
