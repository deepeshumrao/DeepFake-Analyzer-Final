"""
Dono models yaha load aur cache hote hai. Yeh Streamlit se independent hai
(global variable caching use kiya hai) - isliye same code Streamlit app
(app.py) aur FastAPI backend (api.py) dono me chalega, bina duplicate
load kiye.
"""
from transformers import pipeline

from config import IMAGE_MODEL_NAME, AUDIO_MODEL_NAME, DEVICE

_image_classifier = None
_audio_classifier = None


def get_image_classifier():
    global _image_classifier
    if _image_classifier is None:
        _image_classifier = pipeline(
            "image-classification",
            model=IMAGE_MODEL_NAME,
            device=DEVICE,
        )
    return _image_classifier


def get_audio_classifier():
    global _audio_classifier
    if _audio_classifier is None:
        _audio_classifier = pipeline(
            "audio-classification",
            model=AUDIO_MODEL_NAME,
            device=DEVICE,
        )
    return _audio_classifier
