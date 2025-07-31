# PDF Components Architecture

This directory contains the refactored PDF generation components for the Resetrix Invoice App. The original monolithic `InvoicePDF` component has been broken down into smaller, more maintainable components.

## 📁 Directory Structure

```
src/components/pdf/
├── README.md                    # This documentation
├── InvoicePDF.tsx              # Main PDF document component
├── PDFPreview.tsx              # PDF preview component (existing)
├── components/                 # Individual PDF section components
│   ├── index.ts               # Component exports
│   ├── InvoiceHeader.tsx      # Header with invoice title and number
│   ├── InvoiceDetails.tsx     # Company, client, and meta information
│   ├── InvoiceItemsTable.tsx  # Items table with header and rows
│   ├── InvoiceTotals.tsx      # Subtotal, tax, discount, and total
│   └── InvoiceFooter.tsx      # Payment terms and notes
└── styles/
    └── InvoiceStyles.ts       # Shared styles for all components
```

## 🧩 Component Breakdown

### 1. **InvoicePDF** (Main Component)
- **Purpose**: Main document wrapper that orchestrates all sections
- **Responsibilities**: 
  - Creates the PDF Document and Page structure
  - Imports and renders all section components
  - Applies page-level styling

```tsx
export const InvoicePDF: React.FC<InvoicePDFProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={invoiceStyles.page}>
      <InvoiceHeader data={data} />
      <InvoiceDetails data={data} />
      <InvoiceItemsTable data={data} />
      <InvoiceTotals data={data} />
      <InvoiceFooter data={data} />
    </Page>
  </Document>
);
```

### 2. **InvoiceHeader**
- **Purpose**: Displays invoice title and basic invoice information
- **Content**: Invoice title, invoice number, PO number (if applicable)
- **Layout**: Right-aligned section in the header area

### 3. **InvoiceDetails**
- **Purpose**: Three-column layout with company, client, and invoice metadata
- **Content**: 
  - **Company Section**: Company name, address, contact details, registration
  - **Client Section**: "Bill To" information with client details
  - **Meta Section**: Invoice dates, status, and other metadata
- **Layout**: Evenly distributed three-column layout (33% each)

### 4. **InvoiceItemsTable**
- **Purpose**: Displays line items in a structured table format
- **Content**: Description, quantity, unit price, and total for each item
- **Features**: 
  - Professional table styling with headers
  - Alternating row styles
  - Currency formatting
  - Responsive column widths

### 5. **InvoiceTotals**
- **Purpose**: Financial summary with calculations
- **Content**: Subtotal, discounts, tax, and grand total
- **Features**:
  - Conditional discount display
  - Professional styling with highlighted total
  - Right-aligned layout
  - Currency formatting

### 6. **InvoiceFooter**
- **Purpose**: Additional information and payment details
- **Content**: Payment terms, bank details, notes
- **Features**: Conditional rendering based on available data

## 🎨 Styling Architecture

### **InvoiceStyles.ts**
Centralized styling system with organized sections:

- **Page Layout**: Base page styling and typography
- **Header Section**: Company and invoice title styling
- **Invoice Details**: Three-column layout and section styling
- **Table Styles**: Professional table design with borders and spacing
- **Totals Section**: Financial summary styling with emphasis
- **Footer Section**: Payment terms and notes styling

### **Style Benefits**:
- ✅ **Centralized**: All styles in one location for easy maintenance
- ✅ **Consistent**: Shared color palette and typography
- ✅ **Modular**: Organized by component sections
- ✅ **Professional**: Modern design with proper spacing and hierarchy

## 🔧 Usage Examples

### **Basic Usage**
```tsx
import { InvoicePDF } from '@/components/pdf/InvoicePDF';
import { InvoiceData } from '@/types/invoice';

const invoiceData: InvoiceData = {
  // ... your invoice data
};

// Use in PDF generation
const pdfDocument = <InvoicePDF data={invoiceData} />;
```

### **Individual Component Usage**
```tsx
import { InvoiceHeader, InvoiceDetails } from '@/components/pdf/components';

// Use individual components for custom layouts
<Page>
  <InvoiceHeader data={invoiceData} />
  <InvoiceDetails data={invoiceData} />
  {/* Custom content */}
</Page>
```

## 🚀 Benefits of Refactoring

### **Maintainability**
- **Smaller Components**: Each component has a single responsibility
- **Easier Debugging**: Issues can be isolated to specific sections
- **Code Reusability**: Components can be reused in different contexts

### **Development Experience**
- **Better Organization**: Clear separation of concerns
- **Easier Testing**: Individual components can be tested in isolation
- **Faster Development**: Changes to one section don't affect others

### **Scalability**
- **Easy Extensions**: New sections can be added without modifying existing code
- **Custom Layouts**: Components can be rearranged for different invoice types
- **Style Variations**: Individual components can have style variants

## 🧪 Testing

### **Component Testing**
Each component can be tested individually:

```tsx
// Test individual components
import { InvoiceHeader } from '@/components/pdf/components';

test('InvoiceHeader renders correctly', () => {
  const mockData = { /* test data */ };
  // Test component rendering
});
```

### **Integration Testing**
Test the complete PDF generation:

```tsx
import { InvoicePDF } from '@/components/pdf/InvoicePDF';

test('Complete PDF generation', () => {
  const mockData = { /* complete invoice data */ };
  // Test full PDF generation
});
```

## 📝 Customization Guide

### **Adding New Sections**
1. Create new component in `components/` directory
2. Add styles to `InvoiceStyles.ts`
3. Export from `components/index.ts`
4. Import and use in `InvoicePDF.tsx`

### **Modifying Existing Sections**
1. Locate the specific component file
2. Modify the component logic or JSX
3. Update styles in `InvoiceStyles.ts` if needed
4. Test changes using the `/pdf-test` page

### **Style Customization**
1. Modify colors, fonts, or spacing in `InvoiceStyles.ts`
2. Changes will automatically apply to all components
3. Use consistent design tokens for professional appearance

## 🔄 Migration Notes

The refactoring maintains 100% backward compatibility:
- ✅ Same `InvoicePDF` component interface
- ✅ Same `InvoiceData` type requirements
- ✅ Same PDF output quality and layout
- ✅ Same integration with existing services and hooks

The only difference is the internal architecture, which is now more maintainable and scalable.
