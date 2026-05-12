# SciTalk - 科普数字人视频生成工具

SciTalk 是一个帮助科普自媒体用户制作视频的工具，类似于 NotebookLM，但基于用户的 PPT 来生成讲解内容，数字人可以选择性出现个人镜头。

## 核心功能

- **PPT 解析** - 上传 PPT，自动提取幻灯片内容和结构
- **脚本生成** - 基于幻灯片内容，使用 LLM 生成讲解脚本
- **语音合成** - 使用 ChatTTS/CosyVoice 生成高质量中文语音
- **数字人生成** - 基于语音生成数字人视频（可选）
- **视频合成** - 将幻灯片、音频、数字人合成为最终视频

## 技术栈

| 层级 | 技术 |
|------|------|
| 前端 | React 18 + Vite + TypeScript + TailwindCSS + Shadcn/ui |
| 后端 | FastAPI + Python 3.11+ |
| 数据库 | PostgreSQL + Redis |
| AI/ML | ChatTTS, CosyVoice, MuseTalk/LiteAvatar, Qwen/ChatGLM |

## 数字人选项

- **个人镜头模式** - 数字人作为小画面出现在角落（如右下角）
- **纯语音模式** - 不显示数字人，只有幻灯片和讲解音频

## 项目结构

```
scitalk/
├── backend/                          # FastAPI 后端
│   ├── app/
│   │   ├── api/v1/                   # API 路由
│   │   │   ├── project.py            # 项目管理
│   │   │   ├── ppt.py                # PPT 上传与解析
│   │   │   ├── script.py             # 脚本生成
│   │   │   ├── tts.py                # 语音合成
│   │   │   ├── avatar.py             # 数字人生成
│   │   │   └── video.py              # 视频合成
│   │   ├── core/                     # 核心配置
│   │   ├── models/                   # 数据模型
│   │   ├── schemas/                  # Pydantic schemas
│   │   ├── services/                 # 业务逻辑
│   │   └── main.py                   # 应用入口
│   ├── tests/
│   ├── Dockerfile                    # Docker 镜像构建
│   ├── requirements.txt
│   └── README.md
├── frontend/                         # React 前端
│   ├── src/
│   ├── public/
│   ├── Dockerfile                    # Docker 镜像构建
│   ├── nginx.conf                    # Nginx 配置
│   ├── package.json
│   └── README.md
├── docker-compose.yml                # Docker Compose 编排
├── README.md
└── CLAUDE.md
```

## 快速开始

### 环境要求

- Docker & Docker Compose
- Node.js 18+ (仅本地开发)
- Python 3.11+ (仅本地开发)

### Docker 部署

```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down
```

服务地址：
- 前端: http://localhost:3000
- 后端 API: http://localhost:8000
- API 文档: http://localhost:8000/docs

### 本地开发

#### 后端

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

#### 前端

```bash
cd frontend
npm install
npm run dev
```

## API 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/v1/ppt/upload` | 上传 PPT |
| GET | `/api/v1/ppt/{id}/slides` | 获取幻灯片 |
| POST | `/api/v1/script/generate` | 生成讲解脚本 |
| POST | `/api/v1/tts/synthesize` | 语音合成 |
| POST | `/api/v1/avatar/generate` | 生成数字人视频 |
| POST | `/api/v1/video/composite` | 合成最终视频 |