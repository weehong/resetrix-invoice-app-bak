import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { invoiceStyles } from '../styles/InvoiceStyles';

interface InvoiceTotalsProps {
  data: InvoiceData;
}

export const InvoiceTotals: React.FC<InvoiceTotalsProps> = ({ data }) => (
  <View style={invoiceStyles.totalsSection}>
    {/* Subtotal */}
    <View style={invoiceStyles.subtotalRow}>
      <Text>Subtotal</Text>
      <Text>{data.currency || '$'}{data.subtotal.toFixed(2)}</Text>
    </View>
    
    {/* Discount (if applicable) */}
    {data.discount && (
      <View style={invoiceStyles.totalRow}>
        <Text>
          Discount {data.discount.description ? `(${data.discount.description})` : ''}
          {data.discount.rate > 0 && ` (${data.discount.rate}%)`}
        </Text>
        <Text>-{data.currency || '$'}{data.discount.amount.toFixed(2)}</Text>
      </View>
    )}
    
    {/* Tax */}
    <View style={invoiceStyles.taxRow}>
      <Text>{data.tax.label || 'Tax'} ({data.tax.rate}%)</Text>
      <Text>{data.currency || '$'}{data.tax.amount.toFixed(2)}</Text>
    </View>
    
    {/* Grand Total */}
    <View style={invoiceStyles.grandTotalRow}>
      <Text>Total Amount</Text>
      <Text>{data.currency || '$'}{data.total.toFixed(2)}</Text>
    </View>
  </View>
);
