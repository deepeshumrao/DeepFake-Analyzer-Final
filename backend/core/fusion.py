"""
Video aur audio dono ke results ko combine karke final verdict deta hai.
Agar audio nahi hai (silent video) toh sirf video score use hota hai.
"""
from config import FAKE_THRESHOLD
from core.video_utils import analyze_video
from core.audio_utils import analyze_audio


def full_analysis(video_path):
    video_results = analyze_video(video_path)
    audio_result = analyze_audio(video_path)

    # ---- Video fake score: average across all flagged frames ----
    fake_scores = [
        pred["score"]
        for r in video_results
        for pred in r["prediction"]
        if pred["label"].lower() in ["fake", "deepfake"]
    ]
    avg_video_fake_score = sum(fake_scores) / len(fake_scores) if fake_scores else 0

    # ---- Audio fake score ----
    audio_available = audio_result is not None
    audio_fake_score = 0
    if audio_available:
        for pred in audio_result:
            if pred["label"].lower() == "fake":
                audio_fake_score = pred["score"]

    # ---- Fusion: dono scores ka average (agar audio available hai) ----
    final_score = (
        (avg_video_fake_score + audio_fake_score) / 2
        if audio_available else avg_video_fake_score
    )
    final_verdict = "FAKE" if final_score > FAKE_THRESHOLD else "REAL"

    flagged_frames = [
        r["frame"] for r in video_results
        if r["prediction"] and r["prediction"][0]["label"].lower() in ["fake", "deepfake"]
    ]

    return {
        "video_fake_score": round(avg_video_fake_score, 3),
        "audio_fake_score": round(audio_fake_score, 3) if audio_available else "N/A (no audio track)",
        "final_verdict": final_verdict,
        "flagged_frames": flagged_frames,
    }
