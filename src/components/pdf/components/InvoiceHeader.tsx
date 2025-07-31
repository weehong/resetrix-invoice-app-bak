import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { invoiceStyles } from '../styles/InvoiceStyles';

interface InvoiceHeaderProps {
  data: InvoiceData;
}

export const InvoiceHeader: React.FC<InvoiceHeaderProps> = ({ data }) => (
  <View style={invoiceStyles.header}>
    <View style={{ flex: 1 }}></View>
    <View style={invoiceStyles.invoiceSection}>
      <Text style={invoiceStyles.invoiceTitle}>INVOICE</Text>
      <Text style={invoiceStyles.invoiceNumber}>#{data.invoiceNumber}</Text>
      {data.poNumber && (
        <Text style={[invoiceStyles.invoiceMeta, { marginTop: 8 }]}>
          PO Number: {data.poNumber}
        </Text>
      )}
    </View>
  </View>
);
