"""数字人 API"""
import os
import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.config import get_settings

router = APIRouter(prefix="/avatar")

settings = get_settings()

os.makedirs(settings.avatar_path, exist_ok=True)


class AvatarGenerateRequest(BaseModel):
    """数字人生成请求"""
    audio_path: str
    avatar_style: str = "default"  # default, professional, casual
    position: str = "bottom-right"  # bottom-left, bottom-right, center
    size: str = "medium"  # small, medium, large


class AvatarResponse(BaseModel):
    """数字人响应"""
    video_path: str
    duration: float


@router.post("/generate", response_model=AvatarResponse)
async def generate_avatar(request: AvatarGenerateRequest):
    """基于音频生成数字人视频"""
    # TODO: 实现真实的数字人生成
    # 实际需要调用 MuseTalk 或 LiteAvatar

    avatar_id = str(uuid.uuid4())
    avatar_video_path = Path(settings.avatar_path) / f"{avatar_id}.mp4"

    # 模拟：创建空白视频文件作为占位
    with open(avatar_video_path, "wb") as f:
        f.write(b"\x00" * 1000)

    # 估算时长（从音频路径读取）
    duration = 10.0  # 模拟

    return AvatarResponse(
        video_path=str(avatar_video_path),
        duration=duration,
    )


@router.post("/generate-from-text")
async def generate_avatar_from_text(text: str, avatar_style: str = "default"):
    """直接从文本生成数字人视频（TTS + Avatar）"""
    # TODO: 完整流水线：文本 -> TTS -> Avatar视频
    avatar_id = str(uuid.uuid4())
    return {
        "avatar_id": avatar_id,
        "status": "processing",
        "message": "数字人生成任务已提交",
    }