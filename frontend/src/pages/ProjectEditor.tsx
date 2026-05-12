import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'
import { useProjectStore } from '../stores/projectStore'
import { useAvatarStore } from '../stores/avatarStore'
import PPTUploader from '../components/upload/PTUploader'
import SlidePreview from '../components/editor/SlidePreview'
import ScriptEditor from '../components/editor/ScriptEditor'
import AvatarToggle from '../components/editor/AvatarToggle'
import VideoPlayer from '../components/preview/VideoPlayer'

export default function ProjectEditor() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { currentProject, setCurrentProject, slides, setSlides, isLoading, setLoading } = useProjectStore()
  const { config: avatarConfig } = useAvatarStore()

  const [activeSlideIndex, setActiveSlideIndex] = useState(0)
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (projectId) {
      loadProject()
    }
  }, [projectId])

  const loadProject = async () => {
    if (!projectId) return
    setLoading(true)
    try {
      const project = await api.getProject(projectId)
      setCurrentProject(project)

      const slidesData = await api.getSlides(projectId)
      setSlides(slidesData)
    } catch (error) {
      console.error('加载项目失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
    if (!projectId) return

    setIsGenerating(true)
    setProgress(10)

    try {
      // 上传 PPT
      const uploadResult = await api.uploadPPT(file)
      setProgress(30)

      // 获取幻灯片
      const slidesData = await api.getSlides(uploadResult.project_id)
      setSlides(slidesData)
      setProgress(60)

      // 生成脚本
      for (let i = 0; i < slidesData.length; i++) {
        const scriptResult = await api.generateScript(
          projectId,
          slidesData[i].content_text,
          'educational'
        )
        slidesData[i].script = scriptResult.script
        setSlides([...slidesData])
        setProgress(60 + (i / slidesData.length) * 30)
      }

      setProgress(100)
    } catch (error) {
      console.error('处理失败:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleScriptUpdate = async (slideId: string, script: string) => {
    await api.updateScript(slideId, script)
  }

  const handleExport = () => {
    navigate(`/export/${projectId}`)
  }

  const handleGenerateVideo = async () => {
    if (!projectId || slides.length === 0) return

    setIsGenerating(true)
    setProgress(0)

    try {
      // 合成语音
      const audios = await Promise.all(
        slides.map((slide) => api.synthesize(slide.script))
      )
      setProgress(40)

      // 合成视频
      const videoResult = await api.compositeVideo(
        projectId,
        slides.map((s) => s.image_path || ''),
        audios.map((a) => a.audio_path),
        avatarConfig.enabled,
        avatarConfig.position
      )
      setProgress(100)

      alert('视频生成完成！')
    } catch (error) {
      console.error('生成视频失败:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-400">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">{currentProject?.name || '项目编辑'}</h1>
          </div>

          <div className="flex items-center gap-4">
            <AvatarToggle />
            <button
              onClick={handleGenerateVideo}
              disabled={slides.length === 0 || isGenerating}
              className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white
                       font-medium rounded-lg hover:from-indigo-500 hover:to-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isGenerating ? '生成中...' : '生成视频'}
            </button>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      {isGenerating && (
        <div className="h-1 bg-gray-800">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
          {/* Left Panel - Slides */}
          <div className="col-span-3 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">幻灯片</h2>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
              {slides.length === 0 ? (
                <p className="text-gray-500 text-center py-8">请上传 PPT 文件</p>
              ) : (
                <SlidePreview
                  slides={slides}
                  activeIndex={activeSlideIndex}
                  onSelect={setActiveSlideIndex}
                />
              )}
            </div>
          </div>

          {/* Center Panel - Preview / Edit */}
          <div className="col-span-6 space-y-4">
            {slides.length === 0 ? (
              <PTUploader onUpload={handleFileUpload} isUploading={isGenerating} />
            ) : (
              <>
                {/* Slide Preview */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                  <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                    {slides[activeSlideIndex]?.image_path ? (
                      <img
                        src={slides[activeSlideIndex].image_path}
                        alt={`Slide ${activeSlideIndex + 1}`}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">幻灯片 {activeSlideIndex + 1}</span>
                    )}
                  </div>
                </div>

                {/* Script Editor */}
                <ScriptEditor
                  slide={slides[activeSlideIndex]}
                  onUpdate={(script) => handleScriptUpdate(slides[activeSlideIndex].id, script)}
                />
              </>
            )}
          </div>

          {/* Right Panel - Avatar Config & Video Preview */}
          <div className="col-span-3 space-y-4">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">数字人设置</h2>
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 space-y-4">
              <AvatarToggle extended />
            </div>

            {slides.length > 0 && (
              <>
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">视频预览</h2>
                <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
                  <VideoPlayer slides={slides} avatarEnabled={avatarConfig.enabled} />
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}