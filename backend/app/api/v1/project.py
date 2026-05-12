"""项目 API"""
import uuid
from typing import Optional

from fastapi import APIRouter, HTTPException, UploadFile, File

from app.models.project import Project, ProjectStatus, AvatarPosition, AvatarSize, VoiceConfig
from app.schemas.project import ProjectCreateSchema, ProjectUpdateSchema, ProjectResponseSchema

router = APIRouter(prefix="/projects")

# 内存存储（后续可替换为数据库）
_projects: dict[str, Project] = {}


@router.post("/", response_model=ProjectResponseSchema)
async def create_project(data: ProjectCreateSchema):
    """创建新项目"""
    project = Project(
        id=str(uuid.uuid4()),
        name=data.name,
        status=ProjectStatus.DRAFT,
    )
    _projects[project.id] = project
    return project


@router.get("/", response_model=list[ProjectResponseSchema])
async def list_projects():
    """获取项目列表"""
    return list(_projects.values())


@router.get("/{project_id}", response_model=ProjectResponseSchema)
async def get_project(project_id: str):
    """获取项目详情"""
    if project_id not in _projects:
        raise HTTPException(status_code=404, detail="项目不存在")
    return _projects[project_id]


@router.patch("/{project_id}", response_model=ProjectResponseSchema)
async def update_project(project_id: str, data: ProjectUpdateSchema):
    """更新项目"""
    if project_id not in _projects:
        raise HTTPException(status_code=404, detail="项目不存在")

    project = _projects[project_id]
    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        if hasattr(project, key):
            setattr(project, key, value)

    return project


@router.delete("/{project_id}")
async def delete_project(project_id: str):
    """删除项目"""
    if project_id not in _projects:
        raise HTTPException(status_code=404, detail="项目不存在")
    del _projects[project_id]
    return {"message": "删除成功"}