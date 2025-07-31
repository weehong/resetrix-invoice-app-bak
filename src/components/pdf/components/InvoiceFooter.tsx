import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { invoiceStyles } from '../styles/InvoiceStyles';

interface InvoiceFooterProps {
  data: InvoiceData;
}

export const InvoiceFooter: React.FC<InvoiceFooterProps> = ({ data }) => (
  <View style={invoiceStyles.footer}>
    {/* Payment Terms */}
    {data.paymentTerms && (
      <View style={invoiceStyles.paymentTermsSection}>
        <Text style={invoiceStyles.paymentTermsTitle}>Payment Terms</Text>
        <Text style={invoiceStyles.paymentTermsText}>{data.paymentTerms}</Text>
      </View>
    )}

    {/* Payment Details */}
    {data.payment?.bankDetails && (
      <View style={invoiceStyles.paymentTermsSection}>
        <Text style={invoiceStyles.paymentTermsTitle}>Payment Details</Text>
        <View style={invoiceStyles.paymentTermsText}>
          {data.payment.bankDetails.bankName && (
            <Text>Bank: {data.payment.bankDetails.bankName}</Text>
          )}
          {data.payment.bankDetails.accountNumber && (
            <Text>Account: {data.payment.bankDetails.accountNumber}</Text>
          )}
          {data.payment.bankDetails.routingNumber && (
            <Text>Routing: {data.payment.bankDetails.routingNumber}</Text>
          )}
          {data.payment.bankDetails.swiftCode && (
            <Text>SWIFT: {data.payment.bankDetails.swiftCode}</Text>
          )}
        </View>
      </View>
    )}

    {/* Notes */}
    {data.notes && (
      <View>
        <Text style={invoiceStyles.notesTitle}>Notes</Text>
        <Text style={invoiceStyles.notes}>{data.notes}</Text>
      </View>
    )}
  </View>
);
