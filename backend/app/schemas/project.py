"""项目 Schema"""
from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel, Field

from app.models.project import ProjectStatus, AvatarPosition, AvatarSize, VoiceConfig


class ProjectCreateSchema(BaseModel):
    """创建项目请求"""
    name: str = Field(..., min_length=1, max_length=255)


class ProjectUpdateSchema(BaseModel):
    """更新项目请求"""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    avatar_enabled: Optional[bool] = None
    avatar_position: Optional[AvatarPosition] = None
    avatar_size: Optional[AvatarSize] = None
    voice_config: Optional[VoiceConfig] = None


class ProjectResponseSchema(BaseModel):
    """项目响应"""
    id: str
    name: str
    pptx_path: Optional[str] = None
    avatar_enabled: bool = False
    avatar_position: AvatarPosition = AvatarPosition.BOTTOM_RIGHT
    avatar_size: AvatarSize = AvatarSize.MEDIUM
    voice_config: VoiceConfig = Field(default_factory=VoiceConfig)
    status: ProjectStatus = ProjectStatus.DRAFT
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProjectListResponse(BaseModel):
    """项目列表响应"""
    items: List[ProjectResponseSchema]
    total: int