"""项目模型"""
import uuid
from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ProjectStatus(str, Enum):
    """项目状态"""
    DRAFT = "draft"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"


class AvatarPosition(str, Enum):
    """数字人位置"""
    BOTTOM_LEFT = "bottom-left"
    BOTTOM_RIGHT = "bottom-right"
    CENTER = "center"


class AvatarSize(str, Enum):
    """数字人大小"""
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


class VoiceConfig(BaseModel):
    """语音配置"""
    engine: str = "chattts"
    speed: float = 1.0
    pitch: float = 1.0


class ProjectBase(BaseModel):
    """项目基础模型"""
    name: str = Field(..., min_length=1, max_length=255)
    avatar_enabled: bool = False
    avatar_position: AvatarPosition = AvatarPosition.BOTTOM_RIGHT
    avatar_size: AvatarSize = AvatarSize.MEDIUM
    voice_config: VoiceConfig = Field(default_factory=VoiceConfig)


class ProjectCreate(ProjectBase):
    """创建项目"""
    pass


class ProjectUpdate(BaseModel):
    """更新项目"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    avatar_enabled: Optional[bool] = None
    avatar_position: Optional[AvatarPosition] = None
    avatar_size: Optional[AvatarSize] = None
    voice_config: Optional[VoiceConfig] = None


class Project(ProjectBase):
    """项目模型"""
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    pptx_path: Optional[str] = None
    status: ProjectStatus = ProjectStatus.DRAFT
    created_at: datetime = Field(default_factory=datetime.now)
    updated_at: datetime = Field(default_factory=datetime.now)

    class Config:
        from_attributes = True