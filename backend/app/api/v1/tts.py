"""TTS API"""
import os
import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.config import get_settings

router = APIRouter(prefix="/tts")

settings = get_settings()

os.makedirs(settings.audio_path, exist_ok=True)


class TTSRequest(BaseModel):
    """TTS请求"""
    text: str
    engine: str = "chattts"  # chattts, cosyvoice
    speed: float = 1.0
    pitch: float = 1.0


class TTSResponse(BaseModel):
    """TTS响应"""
    audio_path: str
    duration: float  # 音频时长（秒）


@router.post("/synthesize", response_model=TTSResponse)
async def synthesize_speech(request: TTSRequest):
    """将文本转换为语音"""
    # TODO: 实现真实的TTS合成
    # 实际需要调用 ChatTTS 或 CosyVoice

    audio_id = str(uuid.uuid4())
    audio_path = Path(settings.audio_path) / f"{audio_id}.wav"

    # 模拟：创建空白音频文件作为占位
    # 实际需要调用TTS引擎生成真实音频
    with open(audio_path, "wb") as f:
        # 写入WAV头部的空白数据（模拟）
        f.write(b"RIFF" + b"\x00" * 1000)

    # 估算时长
    char_count = len(request.text)
    duration = char_count / 5  # 简化估算

    return TTSResponse(
        audio_path=str(audio_path),
        duration=duration,
    )


@router.post("/synthesize-batch")
async def synthesize_batch(texts: list[str], engine: str = "chattts"):
    """批量合成语音"""
    results = []
    for text in texts:
        audio_id = str(uuid.uuid4())
        audio_path = Path(settings.audio_path) / f"{audio_id}.wav"

        with open(audio_path, "wb") as f:
            f.write(b"RIFF" + b"\x00" * 1000)

        results.append({
            "text": text,
            "audio_path": str(audio_path),
            "duration": len(text) / 5,
        })

    return {"results": results}