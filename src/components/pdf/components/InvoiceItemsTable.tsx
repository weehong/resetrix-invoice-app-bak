import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { invoiceStyles } from '../styles/InvoiceStyles';

interface InvoiceItemsTableProps {
  data: InvoiceData;
}

export const InvoiceItemsTable: React.FC<InvoiceItemsTableProps> = ({ data }) => (
  <View style={invoiceStyles.table}>
    {/* Table Header */}
    <View style={invoiceStyles.tableHeader}>
      <Text style={invoiceStyles.descriptionColumn}>Description</Text>
      <Text style={invoiceStyles.quantityColumn}>Qty</Text>
      <Text style={invoiceStyles.priceColumn}>Unit Price</Text>
      <Text style={invoiceStyles.totalColumn}>Total</Text>
    </View>

    {/* Table Rows */}
    {data.items.map((item, index) => (
      <View
        key={item.id || index}
        style={index === data.items.length - 1 ? invoiceStyles.tableRowLast : invoiceStyles.tableRow}
      >
        <Text style={invoiceStyles.descriptionColumn}>{item.description}</Text>
        <Text style={invoiceStyles.quantityColumn}>{item.quantity}</Text>
        <Text style={invoiceStyles.priceColumn}>
          {data.currency || '$'}{item.unitPrice.toFixed(2)}
        </Text>
        <Text style={invoiceStyles.totalColumn}>
          {data.currency || '$'}{item.total.toFixed(2)}
        </Text>
      </View>
    ))}
  </View>
);
