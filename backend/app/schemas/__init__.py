"""Pydantic schemas"""
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectRead
from app.schemas.slide import SlideCreate, SlideUpdate, SlideRead

__all__ = [
    "ProjectCreate", "ProjectUpdate", "ProjectRead",
    "SlideCreate", "SlideUpdate", "SlideRead",
]