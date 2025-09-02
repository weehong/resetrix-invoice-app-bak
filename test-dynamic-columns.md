# Dynamic Column Management Test Guide

## ✅ **Test Steps to Verify Dynamic Columns in PDF**

### **Step 1: Open the Application**
- Navigate to: http://localhost:3001
- The invoice form should load successfully

### **Step 2: Test Adding a Custom Column**
1. Scroll down to the **"Customize Table Columns"** section
2. In the "Add New Column" area:
   - **Column Label**: Enter "Project Code"
   - **Column Key**: Enter "project_code"
   - **Type**: Select "text"
   - Click **"Add Column"** button

### **Step 3: Verify Column Appears in Form**
1. Scroll up to the **"Invoice Items"** section
2. You should see the new "Project Code" column in the table header
3. Add a test invoice item and verify you can enter data in the new column

### **Step 4: Test PDF Generation**
1. Fill in basic invoice details:
   - Invoice Number: TEST-001
   - Company Name: Test Company
   - Client Name: Test Client
   - Add at least one invoice item with data in the custom column
2. Click **"Preview PDF"** button
3. **EXPECTED RESULT**: The PDF should show the custom "Project Code" column

### **Step 5: Test Column Editing**
1. Go back to "Customize Table Columns"
2. Click **"Edit"** on the "Project Code" column
3. Change the label to "Project ID"
4. Click **"Done"**
5. Verify the column header updates in both the form and PDF preview

### **Step 6: Test Column Removal**
1. Click **"Remove"** on the custom column
2. Verify it disappears from the invoice items table
3. Generate PDF again to confirm it's removed from PDF

## 🔧 **Technical Verification Points**

### **Form Integration**
- ✅ New columns appear in invoice items table
- ✅ Column headers update dynamically
- ✅ Data can be entered in custom columns
- ✅ Column validation works (unique keys, required fields)

### **PDF Integration**
- ✅ Custom columns appear in PDF table headers
- ✅ Custom column data appears in PDF table rows
- ✅ Column changes reflect immediately in PDF preview
- ✅ Column removal removes data from PDF

### **Data Synchronization**
- ✅ Adding columns creates new fields in invoice items
- ✅ Removing columns removes associated data
- ✅ Column edits update headers everywhere
- ✅ Form validation prevents invalid column configurations

## 🐛 **Known Issues to Check**

1. **PDF Column Headers**: Verify custom columns show correct labels in PDF
2. **Data Persistence**: Ensure custom field data appears in PDF rows
3. **Column Ordering**: Check if columns appear in correct order
4. **Type Handling**: Verify number/currency columns format correctly in PDF

## 📝 **Test Results**

Record your test results here:

- [ ] Custom column appears in form table
- [ ] Custom column appears in PDF preview
- [ ] Column editing works in both form and PDF
- [ ] Column removal works correctly
- [ ] Data synchronization works properly
- [ ] No console errors during testing

## 🎯 **Success Criteria**

The dynamic column management feature is working correctly if:
1. **Form Updates**: Custom columns appear immediately in the invoice items table
2. **PDF Updates**: Custom columns appear in PDF preview with correct headers and data
3. **Data Integrity**: Adding/removing columns properly manages associated data
4. **User Experience**: Interface is intuitive and responsive
