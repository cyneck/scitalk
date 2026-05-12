"""服务模块"""
from app.services.ppt_analyzer import PPTAnalyzer
from app.services.script_generator import ScriptGenerator
from app.services.tts_service import TTSService
from app.services.avatar_service import AvatarService
from app.services.video_compositor import VideoCompositor

__all__ = [
    "PPTAnalyzer",
    "ScriptGenerator",
    "TTSService",
    "AvatarService",
    "VideoCompositor",
]