import { StyleSheet } from '@react-pdf/renderer';
import { ensureFontsRegistered } from '../fonts/registerFonts';

// Ensure DM Sans fonts are registered before creating styles
ensureFontsRegistered();

export const invoiceStyles = StyleSheet.create({
  // Page Layout
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'DM Sans',
    fontSize: 10,
    lineHeight: 1.4,
    color: '#1a1a1a',
  },

  // Header Section
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  companySection: {
    flex: 1,
    maxWidth: '33%',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  companyDetails: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  invoiceSection: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    textAlign: 'right',
    minWidth: '40%',
  },
  invoiceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#cc0000',
    marginBottom: 12,
    letterSpacing: -1,
  },
  invoiceNumber: {
    fontSize: 14,
    fontWeight: 600,
    color: '#374151',
    marginBottom: 4,
  },

  // Invoice Details Section
  invoiceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    gap: 20,
  },
  clientSection: {
    flex: 1,
    maxWidth: '33%',
  },
  invoiceMetaSection: {
    flex: 1,
    maxWidth: '33%',
    alignItems: 'flex-end',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clientInfo: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  invoiceMeta: {
    fontSize: 10,
    color: '#6b7280',
    textAlign: 'right',
    lineHeight: 1.5,
  },

  // Table Styles
  table: {
    marginTop: 30,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 12,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    borderBottomStyle: 'solid',
    minHeight: 40,
    alignItems: 'center',
  },
  tableRowLast: {
    flexDirection: 'row',
    padding: 12,
    minHeight: 40,
    alignItems: 'center',
  },
  descriptionColumn: {
    flex: 3,
    paddingRight: 12,
  },
  quantityColumn: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  priceColumn: {
    flex: 1.2,
    textAlign: 'right',
    paddingHorizontal: 8,
  },
  totalColumn: {
    flex: 1.2,
    textAlign: 'right',
    fontWeight: 600,
  },

  // Totals Section
  totalsSection: {
    alignSelf: 'flex-end',
    width: 250,
    marginTop: 20,
    backgroundColor: '#f9fafb',
    padding: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderStyle: 'solid',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    fontSize: 10,
    color: '#6b7280',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    fontSize: 10,
    color: '#6b7280',
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    fontSize: 10,
    color: '#6b7280',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderBottomStyle: 'solid',
    marginBottom: 8,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    fontWeight: 'bold',
    fontSize: 14,
    color: '#1f2937',
    backgroundColor: '#ffffff',
    marginHorizontal: -16,
    marginBottom: -16,
    paddingHorizontal: 16,
  },

  // Footer Section
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    borderTopStyle: 'solid',
  },
  paymentTermsSection: {
    marginBottom: 20,
  },
  paymentTermsTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  paymentTermsText: {
    fontSize: 10,
    color: '#6b7280',
    lineHeight: 1.5,
  },
  notes: {
    fontSize: 9,
    color: '#9ca3af',
    lineHeight: 1.5,
    fontStyle: 'italic',
  },
  notesTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 6,
  },
});
