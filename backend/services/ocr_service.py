import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_image(image_path: str) -> str:
    image = Image.open(image_path)

    # 1. Agrandir l'image
    image = image.resize(
        (image.width * 3, image.height * 3)
    )

    # 2. Convertir en niveaux de gris
    image = image.convert("L")

    # 3. Améliorer le contraste
    image = ImageEnhance.Contrast(image).enhance(2)

    # 4. Légèrement améliorer la netteté
    image = image.filter(ImageFilter.SHARPEN)

    # 5. OCR
    text = pytesseract.image_to_string(
        image,
        lang="eng+fra",
        config="--psm 6"
    )

    return text.strip()