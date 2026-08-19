"""
Streamlit frontend - sirf UI ka kaam karta hai, saari heavy logic
core/ folder me hai. Isse kal ko backend (jaise api.py / FastAPI)
connect karna easy hoga kyuki core wahi rahega, sirf interface badlega.
"""
import os
import streamlit as st

from config import TEMP_DIR
from core.video_utils import analyze_image_direct
from core.audio_utils import analyze_audio_direct
from core.fusion import full_analysis

st.set_page_config(page_title="DeepFake Analyzer", layout="centered")

st.title("🔍 DeepFake Analyzer")
st.write("Upload a video, audio file, or image to check if it's Real or a Deepfake.")

input_type = st.radio("What are you uploading?", ["Video", "Audio only", "Image only"])

if input_type == "Video":
    uploaded_file = st.file_uploader("Upload video", type=["mp4", "mov", "avi"])

    if uploaded_file is not None:
        temp_path = os.path.join(TEMP_DIR, "temp_video.mp4")
        with open(temp_path, "wb") as f:
            f.write(uploaded_file.read())

        st.video(temp_path)

        if st.button("Analyze"):
            with st.spinner("Analyzing... this may take a minute"):
                result = full_analysis(temp_path)

            st.subheader(f"Verdict: {result['final_verdict']}")
            st.write(f"**Video fake score:** {result['video_fake_score']}")
            st.write(f"**Audio fake score:** {result['audio_fake_score']}")
            st.write(f"**Flagged frames:** {result['flagged_frames']}")

elif input_type == "Audio only":
    uploaded_audio = st.file_uploader("Upload audio", type=["wav", "mp3"])

    if uploaded_audio is not None:
        temp_audio_path = os.path.join(TEMP_DIR, "temp_audio.wav")
        with open(temp_audio_path, "wb") as f:
            f.write(uploaded_audio.read())

        st.audio(temp_audio_path)

        if st.button("Analyze Audio"):
            with st.spinner("Analyzing audio..."):
                prediction = analyze_audio_direct(temp_audio_path)

            top_pred = max(prediction, key=lambda x: x["score"])
            verdict = "FAKE" if top_pred["label"].lower() == "fake" else "REAL"

            st.subheader(f"Verdict: {verdict}")
            st.write(f"**Confidence:** {round(top_pred['score'], 3)}")
            st.write(f"**Full breakdown:** {prediction}")

else:  # Image only
    uploaded_image = st.file_uploader("Upload image", type=["jpg", "jpeg", "png"])

    if uploaded_image is not None:
        temp_image_path = os.path.join(TEMP_DIR, "temp_image.jpg")
        with open(temp_image_path, "wb") as f:
            f.write(uploaded_image.read())

        st.image(temp_image_path)

        if st.button("Analyze Image"):
            with st.spinner("Analyzing image..."):
                prediction = analyze_image_direct(temp_image_path)

            top_pred = max(prediction, key=lambda x: x["score"])
            verdict = "FAKE" if top_pred["label"].lower() in ["fake", "deepfake"] else "REAL"

            st.subheader(f"Verdict: {verdict}")
            st.write(f"**Confidence:** {round(top_pred['score'], 3)}")
            st.write(f"**Full breakdown:** {prediction}")
