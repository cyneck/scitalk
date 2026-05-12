"""应用配置"""
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """应用配置"""

    app_name: str = "SciTalk - 科普数字人"
    app_version: str = "0.1.0"
    debug: bool = True

    # 数据库
    database_url: str = "sqlite:///./scitalk.db"

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # 存储路径
    storage_path: str = "./storage"
    ppt_path: str = "./storage/ppt"
    slides_path: str = "./storage/slides"
    audio_path: str = "./storage/audio"
    avatar_path: str = "./storage/avatar"
    video_path: str = "./storage/video"

    # AI 配置
    llm_model: str = "qwen"
    tts_engine: str = "chattts"
    avatar_engine: str = "musetalk"

    # CORS
    cors_origins: list[str] = ["http://localhost:3000", "http://localhost:5173"]

    class Config:
        env_file = ".env"
        extra = "allow"


@lru_cache
def get_settings() -> Settings:
    return Settings()