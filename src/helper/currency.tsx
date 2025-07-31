import { formatCurrency } from "@/utils/currency";

export default function currency(amount: number, currencyCode: string = "SGD") {
  // Use the new currency utility for proper formatting
  return formatCurrency(amount, currencyCode);
}
