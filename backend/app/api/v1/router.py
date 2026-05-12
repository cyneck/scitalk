"""API v1 路由"""
from fastapi import APIRouter

from app.api.v1 import ppt, project, script, tts, avatar, video

router = APIRouter(prefix="/api/v1")

router.include_router(project.router, prefix="/projects", tags=["projects"])
router.include_router(ppt.router, prefix="/ppt", tags=["ppt"])
router.include_router(script.router, prefix="/script", tags=["script"])
router.include_router(tts.router, prefix="/tts", tags=["tts"])
router.include_router(avatar.router, prefix="/avatar", tags=["avatar"])
router.include_router(video.router, prefix="/video", tags=["video"])