import { StyleSheet, Text, View } from "@react-pdf/renderer";

import { colors } from "@/helper/color";
import currency from "@/helper/currency";
import type {
  ColumnHeaders,
  ColumnConfig,
  InvoiceItem,
  PaymentScheduleEntry,
} from "@/types/invoice-updated";

// Utility function to convert dynamic columns to legacy columnHeaders format
const convertColumnsToHeaders = (columns?: ColumnConfig[]): ColumnHeaders => {
  if (!columns || columns.length === 0) {
    return {
      description: "DESCRIPTION",
      quantity: "QUANTITY",
      rate: "RATE",
      total: "TOTAL",
    };
  }

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
  const headers: ColumnHeaders = {
    description: "DESCRIPTION",
    quantity: "QUANTITY",
    rate: "RATE",
    total: "TOTAL",
  };

  // Map dynamic columns to legacy headers based on their keys
  sortedColumns.forEach(column => {
    if (column.key === "description") {
      headers.description = column.label.toUpperCase();
    } else if (column.key === "quantity") {
      headers.quantity = column.label.toUpperCase();
    } else if (column.key === "unitPrice") {
      headers.rate = column.label.toUpperCase();
    } else if (column.key === "total") {
      headers.total = column.label.toUpperCase();
    }
  });

  return headers;
};

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
  columns?: ColumnConfig[]; // Add dynamic columns support
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

// Dynamic GridHeader that supports custom columns with 3:1:1:1... ratio
const DynamicGridHeader = ({
  columns,
  currencyCode = "SGD",
}: {
  columns: ColumnConfig[];
  currencyCode?: string;
}) => {
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  return (
    <View style={styles.gridHeader}>
      {sortedColumns.map((column, index) => (
        <View key={column.id} style={[
          styles.gridCol,
          { flex: index === 0 ? 3 : 1 } // First column gets 3x width, others get 1x
        ]}>
          <Text style={[
            styles.headerText,
            { textAlign: column.type === "currency" || column.type === "number" ? "right" : "left" }
          ]}>
            {column.label.toUpperCase()}
            {column.type === "currency" ? ` (${currencyCode})` : ""}
          </Text>
        </View>
      ))}
    </View>
  );
};

// Legacy GridHeader for backward compatibility
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
      <Text style={[styles.headerText, { textAlign: "right" }]}>
        {columnHeaders.quantity.toUpperCase()}
      </Text>
    </View>
    <View style={[styles.gridCol, styles.rateCol]}>
      <Text style={[styles.headerText, { textAlign: "right" }]}>
        {columnHeaders.rate.toUpperCase()} ({currencyCode})
      </Text>
    </View>
    <View style={[styles.gridCol, styles.amountCol]}>
      <Text style={[styles.headerText, { textAlign: "right" }]}>
        {columnHeaders.total.toUpperCase()} ({currencyCode})
      </Text>
    </View>
  </View>
);

// Dynamic TotalsSection that follows the same 3:1:1:1... proportional layout
const DynamicTotalsSection = ({
  columns,
  subtotal,
  tax,
  total,
  currencyCode = "SGD",
}: {
  columns: ColumnConfig[];
  subtotal: number;
  tax?: {
    enabled: boolean;
    rate: number;
    amount: number;
    label?: string;
  };
  total: number;
  currencyCode?: string;
}) => {
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);
  const totalColumns = sortedColumns.length;

  // Create a row with proper proportional spacing
  const createTotalRow = (label: string, amount: number, isBold: boolean = false) => (
    <View style={styles.gridFooter}>
      {sortedColumns.map((column, index) => {
        const isLastColumn = index === totalColumns - 1;
        const isSecondToLastColumn = index === totalColumns - 2;

        return (
          <View key={column.id} style={[
            styles.gridCol,
            { flex: index === 0 ? 3 : 1 }
          ]}>
            {isSecondToLastColumn ? (
              // Show label in second-to-last column (right-aligned)
              <Text style={[
                styles.footerText,
                { textAlign: "right" },
                isBold ? { fontWeight: "bold" } : {}
              ]}>
                {label}
              </Text>
            ) : isLastColumn ? (
              // Show amount in last column (right-aligned)
              <Text style={[
                styles.footerText,
                styles.monoText,
                { textAlign: "right" },
                isBold ? { fontWeight: "bold" } : {}
              ]}>
                {currency(amount, currencyCode)}
              </Text>
            ) : (
              // Empty cells for other columns
              <Text style={styles.footerText}></Text>
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <>
      {/* Subtotal Row */}
      {createTotalRow(`SUBTOTAL (${currencyCode})`, subtotal)}

      {/* Tax Row (only if tax is enabled) */}
      {tax?.enabled && createTotalRow(
        `${tax.label?.toUpperCase() || "TAX"} (${(tax.rate * 100).toFixed(0)}%) (${currencyCode})`,
        tax.amount
      )}

      {/* Total Row */}
      {createTotalRow(`TOTAL (${currencyCode})`, total, true)}
    </>
  );
};

// Dynamic GridRow that supports custom columns
const DynamicGridRow = ({
  item,
  columns,
  currencyCode = "SGD",
}: {
  item: InvoiceItem;
  columns: ColumnConfig[];
  currencyCode?: string;
}) => {
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order);

  const getColumnValue = (column: ColumnConfig) => {
    switch (column.key) {
      case "description":
        return item.description || "";
      case "quantity":
        return item.quantity?.toString() || "0";
      case "unitPrice":
        return column.type === "currency"
          ? currency(item.unitPrice || 0, currencyCode)
          : (item.unitPrice || 0).toString();
      case "total":
        return currency(item.total || 0, currencyCode);
      default:
        // Handle custom fields
        const customValue = item.customFields?.[column.key];
        if (column.type === "currency" && typeof customValue === "number") {
          return currency(customValue, currencyCode);
        }
        return customValue?.toString() || "";
    }
  };

  return (
    <View style={styles.gridRow}>
      {sortedColumns.map((column, index) => (
        <View key={column.id} style={[
          styles.gridCol,
          { flex: index === 0 ? 3 : 1 } // First column gets 3x width, others get 1x
        ]}>
          <Text style={[
            styles.bodyText,
            ...(column.type === "currency" || column.type === "number" ? [styles.monoText] : []),
            { textAlign: column.type === "currency" || column.type === "number" ? "right" : "left" }
          ]}>
            {getColumnValue(column)}
          </Text>
        </View>
      ))}
    </View>
  );
};

// Legacy GridRow for backward compatibility
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
      <Text style={[styles.bodyText, { textAlign: "right" }]}>{item.manDays}</Text>
    </View>
    <View style={[styles.gridCol, styles.rateCol]}>
      <Text style={[styles.bodyText, styles.monoText, { textAlign: "right" }]}>
        {currency(item.rate || 0, currencyCode)}
      </Text>
    </View>
    <View style={[styles.gridCol, styles.amountCol]}>
      <Text style={[styles.bodyText, styles.monoText, { textAlign: "right" }]}>
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
  columns,
  currency: currencyCode = "SGD",
  subtotal = 0,
  tax,
  total = 0,
}: InvoiceGridProps) {
  // Use dynamic columns if available, otherwise fall back to legacy columnHeaders
  const effectiveColumnHeaders = columns
    ? convertColumnsToHeaders(columns)
    : columnHeaders || {
      description: "DESCRIPTION",
      quantity: "QUANTITY",
      rate: "RATE",
      total: "TOTAL",
    };
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
      {columns ? (
        <>
          <DynamicGridHeader columns={columns} currencyCode={currencyCode} />
          {items.map((item, index) => (
            <DynamicGridRow key={index} item={item} columns={columns} currencyCode={currencyCode} />
          ))}
        </>
      ) : (
        <>
          <GridHeader columnHeaders={effectiveColumnHeaders} currencyCode={currencyCode} />
          {items.map((item, index) => (
            <GridRow key={index} item={item} currencyCode={currencyCode} />
          ))}
        </>
      )}
      {showPaymentSchedule && paymentSchedule.length > 0 && (
        <PaymentSchedule
          paymentSchedule={paymentSchedule}
          currencyCode={currencyCode}
        />
      )}
      <DynamicTotalsSection
        columns={columns || [
          { id: "desc", key: "description", label: "Description", type: "text", order: 0, required: true },
          { id: "qty", key: "quantity", label: "Quantity", type: "number", order: 1, required: true },
          { id: "rate", key: "unitPrice", label: "Rate", type: "currency", order: 2, required: true },
          { id: "total", key: "total", label: "Total", type: "currency", order: 3, required: true }
        ]}
        subtotal={calculatedSubtotal}
        tax={tax}
        total={calculatedTotal}
        currencyCode={currencyCode}
      />
    </View>
  );
}
