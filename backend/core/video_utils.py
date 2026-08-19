"""
Video aur image se deepfake detect karne ka logic yaha hai. Face detect
karke sirf face pe model chalate hai (poori frame pe nahi) - isse
accuracy better milti hai.
"""
import cv2
from PIL import Image

from config import VIDEO_FRAME_SKIP
from core.model_loader import get_image_classifier

face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")


def analyze_video(video_path, every_n_frames=VIDEO_FRAME_SKIP):
    """Video ke frames check karta hai (har Nth frame), face dhoondke us pe prediction leta hai."""
    classifier = get_image_classifier()
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    results = []

    while True:
        success, frame = cap.read()
        if not success:
            break

        if frame_count % every_n_frames == 0:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

            if len(faces) > 0:
                frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                pil_image = Image.fromarray(frame_rgb)
                prediction = classifier(pil_image)
                results.append({"frame": frame_count, "prediction": prediction})

        frame_count += 1

    cap.release()
    return results


def analyze_image_direct(image_path):
    """Single image pe deepfake check - face crop karke us pe prediction, warna poori image (fallback)."""
    classifier = get_image_classifier()
    img = cv2.imread(image_path)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    if len(faces) > 0:
        x, y, w, h = max(faces, key=lambda f: f[2] * f[3])  # sabse bada face
        face_crop = img[y:y + h, x:x + w]
        face_rgb = cv2.cvtColor(face_crop, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(face_rgb)
    else:
        pil_image = Image.open(image_path).convert("RGB")  # face nahi mila -> poori image

    return classifier(pil_image)
