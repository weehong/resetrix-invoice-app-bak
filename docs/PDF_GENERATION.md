# PDF Generation Module

This document describes the enhanced PDF generation system for the Resetrix Invoice App, built using `@react-pdf/renderer`.

## Overview

The PDF generation module creates professional, styled invoices that match modern business standards. The system includes:

- **Enhanced TypeScript interfaces** for comprehensive invoice data
- **Professional PDF styling** with modern design principles
- **Flexible data structure** supporting various invoice formats
- **Multiple integration methods** (hooks, services, API routes)

## Architecture

### Core Components

1. **InvoicePDF Component** (`src/components/pdf/InvoicePDF.tsx`)
   - Main PDF rendering component using `@react-pdf/renderer`
   - Professional styling with DM Sans font family
   - Responsive layout with proper spacing and typography

2. **TypeScript Interfaces** (`src/types/invoice.ts`)
   - Comprehensive data structure for invoice information
   - Support for company details, client information, payment terms
   - Flexible tax, discount, and currency handling

3. **PDF Service** (`src/lib/pdf-service.ts`)
   - Service class for PDF generation operations
   - Methods for generating, downloading, and previewing PDFs

4. **usePDF Hook** (`src/hooks/usePDF.ts`)
   - React hook for PDF operations with loading states
   - Error handling and state management

## Features

### Enhanced Data Structure

The enhanced `InvoiceData` interface supports:

```typescript
interface InvoiceData {
  // Basic invoice information
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  issueDate?: string;
  poNumber?: string;
  
  // Company and client details
  company: CompanyInfo;
  client: ClientInfo;
  
  // Line items
  items: InvoiceItem[];
  
  // Financial calculations
  subtotal: number;
  tax: TaxInfo;
  discount?: DiscountInfo;
  total: number;
  
  // Additional information
  notes?: string;
  paymentTerms?: string;
  payment?: PaymentInfo;
  
  // Metadata
  status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  currency?: string;
  locale?: string;
}
```

### Professional Styling

The PDF includes:

- **Modern typography** using DM Sans font family
- **Professional color scheme** with proper contrast
- **Structured layout** with clear sections and spacing
- **Responsive table design** for line items
- **Branded appearance** matching business standards

### Key Style Features

- Clean header with company branding
- Professional invoice title and numbering
- Clear client information section
- Well-structured items table with proper alignment
- Professional totals section with calculations
- Footer with payment terms and notes

## Usage

### Basic Usage with Hook

```typescript
import { usePDF } from '@/hooks/usePDF';
import { InvoiceData } from '@/types/invoice';

function InvoiceComponent({ invoiceData }: { invoiceData: InvoiceData }) {
  const { downloadPDF, previewPDF, isGenerating } = usePDF();

  const handleDownload = async () => {
    await downloadPDF(invoiceData, `invoice-${invoiceData.invoiceNumber}.pdf`);
  };

  const handlePreview = async () => {
    const url = await previewPDF(invoiceData);
    window.open(url, '_blank');
  };

  return (
    <div>
      <button onClick={handleDownload} disabled={isGenerating}>
        {isGenerating ? 'Generating...' : 'Download PDF'}
      </button>
      <button onClick={handlePreview} disabled={isGenerating}>
        Preview PDF
      </button>
    </div>
  );
}
```

### Direct Service Usage

```typescript
import { PDFService } from '@/lib/pdf-service';

// Generate PDF blob
const pdfBlob = await PDFService.generateInvoicePDF(invoiceData);

// Download PDF
await PDFService.downloadInvoicePDF(invoiceData, 'custom-filename.pdf');

// Get preview URL
const previewUrl = await PDFService.previewInvoicePDF(invoiceData);
```

### API Route Usage

The system includes an API route at `/api/invoices/[id]/pdf` that:

- Loads invoice data (currently from sample JSON)
- Generates PDF using the service
- Returns PDF as downloadable response

## Sample Data

### Basic Sample (`public/data/sample-invoice.json`)
Contains standard invoice information with basic features.

### Comprehensive Sample (`public/data/comprehensive-invoice.json`)
Demonstrates all available features including:
- Extended company and client information
- Multiple line items with detailed descriptions
- Discount calculations
- Payment details and bank information
- Professional notes and terms

## Testing

### Test Page
Visit `/pdf-test` to access the PDF generation test page where you can:

- Load different sample data sets
- Preview generated PDFs
- Download test invoices
- Validate styling and layout

### Integration Testing

The system integrates with existing components:

- `InvoiceActions` component for download functionality
- `PDFPreview` component for inline preview
- API routes for server-side generation

## Customization

### Styling Customization

Modify styles in `src/components/pdf/InvoicePDF.tsx`:

```typescript
const styles = StyleSheet.create({
  // Customize colors, fonts, spacing
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937', // Change brand color
  },
  // ... other styles
});
```

### Data Structure Extension

Extend interfaces in `src/types/invoice.ts`:

```typescript
interface InvoiceData {
  // Add custom fields
  customField?: string;
  additionalInfo?: CustomInfo;
  // ... existing fields
}
```

## Dependencies

- `@react-pdf/renderer`: PDF generation library
- React 19: Component framework
- TypeScript: Type safety and interfaces

## Best Practices

1. **Always validate data** before PDF generation
2. **Handle errors gracefully** with proper user feedback
3. **Use loading states** for better user experience
4. **Test with various data sets** to ensure robustness
5. **Keep styling consistent** with brand guidelines

## Troubleshooting

### Common Issues

1. **Font loading errors**: Ensure font URLs are accessible
2. **Layout issues**: Check for proper flex properties and dimensions
3. **Data validation**: Verify all required fields are present
4. **Memory issues**: For large invoices, consider pagination

### Performance Optimization

- Use React.memo for PDF components when appropriate
- Implement proper error boundaries
- Consider server-side generation for large volumes
- Cache generated PDFs when possible

## Future Enhancements

Potential improvements:
- Logo/image support
- Multiple page layouts
- Custom templates
- Batch PDF generation
- Email integration
- Digital signatures
