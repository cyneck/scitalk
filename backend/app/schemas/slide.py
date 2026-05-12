"""幻灯片 Schema"""
from typing import Optional

from pydantic import BaseModel, Field

from app.models.slide import SlideBase


class SlideResponseSchema(BaseModel):
    """幻灯片响应"""
    id: str
    project_id: str
    index: int
    image_path: Optional[str] = None
    content_text: str = ""
    script: str = ""
    audio_path: Optional[str] = None
    avatar_video_path: Optional[str] = None
    duration_seconds: float = 5.0

    class Config:
        from_attributes = True


class SlideUpdateSchema(BaseModel):
    """更新幻灯片请求"""
    script: Optional[str] = None
    duration_seconds: Optional[float] = None


class SlideListResponse(BaseModel):
    """幻灯片列表响应"""
    items: list[SlideResponseSchema]
    total: int