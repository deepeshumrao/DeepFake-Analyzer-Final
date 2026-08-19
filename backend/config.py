"""
Saari settings aur constants yaha rakhi hai - taaki kahin bhi hardcoded
value na ho aur baad me tune karna easy rahe (jaise threshold badalna,
ya model swap karna).
"""
import os

# ---- Model names (HuggingFace) ----
IMAGE_MODEL_NAME = "prithivMLmods/Deep-Fake-Detector-v2-Model"
AUDIO_MODEL_NAME = "MelodyMachine/Deepfake-audio-detection-V2"

# ---- Inference settings ----
DEVICE = -1              # -1 = CPU, 0 = GPU (agar CUDA available ho)
VIDEO_FRAME_SKIP = 15    # har 15th frame check karega (speed vs accuracy tradeoff)
FAKE_THRESHOLD = 0.5     # isse zyada final score aaya toh verdict FAKE hoga

# ---- Paths ----
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMP_DIR = os.path.join(BASE_DIR, "data", "temp")
os.makedirs(TEMP_DIR, exist_ok=True)
