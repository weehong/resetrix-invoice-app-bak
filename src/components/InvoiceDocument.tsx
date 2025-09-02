import { Document, Page, StyleSheet, Text } from "@react-pdf/renderer";

import AddressSection from "@/components/AddressSection";
import BankDetails from "@/components/BankAccount";
import InvoiceHeader from "@/components/InvoiceHeader";
import InvoiceTable from "@/components/InvoiceTable";
import { colors } from "@/helper/color";
import { loadFonts } from "@/helper/font";
import type { InvoiceProps } from "@/types/invoice-updated";

await loadFonts();

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    fontFamily: "DM Sans",
    padding: 24,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 8,
    bottom: 0,
    right: 24,
    color: colors.darkText,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 12,
  },
  footer: {
    position: "absolute",
    fontSize: 8,
    bottom: 0,
    left: 24,
    textAlign: "left",
    color: colors.darkText,
    fontWeight: "bold",
    textTransform: "uppercase",
    paddingBottom: 12,
  },
});

export default function InvoiceDocument({
  invoice,
}: {
  invoice: InvoiceProps;
}) {
  return (
    <Document
      title="Invoice App"
      author={invoice.owner.name}
      subject="Invoice for services"
      keywords="invoice, billing, receipt"
      creator="Invoice App"
      producer="Invoice App"
      language="en-US"
    >
      <Page style={styles.page} size="A4" orientation="portrait">
        <InvoiceHeader
          invoiceNumber={invoice.invoiceNumber}
          logo={invoice.logo}
          invoiceDate={invoice.invoiceDate}
        />
        <AddressSection from={invoice.owner} to={invoice.client} />
        <InvoiceTable
          items={invoice.items}
          showPaymentSchedule={invoice.showPaymentSchedule}
          paymentSchedule={invoice.paymentSchedule}
          columnHeaders={invoice.columnHeaders}
          currency={invoice.currency}
          subtotal={invoice.subtotal}
          tax={invoice.tax}
          total={invoice.total}
        />
        {invoice.showPaymentSchedule && (
          <BankDetails
            bankName={invoice.paymentInfo.bankName || "Bank Name"}
            swiftCode={invoice.paymentInfo.swiftCode || "SWIFT"}
            accountNumber={
              invoice.paymentInfo.accountNumber || "Account Number"
            }
            accountName={invoice.paymentInfo.accountName || "Account Name"}
          />
        )}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `Page ${pageNumber} of ${totalPages}`
          }
        />
        <Text style={styles.footer}>
          THIS IS A COMPUTER GENERATED INVOICE. NO SIGNATURE IS REQUIRED.
        </Text>
      </Page>
    </Document>
  );
}
