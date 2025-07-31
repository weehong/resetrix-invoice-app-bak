import {
  SUPPORTED_CURRENCIES,
  DEFAULT_CURRENCY,
  getCurrencyByCode,
  formatCurrency,
  getCurrencySymbol,
  isValidCurrencyCode,
  getCurrencyOptions,
} from '../currency';

describe('Currency Utils', () => {
  describe('SUPPORTED_CURRENCIES', () => {
    it('should contain expected currencies', () => {
      const expectedCodes = ['USD', 'EUR', 'GBP', 'SGD', 'JPY', 'AUD', 'CAD'];
      const actualCodes = SUPPORTED_CURRENCIES.map(c => c.code);
      
      expectedCodes.forEach(code => {
        expect(actualCodes).toContain(code);
      });
    });

    it('should have proper structure for each currency', () => {
      SUPPORTED_CURRENCIES.forEach(currency => {
        expect(currency).toHaveProperty('code');
        expect(currency).toHaveProperty('name');
        expect(currency).toHaveProperty('symbol');
        expect(currency).toHaveProperty('locale');
        expect(typeof currency.code).toBe('string');
        expect(typeof currency.name).toBe('string');
        expect(typeof currency.symbol).toBe('string');
        expect(typeof currency.locale).toBe('string');
      });
    });
  });

  describe('getCurrencyByCode', () => {
    it('should return currency for valid code', () => {
      const usd = getCurrencyByCode('USD');
      expect(usd).toBeDefined();
      expect(usd?.code).toBe('USD');
      expect(usd?.name).toBe('US Dollar');
      expect(usd?.symbol).toBe('$');
    });

    it('should return undefined for invalid code', () => {
      const invalid = getCurrencyByCode('INVALID');
      expect(invalid).toBeUndefined();
    });
  });

  describe('formatCurrency', () => {
    it('should format USD correctly', () => {
      const formatted = formatCurrency(1234.56, 'USD');
      expect(formatted).toMatch(/\$1,234\.56/);
    });

    it('should format EUR correctly', () => {
      const formatted = formatCurrency(1234.56, 'EUR');
      expect(formatted).toMatch(/€1,234\.56/);
    });

    it('should format JPY correctly (no decimals)', () => {
      const formatted = formatCurrency(1234, 'JPY');
      expect(formatted).toMatch(/¥1,234/);
    });

    it('should fallback to USD for invalid currency', () => {
      const formatted = formatCurrency(1234.56, 'INVALID');
      expect(formatted).toMatch(/\$1,234\.56/);
    });

    it('should use default currency when not specified', () => {
      const formatted = formatCurrency(1234.56);
      expect(formatted).toMatch(/\$1,234\.56/);
    });

    it('should accept custom formatting options', () => {
      const formatted = formatCurrency(1234.56, 'USD', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      expect(formatted).toMatch(/\$1,235/);
    });
  });

  describe('getCurrencySymbol', () => {
    it('should return correct symbols', () => {
      expect(getCurrencySymbol('USD')).toBe('$');
      expect(getCurrencySymbol('EUR')).toBe('€');
      expect(getCurrencySymbol('GBP')).toBe('£');
      expect(getCurrencySymbol('SGD')).toBe('S$');
      expect(getCurrencySymbol('JPY')).toBe('¥');
    });

    it('should return default symbol for invalid code', () => {
      expect(getCurrencySymbol('INVALID')).toBe('$');
    });
  });

  describe('isValidCurrencyCode', () => {
    it('should return true for valid codes', () => {
      expect(isValidCurrencyCode('USD')).toBe(true);
      expect(isValidCurrencyCode('EUR')).toBe(true);
      expect(isValidCurrencyCode('GBP')).toBe(true);
    });

    it('should return false for invalid codes', () => {
      expect(isValidCurrencyCode('INVALID')).toBe(false);
      expect(isValidCurrencyCode('')).toBe(false);
      expect(isValidCurrencyCode('usd')).toBe(false); // case sensitive
    });
  });

  describe('getCurrencyOptions', () => {
    it('should return options for dropdown', () => {
      const options = getCurrencyOptions();
      
      expect(Array.isArray(options)).toBe(true);
      expect(options.length).toBe(SUPPORTED_CURRENCIES.length);
      
      options.forEach(option => {
        expect(option).toHaveProperty('value');
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('symbol');
        expect(typeof option.value).toBe('string');
        expect(typeof option.label).toBe('string');
        expect(typeof option.symbol).toBe('string');
      });
    });

    it('should have proper label format', () => {
      const options = getCurrencyOptions();
      const usdOption = options.find(opt => opt.value === 'USD');
      
      expect(usdOption).toBeDefined();
      expect(usdOption?.label).toBe('USD - US Dollar');
      expect(usdOption?.symbol).toBe('$');
    });
  });

  describe('DEFAULT_CURRENCY', () => {
    it('should be USD', () => {
      expect(DEFAULT_CURRENCY).toBe('USD');
    });

    it('should be a valid currency code', () => {
      expect(isValidCurrencyCode(DEFAULT_CURRENCY)).toBe(true);
    });
  });
});
