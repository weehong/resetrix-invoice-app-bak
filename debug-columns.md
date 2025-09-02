# Debug Steps for Dynamic Columns in PDF

## Current Status
- ✅ Development server running on http://localhost:3001
- ✅ Added debugging logs to track column data flow
- ✅ Fixed type compatibility issues between form and PDF service
- ✅ Updated PDF service to use updated InvoiceData type

## Debug Steps to Follow

### 1. Open Browser Console
1. Open http://localhost:3001
2. Open browser developer tools (F12)
3. Go to Console tab

### 2. Test Adding a Custom Column
1. Scroll to "Customize Table Columns" section
2. Add a new column:
   - Label: "Test Column"
   - Key: "test_column"
   - Type: "text"
3. Click "Add Column"
4. **Check Console**: Should see logs about column updates

### 3. Test PDF Generation
1. Fill in basic invoice details
2. Add an invoice item
3. Click "Preview PDF"
4. **Check Console**: Should see these logs:
   - "PdfViewer - Form data before PDF generation"
   - "PDF Service - convertInvoiceData received"
   - "InvoiceTable received"
   - "InvoiceTable effectiveColumnHeaders"

### 4. Expected Console Output
```
PdfViewer - Form data before PDF generation: {
  columns: [
    {id: "desc", key: "description", label: "Description", ...},
    {id: "qty", key: "quantity", label: "Quantity", ...},
    {id: "rate", key: "unitPrice", label: "Rate", ...},
    {id: "total", key: "total", label: "Total", ...},
    {id: "col_xxx", key: "test_column", label: "Test Column", ...}
  ],
  columnHeaders: {...},
  itemsCount: 1
}

PDF Service - convertInvoiceData received: {
  columns: [...], // Same as above
  columnHeaders: {...},
  itemsCount: 1
}

InvoiceTable received: {
  columns: [...], // Same as above
  columnHeaders: {...},
  itemsCount: 1
}

InvoiceTable effectiveColumnHeaders: {
  description: "DESCRIPTION",
  quantity: "QUANTITY", 
  rate: "RATE",
  total: "TOTAL"
}
```

### 5. Issues to Look For

#### If columns is undefined/empty:
- Check if form is properly saving column data
- Verify default columns are being set

#### If PDF Service doesn't receive columns:
- Check type casting in PdfViewer
- Verify usePDF hook is using correct InvoiceData type

#### If InvoiceTable doesn't receive columns:
- Check InvoiceDocument is passing columns prop
- Verify InvoiceProps type includes columns

#### If effectiveColumnHeaders doesn't include custom columns:
- Check convertColumnsToHeaders function
- Verify column mapping logic

## Next Steps Based on Console Output

### If No Logs Appear:
- Check if debugging code was saved correctly
- Verify development server reloaded

### If Columns Are Empty:
- Check form state management
- Verify default columns are being set

### If PDF Doesn't Show Custom Columns:
- Check if convertColumnsToHeaders is working
- Verify GridHeader is using effectiveColumnHeaders

### If Custom Column Data Missing:
- Check if invoice items have customFields
- Verify data synchronization is working
