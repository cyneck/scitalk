"""数据模型"""
from app.models.project import Project, ProjectStatus
from app.models.slide import Slide

__all__ = ["Project", "ProjectStatus", "Slide"]