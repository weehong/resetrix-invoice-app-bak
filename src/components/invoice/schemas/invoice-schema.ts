import { z } from "zod";

// Validation schema for the invoice form
export const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: z.string().min(1, "Invoice date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  currency: z.string().default("USD"),
  status: z.enum(["draft", "sent", "paid", "overdue", "cancelled"]).optional(),
  company: z.object({
    ownerName: z.string().optional(),
    name: z.string().min(1, "Company name is required"),
    registrationNumber: z.string().optional(),
    address: z.string().min(1, "Company address is required"),
    postalCode: z.string().optional(),
    email: z.string().email("Invalid email format"),
    phone: z.string().min(1, "Phone number is required"),
    logo: z.string().optional(),
  }),
  client: z.object({
    name: z.string().nullable().optional(),
    companyName: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
    postalCode: z.string().nullable().optional(),
    email: z.string().email("Invalid email format").nullable().optional(),
    phone: z.string().optional(),
    registrationNumber: z.string().nullable().optional(),
  }),
  items: z
    .array(
      z.object({
        id: z.string(),
        description: z.string().min(1, "Description is required"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        unitPrice: z.number().min(0, "Unit price must be non-negative"),
        total: z.number(),
      }),
    )
    .min(1, "At least one item is required"),
  subtotal: z.number(),
  tax: z.object({
    enabled: z.boolean().default(true),
    rate: z.number()
      .min(0, "Tax rate cannot be negative")
      .max(1, "Tax rate cannot exceed 100%")
      .default(0),
    amount: z.number(),
    label: z.string().optional(),
  }),
  total: z.number(),
  payment: z
    .object({
      dueDate: z.string(),
      bankDetails: z
        .object({
          bankName: z.string().optional(),
          accountNumber: z.string().optional(),
          swiftCode: z.string().optional(),
          accountName: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  paymentSchedule: z
    .array(
      z.object({
        id: z.string(),
        description: z.string().min(1, "Description is required"),
        percentage: z
          .number()
          .min(0, "Percentage must be non-negative")
          .max(100, "Percentage cannot exceed 100%"),
        amount: z.number(),
      }),
    )
    .optional()
    .refine(
      (schedule) => {
        if (!schedule || schedule.length === 0) return true;
        const totalPercentage = schedule.reduce(
          (sum, entry) => sum + entry.percentage,
          0,
        );
        return totalPercentage <= 100;
      },
      {
        message: "Total percentage cannot exceed 100%",
      },
    ),
  notes: z.string().optional(),

  // Customizable column headers for PDF table
  columnHeaders: z.object({
    description: z.string().default("Description"),
    quantity: z.string().default("Quantity"),
    rate: z.string().default("Rate"),
    total: z.string().default("Total"),
  }).optional(),
});

export type InvoiceFormData = z.infer<typeof invoiceSchema>;
