# DeepFake Analyzer

DeepFake Analyzer is an advanced, full-stack forensic analysis tool designed to detect AI-generated deepfakes across Video, Audio, and Image formats. 

This repository provides a complete Github-ready structure containing a robust Python backend (FastAPI & Streamlit) and a modern, responsive Vite-based frontend dashboard.

## 🚀 Key Features

*   **Multimodal Analysis**: Analyze Video (`.mp4`, `.mov`, `.avi`), Audio (`.wav`, `.mp3`), and Images (`.jpg`, `.png`).
*   **DeepGuard AI Core**: Employs neural network weights to extract facial landmarks, analyze spectral audio frequencies, and detect micro-expressions.
*   **Forensic Dashboard**: Beautiful, real-time UI that runs simulations of the analysis and displays threat levels, confidence scores, spectral matches, and coherence data.
*   **Dual Backend Modes**: Run as a standalone **Streamlit** application for quick testing, or spin up the **FastAPI** server to serve REST endpoints for the web frontend.

---

## 📁 Repository Structure

```text
DeepFake-Analyzer-Release/
├── backend/                  # Python Engine (AI Core & API)
│   ├── core/                 # Core ML models and analysis scripts
│   ├── api.py                # FastAPI endpoints (Connects to Vite Frontend)
│   ├── app.py                # Streamlit UI (Alternative standalone UI)
│   ├── config.py             # Global configurations & thresholds
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Vite Frontend (SafeShield UI)
│   ├── src/                  # Vanilla JS, Tailwind CSS, API hooks
│   ├── public/               # Static assets (fonts, icons)
│   ├── index.html            # Entry point
│   ├── package.json          # Node dependencies
│   └── tailwind.config.js    # Tailwind theme configuration
├── .gitignore                # Environment, Node, and Python ignores
└── README.md                 # Project Documentation
```

---

## ⚙️ Setup & Installation

### 1. Backend Setup (FastAPI / AI Core)

The backend powers the actual deepfake detection using Python and `Transformers/PyTorch/OpenCV`.

**Prerequisites:** Python 3.8+

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Create a virtual environment (Recommended)
python -m venv venv
source venv/bin/activate      # On Windows use: venv\Scripts\activate

# 3. Install dependencies
pip install -r requirements.txt
```

#### Running the Backend API (For the Web Frontend)
To run the FastAPI server which the Vite frontend communicates with:
```bash
uvicorn api:app --reload
```
*API will run at `http://localhost:8000` with Swagger docs available at `http://localhost:8000/docs`.*

#### Running the Streamlit App (Optional)
If you prefer the standalone Python UI:
```bash
streamlit run app.py
```

### 2. Frontend Setup (Vite Dashboard)

The frontend is a fast, optimized Vite project built with Vanilla JS and Tailwind CSS.

**Prerequisites:** Node.js v16+

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install NPM packages
npm install

# 3. Run the development server
npm run dev
```
*The web dashboard will be available at `http://localhost:5173`.*

---

## 🔌 API Endpoints

The FastAPI backend exposes the following REST endpoints to handle multipart file uploads:

*   `POST /analyze/video` - Accepts `file` (Video format). Returns final verdict, video fake score, and audio fake score.
*   `POST /analyze/audio` - Accepts `file` (Audio format). Returns audio deepfake confidence.
*   `POST /analyze/image` - Accepts `file` (Image format). Returns deepfake confidence for image anomaly.
*   `GET /health` - Returns API status check.

---

## 🛡️ How It Works

1.  **File Upload**: The user uploads media via the Drag & Drop frontend dashboard.
2.  **API Communication**: The frontend initiates a `fetch` request with a `FormData` payload containing the media to the `http://localhost:8000` backend.
3.  **AI Analysis (Core)**: 
    *   **Video**: Splits frames, extracts audio, and passes them to `video_utils.py` and `audio_utils.py`. Fuses the average scores.
    *   **Audio/Image**: Runs direct spectral and pixel anomaly evaluation.
4.  **Results Render**: The frontend receives the response, halts the UI simulation, and animates the Threat Gauge and spectral graphs to reflect the AI's actual confidence scores.

## 📄 License
This project is for educational and hackathon purposes.
