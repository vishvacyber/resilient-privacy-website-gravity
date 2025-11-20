from PIL import Image
import os

def check_image(path):
    try:
        if not os.path.exists(path):
            print(f"File not found: {path}")
            return
        
        img = Image.open(path)
        img.verify()
        print(f"Image {path} is valid. Format: {img.format}, Size: {img.size}, Mode: {img.mode}")
    except Exception as e:
        print(f"Image {path} is invalid. Error: {e}")

if __name__ == "__main__":
    check_image("public/company_logo_transparent.png")
    check_image("public/company_logo.png")
