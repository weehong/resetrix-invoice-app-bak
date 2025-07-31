import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { colors } from "@/helper/color";
import currency from "@/helper/currency";
import type {
  ColumnHeaders,
  InvoiceItem,
  PaymentScheduleEntry,
} from "@/types/invoice-updated";

const styles = StyleSheet.create({
  grid: {
    width: "100%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  gridHeader: {
    flexDirection: "row",
    color: colors.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  gridRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  gridFooter: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  paymentRow: {
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  gridCol: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRightWidth: 1,
    borderRightColor: colors.lightGray,
  },
  descriptionCol: {
    width: "50%",
    textAlign: "left",
  },
  manDayCol: {
    width: "15%",
    textAlign: "right",
  },
  rateCol: {
    width: "25%",
    textAlign: "right",
  },
  amountCol: {
    width: "20%",
    textAlign: "right",
    borderRightWidth: 0,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 10,
  },
  bodyText: {
    fontSize: 10,
  },
  monoText: {
    fontSize: 10,
  },
  footerText: {
    fontSize: 10,
    fontWeight: "semibold",
    color: colors.primary,
  },
  textAlignRight: {
    textAlign: "right",
  },
  bodyTextLabel: {
    fontSize: 10,
    fontWeight: "bold",
  },
  colorText: {
    color: colors.primary,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
});

interface InvoiceGridProps {
  items: InvoiceItem[];
  showPaymentSchedule: boolean;
  paymentSchedule?: PaymentScheduleEntry[];
  columnHeaders?: ColumnHeaders;
  currency?: string;
  subtotal?: number;
  tax?: {
    enabled: boolean;
    rate: number;
    amount: number;
    label?: string;
  };
  total?: number;
}

const PaymentSchedule = ({
  paymentSchedule,
  currencyCode = "SGD",
}: {
  paymentSchedule: PaymentScheduleEntry[];
  currencyCode?: string;
}) => (
  <>
    {paymentSchedule.map((entry, index) => (
      <View
        key={entry.id}
        style={index === 0 ? styles.gridFooter : styles.paymentRow}
      >
        <View
          style={[
            styles.gridCol,
            styles.descriptionCol,
            ...(index === 0
              ? [styles.colorText, styles.bodyTextLabel, styles.textAlignRight]
              : []),
            ...(index === paymentSchedule.length - 1
              ? [styles.borderBottom]
              : []),
          ]}
        >
          <Text style={styles.bodyText}>
            {index === 0 ? "PAYMENT SCHEDULE" : ""}
          </Text>
        </View>
        <View style={[styles.gridCol, styles.manDayCol, styles.borderBottom]}>
          <Text style={styles.bodyText}>{entry.percentage}%</Text>
        </View>
        <View
          style={[
            styles.gridCol,
            styles.rateCol,
            styles.borderBottom,
            styles.textAlignRight,
            styles.colorText,
            styles.bodyTextLabel,
          ]}
        >
          <Text style={[styles.bodyText, styles.colorText]}>
            {entry.description}
          </Text>
        </View>
        <View style={[styles.gridCol, styles.amountCol, styles.borderBottom]}>
          <Text style={[styles.bodyText, styles.monoText]}>
            {currency(entry.amount, currencyCode)}
          </Text>
        </View>
      </View>
    ))}
  </>
);

const GridHeader = ({
  columnHeaders = {
    description: "DESCRIPTION",
    quantity: "QUANTITY",
    rate: "RATE",
    total: "TOTAL",
  },
  currencyCode = "SGD",
}: {
  columnHeaders?: ColumnHeaders;
  currencyCode?: string;
}) => (
  <View style={styles.gridHeader}>
    <View style={[styles.gridCol, styles.descriptionCol]}>
      <Text style={styles.headerText}>
        {columnHeaders.description.toUpperCase()}
      </Text>
    </View>
    <View style={[styles.gridCol, styles.manDayCol]}>
      <Text style={styles.headerText}>
        {columnHeaders.quantity.toUpperCase()}
      </Text>
    </View>
    <View style={[styles.gridCol, styles.rateCol]}>
      <Text style={styles.headerText}>
        {columnHeaders.rate.toUpperCase()} ({currencyCode})
      </Text>
    </View>
    <View style={[styles.gridCol, styles.amountCol]}>
      <Text style={styles.headerText}>
        {columnHeaders.total.toUpperCase()} ({currencyCode})
      </Text>
    </View>
  </View>
);

const TotalsSection = ({
  subtotal,
  tax,
  total,
  currencyCode = "SGD",
}: {
  subtotal: number;
  tax?: {
    enabled: boolean;
    rate: number;
    amount: number;
    label?: string;
  };
  total: number;
  currencyCode?: string;
}) => (
  <>
    {/* Subtotal Row */}
    <View style={styles.gridFooter}>
      <View style={[styles.gridCol, { width: "90%", textAlign: "right" }]}>
        <Text style={styles.footerText}>SUBTOTAL ({currencyCode})</Text>
      </View>
      <View style={[styles.gridCol, styles.amountCol]}>
        <Text style={[styles.footerText, styles.monoText]}>
          {currency(subtotal, currencyCode)}
        </Text>
      </View>
    </View>

    {/* Tax Row (only if tax is enabled) */}
    {tax?.enabled && (
      <View style={styles.gridFooter}>
        <View style={[styles.gridCol, { width: "90%", textAlign: "right" }]}>
          <Text style={styles.footerText}>
            {tax.label?.toUpperCase() || "TAX"} ({(tax.rate * 100).toFixed(0)}%)
            ({currencyCode})
          </Text>
        </View>
        <View style={[styles.gridCol, styles.amountCol]}>
          <Text style={[styles.footerText, styles.monoText]}>
            {currency(tax.amount, currencyCode)}
          </Text>
        </View>
      </View>
    )}

    {/* Total Row */}
    <View style={[styles.gridFooter]}>
      <View style={[styles.gridCol, { width: "90%", textAlign: "right" }]}>
        <Text style={[styles.footerText, { fontWeight: "bold" }]}>
          TOTAL ({currencyCode})
        </Text>
      </View>
      <View style={[styles.gridCol, styles.amountCol]}>
        <Text
          style={[styles.footerText, styles.monoText, { fontWeight: "bold" }]}
        >
          {currency(total, currencyCode)}
        </Text>
      </View>
    </View>
  </>
);

const GridRow = ({
  item,
  currencyCode = "SGD",
}: {
  item: InvoiceItem;
  currencyCode?: string;
}) => (
  <View style={styles.gridRow}>
    <View style={[styles.gridCol, styles.descriptionCol]}>
      <Text style={styles.bodyText}>{item.description}</Text>
    </View>
    <View style={[styles.gridCol, styles.manDayCol]}>
      <Text style={styles.bodyText}>{item.manDays}</Text>
    </View>
    <View style={[styles.gridCol, styles.rateCol]}>
      <Text style={[styles.bodyText, styles.monoText]}>
        {currency(item.rate || 0, currencyCode)}
      </Text>
    </View>
    <View style={[styles.gridCol, styles.amountCol]}>
      <Text style={[styles.bodyText, styles.monoText]}>
        {currency((item.manDays || 0) * (item.rate || 0), currencyCode)}
      </Text>
    </View>
  </View>
);

export default function InvoiceGrid({
  items,
  showPaymentSchedule,
  paymentSchedule = [],
  columnHeaders,
  currency: currencyCode = "SGD",
  subtotal = 0,
  tax,
  total = 0,
}: InvoiceGridProps) {
  // Calculate subtotal from items if not provided
  const calculatedSubtotal =
    subtotal ||
    items.reduce(
      (acc, item) => acc + (item.manDays || 0) * (item.rate || 0),
      0,
    );

  // Calculate total if not provided
  const calculatedTotal =
    total || calculatedSubtotal + (tax?.enabled ? tax.amount || 0 : 0);

  return (
    <View style={styles.grid}>
      <GridHeader columnHeaders={columnHeaders} currencyCode={currencyCode} />
      {items.map((item, index) => (
        <GridRow key={index} item={item} currencyCode={currencyCode} />
      ))}
      {showPaymentSchedule && paymentSchedule.length > 0 && (
        <PaymentSchedule
          paymentSchedule={paymentSchedule}
          currencyCode={currencyCode}
        />
      )}
      <TotalsSection
        subtotal={calculatedSubtotal}
        tax={tax}
        total={calculatedTotal}
        currencyCode={currencyCode}
      />
    </View>
  );
}
