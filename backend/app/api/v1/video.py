"""视频合成 API"""
import os
import uuid
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.config import get_settings

router = APIRouter(prefix="/video")

settings = get_settings()

os.makedirs(settings.video_path, exist_ok=True)


class VideoCompositeRequest(BaseModel):
    """视频合成请求"""
    project_id: str
    slides: list[str]  # 幻灯片图片路径列表
    audios: list[str]  # 对应的音频路径列表
    avatar_videos: list[str | None]  # 数字人视频列表（可选）
    avatar_enabled: bool = False
    avatar_position: str = "bottom-right"
    output_format: str = "mp4"


class VideoResponse(BaseModel):
    """视频响应"""
    video_path: str
    duration: float
    file_size: int


@router.post("/composite", response_model=VideoResponse)
async def composite_video(request: VideoCompositeRequest):
    """合成最终视频"""
    # TODO: 实现真实的视频合成
    # 实际需要使用 FFmpeg 或 MoviePy

    video_id = str(uuid.uuid4())
    output_path = Path(settings.video_path) / f"{video_id}.mp4"

    # 模拟：创建空白视频文件作为占位
    with open(output_path, "wb") as f:
        f.write(b"\x00" * 10000)

    # 估算时长
    total_duration = sum(len(a) / 5 for a in request.audios) if request.audios else 60.0

    return VideoResponse(
        video_path=str(output_path),
        duration=total_duration,
        file_size=1024000,  # 模拟文件大小
    )


@router.post("/composite-progress")
async def composite_with_progress(request: VideoCompositeRequest):
    """带进度的视频合成（长任务）"""
    # TODO: 实现带进度的视频合成
    # 返回任务ID，客户端可以查询进度
    task_id = str(uuid.uuid4())
    return {
        "task_id": task_id,
        "status": "processing",
        "message": "视频合成中，请稍候...",
    }


@router.get("/status/{task_id}")
async def get_video_status(task_id: str):
    """获取视频生成进度"""
    # TODO: 查询任务进度
    return {
        "task_id": task_id,
        "status": "processing",
        "progress": 45,
        "message": "正在合成视频...",
    }