"""
Audio se deepfake detect karne ka logic - video me se audio nikaalna,
ya directly audio file pe prediction lena.
"""
import os
from moviepy import VideoFileClip

from config import TEMP_DIR
from core.model_loader import get_audio_classifier


def analyze_audio(video_path):
    """Video me se audio nikaal ke uspe prediction leta hai. Audio na ho toh None return karta hai."""
    video = VideoFileClip(video_path)
    if video.audio is None:
        return None

    audio_path = os.path.join(TEMP_DIR, "extracted_audio.wav")
    video.audio.write_audiofile(audio_path, logger=None)

    classifier = get_audio_classifier()
    return classifier(audio_path)


def analyze_audio_direct(audio_path):
    """Directly audio file (wav/mp3) pe prediction."""
    classifier = get_audio_classifier()
    return classifier(audio_path)
