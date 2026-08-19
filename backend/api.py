"""
FastAPI backend - agar kal ko koi aur frontend (React, mobile app, teammate
ka backend, etc.) connect karna ho toh yeh REST API use ho sakta hai.
Same core/ logic reuse hoti hai jo app.py use karta hai - sirf interface
change hai (HTTP instead of Streamlit UI).

Run karne ke liye:
    uvicorn api:app --reload

Docs automatically yaha mil jayenge: http://localhost:8000/docs
"""
import os
import shutil

from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from config import TEMP_DIR
from core.video_utils import analyze_image_direct
from core.audio_utils import analyze_audio_direct
from core.fusion import full_analysis

app = FastAPI(title="DeepFake Analyzer API")

# CORS enable kiya hai taaki koi bhi frontend (React/HTML localhost pe
# chal raha) bina issue ke isse call kar sake. Production me allow_origins
# ko specific domain tak limit kar dena.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _save_upload(upload_file: UploadFile, filename: str) -> str:
    path = os.path.join(TEMP_DIR, filename)
    with open(path, "wb") as f:
        shutil.copyfileobj(upload_file.file, f)
    return path


@app.post("/analyze/video")
async def analyze_video_endpoint(file: UploadFile = File(...)):
    path = _save_upload(file, "api_temp_video.mp4")
    return full_analysis(path)


@app.post("/analyze/audio")
async def analyze_audio_endpoint(file: UploadFile = File(...)):
    path = _save_upload(file, "api_temp_audio.wav")
    prediction = analyze_audio_direct(path)
    top_pred = max(prediction, key=lambda x: x["score"])
    return {
        "verdict": "FAKE" if top_pred["label"].lower() == "fake" else "REAL",
        "confidence": round(top_pred["score"], 3),
        "breakdown": prediction,
    }


@app.post("/analyze/image")
async def analyze_image_endpoint(file: UploadFile = File(...)):
    path = _save_upload(file, "api_temp_image.jpg")
    prediction = analyze_image_direct(path)
    top_pred = max(prediction, key=lambda x: x["score"])
    return {
        "verdict": "FAKE" if top_pred["label"].lower() in ["fake", "deepfake"] else "REAL",
        "confidence": round(top_pred["score"], 3),
        "breakdown": prediction,
    }


@app.get("/health")
async def health_check():
    return {"status": "ok"}
