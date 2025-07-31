import React from "react";
import { formatCurrency } from "@/utils/currency";

interface CurrencyDisplayProps {
  amount: number;
  currency?: string;
  className?: string;
  showSymbol?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

/**
 * CurrencyDisplay - Component for displaying formatted currency amounts
 * 
 * Formats monetary values according to the selected currency's locale and formatting rules
 */
export function CurrencyDisplay({
  amount,
  currency = "USD",
  className = "",
  showSymbol = true,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
}: CurrencyDisplayProps) {
  const formattedAmount = formatCurrency(amount, currency, {
    minimumFractionDigits,
    maximumFractionDigits,
  });

  // If showSymbol is false, remove the currency symbol from the formatted string
  const displayAmount = showSymbol 
    ? formattedAmount 
    : formattedAmount.replace(/^[^\d\s-]+\s?|[^\d\s-]+$/g, '').trim();

  return (
    <span className={className} title={`${amount} ${currency}`}>
      {displayAmount}
    </span>
  );
}

/**
 * Hook to get currency formatting function
 */
export function useCurrencyFormatter(currency: string = "USD") {
  return React.useCallback(
    (amount: number, options?: Intl.NumberFormatOptions) => {
      return formatCurrency(amount, currency, options);
    },
    [currency]
  );
}
