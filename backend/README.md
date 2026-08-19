# 🔍 DeepFake Analyzer

**Classifier and Analyzer of Audio/Video Content** — built for Smart India Hackathon (SIH).

Detects whether a video, audio clip, or image is **REAL** or a **DEEPFAKE**, using pretrained ML models: a ViT-based image classifier for video/faces, and a wav2vec2-based classifier for audio — combined through a fusion layer for a single verdict.

## 🧠 How it works

1. **Video** → frames sampled every N frames → face detected (OpenCV Haar Cascade) → cropped face passed to the image classifier
2. **Audio** → extracted from the video (or uploaded directly) → passed to the audio classifier
3. **Fusion** → video + audio fake-scores averaged → final REAL / FAKE verdict

## 🏗️ Project structure

```
deepfake-analyzer/
├── app.py              # Streamlit frontend (main demo UI)
├── api.py              # FastAPI backend (optional — connect any other frontend to this)
├── config.py            # models, thresholds, paths — every setting lives here
├── core/                 # actual detection logic, shared by app.py AND api.py
│   ├── model_loader.py    # loads + caches both ML models
│   ├── video_utils.py     # video + image analysis
│   ├── audio_utils.py     # audio analysis
│   └── fusion.py           # combines video + audio into final verdict
├── data/temp/              # uploaded files land here temporarily (gitignored)
├── requirements.txt
└── .gitignore
```

The `core/` layer has zero dependency on Streamlit — it's plain Python functions. That's what makes it easy to plug in a real backend later: `api.py` already wraps the same functions behind a REST API, and any new interface (React app, mobile app, teammate's service) can do the same.

## ⚙️ Setup (Windows)

```bash
py -3.12 -m venv venv312
venv312\Scripts\activate
pip install -r requirements.txt
```

> Requires Python 3.12 (3.14 has compatibility issues with some libraries here) and ffmpeg installed (`choco install ffmpeg`).

## ▶️ Running

**Streamlit app (main demo):**
```bash
streamlit run app.py
```

**FastAPI backend (optional, for connecting another frontend):**
```bash
uvicorn api:app --reload
```
Interactive docs at `http://localhost:8000/docs` — comes free with FastAPI, useful for demoing the API to judges too.

## 📦 Models used

| Type  | Model |
|-------|-------|
| Video | `prithivMLmods/Deep-Fake-Detector-v2-Model` |
| Audio | `MelodyMachine/Deepfake-audio-detection-V2` |

## 🚀 Future scope

- Fine-tune on FaceForensics++ / DFDC / ASVspoof datasets
- GPU inference support
- Deploy `api.py` as a standalone service and connect a dedicated frontend to it

## 👥 Team

_(add your team name + members here)_
