"""SciTalk 后端服务入口"""
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.api.v1.router import router as api_v1_router

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """应用生命周期管理"""
    # 启动时创建必要的目录
    os.makedirs(settings.ppt_path, exist_ok=True)
    os.makedirs(settings.slides_path, exist_ok=True)
    os.makedirs(settings.audio_path, exist_ok=True)
    os.makedirs(settings.avatar_path, exist_ok=True)
    os.makedirs(settings.video_path, exist_ok=True)

    print(f"SciTalk 后端服务启动完成")
    print(f"存储路径: {settings.storage_path}")

    yield

    # 关闭时清理资源
    print("SciTalk 后端服务关闭")


def create_app() -> FastAPI:
    """创建FastAPI应用"""
    app = FastAPI(
        title=settings.app_name,
        version=settings.app_version,
        description="科普数字人生成平台 - 基于PPT的AI视频生成服务",
        lifespan=lifespan,
    )

    # CORS配置
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # 注册路由
    app.include_router(api_v1_router)

    @app.get("/")
    async def root():
        return {
            "message": "欢迎使用 SciTalk - 科普数字人",
            "version": settings.app_version,
            "docs": "/docs",
        }

    @app.get("/health")
    async def health_check():
        return {"status": "healthy"}

    return app


app = create_app()