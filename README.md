# 🤖 AI Document Extractor

An AI-powered document processing application that automatically extracts information from invoices and transforms unstructured documents into structured data.

The application supports PDF and image documents and combines OCR, PDF processing and AI-based information extraction.

---

## 🚀 Features

- 📄 Upload PDF, PNG and JPG documents
- 🔍 OCR extraction for scanned documents and images
- 📑 Text extraction from standard PDFs
- 🤖 AI-powered invoice information extraction
- 🧾 Automatic extraction of:
  - Invoice number
  - Invoice date
  - Supplier information
  - Customer information
  - Invoice items
  - Quantity
  - Unit price
  - Tax
  - Subtotal
  - Total
  - Currency
- ✏️ Review and edit extracted information
- 📦 Export extracted data to:
  - JSON
  - XML
  - Excel
- 🔎 View raw extracted text
- 🌐 Angular frontend
- ⚡ FastAPI backend

## 🏗️ Architecture
                    ┌─────────────────┐
                    │     Angular     │
                    │    Frontend     │
                    └────────┬────────┘
                             │
                             │ HTTP
                             ▼
                    ┌─────────────────┐
                    │     FastAPI     │
                    │     Backend     │
                    └────────┬────────┘
                             │
                  ┌──────────┴──────────┐
                  │                     │
                  ▼                     ▼
             PDF Document         Image Document
                  │                     │
                  ▼                     ▼
            PDF Extraction          OCR / Tesseract
                  │                     │
                  └──────────┬──────────┘
                             ▼
                         Raw Text
                             │
                             ▼
                       Gemini AI
                             │
                             ▼
                    Structured JSON
                             │
                             ▼
                    Angular Review UI
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
             JSON           XML           Excel


## 📸 Demo

### Document Upload

<img width="750" height="1061" alt="test_invoice" src="https://github.com/user-attachments/assets/6d1c95d7-fe63-4570-a8e3-e877b1f3db4f" />

### Extracted Invoice Data

<img width="502" height="880" alt="image" src="https://github.com/user-attachments/assets/616874ab-a485-49f9-ba71-bb791e800779" />

Export Json
{
  "document_type": "invoice",
  "invoice_number": "US-001",
  "invoice_date": "11/02/2019",
  "supplier": {
    "name": "East Repair Inc.",
    "email": null,
    "phone": null,
    "address": "1912 Harvest Lane, New York, NY 12210"
  },
  "customer": {
    "name": "John Smith",
    "email": null,
    "phone": null,
    "address": "2 Court Square, New York, NY 12210"
  },
  "items": [
    {
      "description": "Front and rear brake cables",
      "quantity": 1,
      "unit_price": 100,
      "total": 100
    },
    {
      "description": "New set of pedal arms",
      "quantity": 2,
      "unit_price": 15,
      "total": 30
    },
    {
      "description": "Labor 3hrs",
      "quantity": 3,
      "unit_price": 5,
      "total": 15
    }
  ],
  "subtotal": 145,
  "tax": 9.06,
  "total": 154.06,
  "currency": "$"
}

Export Excel

<invoice>
<document_type>invoice</document_type>
<invoice_number>US-001</invoice_number>
<invoice_date>11/02/2019</invoice_date>
<currency>$</currency>
<supplier>
<name>East Repair Inc.</name>
<email/>
<phone/>
<address>1912 Harvest Lane, New York, NY 12210</address>
</supplier>
<customer>
<name>John Smith</name>
<email/>
<phone/>
<address>2 Court Square, New York, NY 12210</address>
</customer>
<items>
<item>
<description>Front and rear brake cables</description>
<quantity>1</quantity>
<unit_price>100</unit_price>
<total>100</total>
</item>
<item>
<description>New set of pedal arms</description>
<quantity>2</quantity>
<unit_price>15</unit_price>
<total>30</total>
</item>
<item>
<description>Labor 3hrs</description>
<quantity>3</quantity>
<unit_price>5</unit_price>
<total>15</total>
</item>
</items>
<subtotal>145</subtotal>
<tax>9.06</tax>
<total>154.06</total>
</invoice>

Export XML

<img width="835" height="750" alt="image" src="https://github.com/user-attachments/assets/c694ca28-4cf1-47be-9f33-3c23fc03d4a1" />
<img width="977" height="722" alt="image" src="https://github.com/user-attachments/assets/7fc389bb-1c82-4e36-aae3-fdf2c1b82f33" />





