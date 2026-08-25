import pymupdf
from PIL import Image

from services.ocr_service import extract_text_from_image


def extract_text_from_pdf(pdf_path: str) -> str:
    document = pymupdf.open(pdf_path)

    pages_text = []

    for page in document:
        text = page.get_text().strip()

        if text:
            # PDF avec texte natif
            pages_text.append(text)

        else:
            # PDF scanné → convertir la page en image
            pix = page.get_pixmap(
                matrix=pymupdf.Matrix(2, 2)
            )

            image = Image.frombytes(
                "RGB",
                [pix.width, pix.height],
                pix.samples
            )

            # Utiliser notre service OCR existant
            text = extract_text_from_image(image)

            pages_text.append(text)

    document.close()

    return "\n".join(pages_text).strip()