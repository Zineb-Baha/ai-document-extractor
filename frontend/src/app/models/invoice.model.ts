export interface InvoiceItem {
  description: string | null;
  quantity: number | null;
  unit_price: number | null;
  total: number | null;
}

export interface InvoiceParty {
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface InvoiceData {
  document_type: string;
  invoice_number: string | null;
  invoice_date: string | null;

  supplier: InvoiceParty;
  customer: InvoiceParty;

  items: InvoiceItem[];

  subtotal: number | null;
  tax: number | null;
  total: number | null;
  currency: string | null;
}