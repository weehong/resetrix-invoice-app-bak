import { formatNumber } from "../utils/currency";

export default function currency(amount: number, currencyCode: string = "SGD") {
  // Use the new number formatting utility without currency symbol
  return formatNumber(amount, currencyCode);
}
