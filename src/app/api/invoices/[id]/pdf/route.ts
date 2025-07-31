import { NextRequest, NextResponse } from 'next/server';
import { PDFService } from '@/lib/pdf-service';
import { InvoiceData } from '@/types/invoice';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Fetch invoice data from database
    // const invoiceData = await getInvoiceById(params.id);

    // For demo purposes, load sample data from JSON file
    const fs = await import('fs/promises');
    const path = await import('path');

    const sampleDataPath = path.join(process.cwd(), 'public/data/sample-invoice.json');
    const sampleDataContent = await fs.readFile(sampleDataPath, 'utf-8');
    const sampleData: InvoiceData = JSON.parse(sampleDataContent);

    const pdfBlob = await PDFService.generateInvoicePDF(sampleData);
    const pdfBuffer = await pdfBlob.arrayBuffer();

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="invoice-${params.id}.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}