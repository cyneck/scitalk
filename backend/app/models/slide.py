"""幻灯片模型"""
import uuid
from typing import Optional

from pydantic import BaseModel, Field


class SlideBase(BaseModel):
    """幻灯片基础模型"""
    index: int = Field(..., ge=0)
    content_text: str = ""
    script: str = ""
    duration_seconds: float = 5.0


class SlideCreate(SlideBase):
    """创建幻灯片"""
    pass


class SlideUpdate(BaseModel):
    """更新幻灯片"""
    content_text: Optional[str] = None
    script: Optional[str] = None
    duration_seconds: Optional[float] = None


class Slide(SlideBase):
    """幻灯片模型"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    project_id: str
    image_path: Optional[str] = None
    audio_path: Optional[str] = None
    avatar_video_path: Optional[str] = None

    class Config:
        from_attributes = True