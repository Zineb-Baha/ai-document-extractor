import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise ValueError("GEMINI_API_KEY is not configured")

client = genai.Client(api_key=api_key)


def extract_invoice_data(raw_text: str) -> str:

    prompt = f"""
You are an AI document extraction system.

Analyze the invoice text below and extract the information into JSON.

IMPORTANT RULES:
- Use only information present in the document.
- Never invent information.
- If information is missing, use null.
- OCR may contain mistakes. Correct obvious OCR mistakes using context.
- Return ONLY valid JSON.
- Do not add markdown.
- Do not add explanations.

Use exactly this structure:

{{
  "document_type": "invoice",
  "invoice_number": null,
  "invoice_date": null,
  "supplier": {{
    "name": null,
    "email": null,
    "phone": null,
    "address": null
  }},
  "customer": {{
    "name": null,
    "email": null,
    "phone": null,
    "address": null
  }},
  "items": [
    {{
      "description": null,
      "quantity": null,
      "unit_price": null,
      "total": null
    }}
  ],
  "subtotal": null,
  "tax": null,
  "total": null,
  "currency": null
}}

INVOICE TEXT:

--- START ---
{raw_text}
--- END ---
"""

    response = client.models.generate_content(
        model="gemini-3.6-flash",
        contents=prompt
    )

    return response.text