import pytesseract
from PIL import Image, ImageEnhance, ImageFilter

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_image(image_source) -> str:

    if isinstance(image_source, str):
        image = Image.open(image_source)
    else:
        image = image_source

    # Agrandir l'image
    image = image.resize(
        (image.width * 3, image.height * 3)
    )

    # Grayscale
    image = image.convert("L")

    # Améliorer le contraste
    image = ImageEnhance.Contrast(image).enhance(2)

    # Améliorer la netteté
    image = image.filter(ImageFilter.SHARPEN)

    # OCR
    text = pytesseract.image_to_string(
        image,
        lang="eng+fra",
        config="--psm 6"
    )

    return text.strip()