import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { InvoiceData } from '@/types/invoice';
import { invoiceStyles } from '../styles/InvoiceStyles';

interface InvoiceDetailsProps {
  data: InvoiceData;
}

export const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ data }) => (
  <View style={invoiceStyles.invoiceDetails}>
    {/* Company Section */}
    <View style={invoiceStyles.companySection}>
      <Text style={invoiceStyles.companyName}>{data.company.name}</Text>
      <View style={invoiceStyles.companyDetails}>
        <Text>{data.company.address}</Text>
        <Text>Phone: {data.company.phone}</Text>
        <Text>Email: {data.company.email}</Text>
        {data.company.website && <Text>Website: {data.company.website}</Text>}
        {data.company.registrationNumber && (
          <Text>Reg No: {data.company.registrationNumber}</Text>
        )}
      </View>
    </View>

    {/* Client Section */}
    <View style={invoiceStyles.clientSection}>
      <Text style={invoiceStyles.sectionTitle}>Bill To</Text>
      <View style={invoiceStyles.clientInfo}>
        <Text style={{ fontWeight: 600, color: '#374151', marginBottom: 4 }}>
          {data.client.name}
        </Text>
        <Text>{data.client.address}</Text>
        {data.client.phone && <Text>Phone: {data.client.phone}</Text>}
        {data.client.email && <Text>Email: {data.client.email}</Text>}
        {data.client.contactPerson && (
          <Text>Contact: {data.client.contactPerson}</Text>
        )}
        {data.client.registrationNumber && (
          <Text>Reg No: {data.client.registrationNumber}</Text>
        )}
      </View>
    </View>

    {/* Invoice Meta Section */}
    <View style={invoiceStyles.clientSection}>
      <View style={invoiceStyles.invoiceMeta}>
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: 600, color: '#374151' }}>Invoice Date</Text>
          <Text>{data.invoiceDate}</Text>
        </View>
        <View style={{ marginBottom: 8 }}>
          <Text style={{ fontWeight: 600, color: '#374151' }}>Due Date</Text>
          <Text>{data.dueDate}</Text>
        </View>
        {data.issueDate && (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 600, color: '#374151' }}>Issue Date</Text>
            <Text>{data.issueDate}</Text>
          </View>
        )}
        {data.status && (
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: 600, color: '#374151' }}>Status</Text>
            <Text style={{
              textTransform: 'capitalize',
              color: data.status === 'paid' ? '#059669' :
                data.status === 'overdue' ? '#dc2626' : '#6b7280'
            }}>
              {data.status}
            </Text>
          </View>
        )}
      </View>
    </View>
  </View>
);
