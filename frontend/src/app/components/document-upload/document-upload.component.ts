import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DocumentService } from '../../services/document.service';
import { InvoiceData } from '../../models/invoice.model';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-document-upload',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './document-upload.component.html',
  styleUrl: './document-upload.component.css'
})
export class DocumentUpload {

  selectedFile: File | null = null;

  message = '';
  extractedText = '';
  structuredData: InvoiceData | null = null;

  uploading = false;

  constructor(
    private readonly documentService: DocumentService
  ) {}

  onFileSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {

      this.selectedFile = input.files[0];

      this.message = '';
      this.extractedText = '';
      this.structuredData = null;
    }
  }

exportJson(): void {
  if (!this.structuredData) {
    return;
  }

  const json = JSON.stringify(this.structuredData, null, 2);

  const blob = new Blob([json], {
    type: 'application/json'
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'invoice.json';

  link.click();

  URL.revokeObjectURL(url);
}


exportXml(): void {
  if (!this.structuredData) {
    return;
  }

  const data = this.structuredData;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<invoice>
  <document_type>${data.document_type ?? ''}</document_type>
  <invoice_number>${data.invoice_number ?? ''}</invoice_number>
  <invoice_date>${data.invoice_date ?? ''}</invoice_date>
  <currency>${data.currency ?? ''}</currency>

  <supplier>
    <name>${data.supplier.name ?? ''}</name>
    <email>${data.supplier.email ?? ''}</email>
    <phone>${data.supplier.phone ?? ''}</phone>
    <address>${data.supplier.address ?? ''}</address>
  </supplier>

  <customer>
    <name>${data.customer.name ?? ''}</name>
    <email>${data.customer.email ?? ''}</email>
    <phone>${data.customer.phone ?? ''}</phone>
    <address>${data.customer.address ?? ''}</address>
  </customer>

  <items>
    ${data.items.map(item => `
    <item>
      <description>${item.description ?? ''}</description>
      <quantity>${item.quantity ?? ''}</quantity>
      <unit_price>${item.unit_price ?? ''}</unit_price>
      <total>${item.total ?? ''}</total>
    </item>`).join('')}
  </items>

  <subtotal>${data.subtotal ?? ''}</subtotal>
  <tax>${data.tax ?? ''}</tax>
  <total>${data.total ?? ''}</total>
</invoice>`;

  const blob = new Blob([xml], {
    type: 'application/xml'
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'invoice.xml';

  link.click();

  URL.revokeObjectURL(url);
}

exportExcel(): void {

  if (!this.structuredData) {
    return;
  }

  const data = this.structuredData;

  const workbook = XLSX.utils.book_new();

  // =========================
  // INVOICE INFORMATION
  // =========================

  const invoiceInfo = [
    ['INVOICE INFORMATION', ''],
    ['Document Type', data.document_type ?? ''],
    ['Invoice Number', data.invoice_number ?? ''],
    ['Invoice Date', data.invoice_date ?? ''],
    ['Currency', data.currency ?? ''],

    [],

    ['SUPPLIER', ''],
    ['Name', data.supplier.name ?? ''],
    ['Email', data.supplier.email ?? ''],
    ['Phone', data.supplier.phone ?? ''],
    ['Address', data.supplier.address ?? ''],

    [],

    ['CUSTOMER', ''],
    ['Name', data.customer.name ?? ''],
    ['Email', data.customer.email ?? ''],
    ['Phone', data.customer.phone ?? ''],
    ['Address', data.customer.address ?? ''],

    [],

    ['TOTALS', ''],
    ['Subtotal', data.subtotal ?? ''],
    ['Tax', data.tax ?? ''],
    ['Total', data.total ?? '']
  ];

  const invoiceSheet =
    XLSX.utils.aoa_to_sheet(invoiceInfo);

  // Large first column
  invoiceSheet['!cols'] = [
    { wch: 25 },
    { wch: 45 }
  ];

  XLSX.utils.book_append_sheet(
    workbook,
    invoiceSheet,
    'Invoice'
  );


  // =========================
  // ITEMS
  // =========================

  const items = data.items.map(item => ({
    Description: item.description ?? '',
    Quantity: item.quantity ?? '',
    'Unit Price': item.unit_price ?? '',
    Total: item.total ?? ''
  }));

  const itemsSheet =
    XLSX.utils.json_to_sheet(items);

  itemsSheet['!cols'] = [
    { wch: 40 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 }
  ];

  XLSX.utils.book_append_sheet(
    workbook,
    itemsSheet,
    'Items'
  );


  // =========================
  // DOWNLOAD
  // =========================

  XLSX.writeFile(
    workbook,
    'invoice.xlsx'
  );
}


  upload(): void {

    if (!this.selectedFile) {
      this.message = 'Please select a file first.';
      return;
    }

    this.uploading = true;

    this.message = '';
    this.extractedText = '';
    this.structuredData = null;

    this.documentService
      .uploadDocument(this.selectedFile)
      .subscribe({

        next: (response) => {

          this.uploading = false;

          this.message =
            `✓ ${response.message} (${response.fileName})`;

          this.extractedText =
            response.extractedText ?? '';

          this.structuredData =
            response.structuredData;
        },

        error: (error) => {

          this.uploading = false;

          console.error('UPLOAD ERROR:', error);
          console.error('STATUS:', error.status);
          console.error('ERROR:', error.error);
          console.error('MESSAGE:', error.message);

          this.message =
            `❌ Upload failed (${error.status})`;
        }
      });
  }
}