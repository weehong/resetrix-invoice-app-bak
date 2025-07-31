import { InvoiceData } from "@/types/invoice-updated";

// Default invoice data template
export const defaultInvoiceData: InvoiceData = {
  invoiceNumber: "INV-FRL-2025-001",
  invoiceDate: new Date().toISOString().split("T")[0],
  dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
  currency: "USD",
  status: "draft" as const,
  company: {
    ownerName: "John Doe",
    name: "Your Company Name",
    registrationNumber: "REG123456",
    address: "123 Business Street",
    city: "Singapore",
    state: "",
    country: "Singapore",
    postalCode: "123456",
    email: "contact@yourcompany.com",
    phone: "+65 1234 5678",
    logo: "",
  },
  client: {
    name: "John Smith",
    companyName: "Client Company Ltd",
    address: "456 Client Avenue",
    city: "Singapore",
    state: "",
    country: "Singapore",
    postalCode: "654321",
    email: "client@clientcompany.com",
    phone: "+65 8765 4321",
    registrationNumber: "REG654321",
  },
  items: [
    {
      id: "1",
      description: "Service Description",
      quantity: 1,
      unitPrice: 1000,
      total: 1000,
    },
  ],
  subtotal: 1000,
  tax: {
    enabled: true,
    rate: 0.07,
    amount: 70,
    label: "GST",
  },
  total: 1070,
  payment: {
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    bankDetails: {
      bankName: "DBS Bank",
      accountNumber: "123-456789-001",
      swiftCode: "DBSSSGSG",
      accountName: "Resetrix Pte Ltd",
    },
  },
  paymentSchedule: [
    {
      id: "1",
      description: "Upon signing",
      percentage: 30,
      amount: 321, // 30% of 1070
    },
    {
      id: "2",
      description: "Upon delivery",
      percentage: 60,
      amount: 642, // 60% of 1070
    },
    {
      id: "3",
      description: "Upon acceptance",
      percentage: 10,
      amount: 107, // 10% of 1070
    },
  ],
  notes: "Thank you for your business!",
  columnHeaders: {
    description: "Description",
    quantity: "Quantity",
    rate: "Rate",
    total: "Total",
  },
};
