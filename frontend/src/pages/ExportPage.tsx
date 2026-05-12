import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function ExportPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)

  const handleExport = async () => {
    if (!projectId) return

    setIsExporting(true)
    setProgress(0)

    try {
      // 模拟导出进度
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 300))
        setProgress(i)
      }

      // 获取生成的视频
      const result = await api.compositeVideo(projectId, [], [], false)
      setVideoUrl(result.video_path)
    } catch (error) {
      console.error('导出失败:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(`/project/${projectId}`)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-xl font-semibold">导出视频</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-xl w-full text-center space-y-8">
          {videoUrl ? (
            <>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">导出完成！</h2>
                <p className="text-gray-400">视频已准备就绪</p>
              </div>

              <div className="bg-gray-900/50 border border-gray-700 rounded-xl overflow-hidden">
                <video
                  src={videoUrl}
                  controls
                  className="w-full aspect-video"
                />
              </div>

              <div className="flex gap-4 justify-center">
                <a
                  href={videoUrl}
                  download
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-500 transition-colors"
                >
                  下载视频
                </a>
                <button
                  onClick={() => navigate(`/project/${projectId}`)}
                  className="px-6 py-3 bg-gray-700 text-white font-medium rounded-xl hover:bg-gray-600 transition-colors"
                >
                  返回编辑
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-indigo-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold">准备导出</h2>
                <p className="text-gray-400">视频将包含所有幻灯片、音频和数字人（如启用）</p>
              </div>

              {isExporting && (
                <div className="space-y-2">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-gray-400 text-sm">导出进度: {progress}%</p>
                </div>
              )}

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600
                         text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500
                         disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isExporting ? '导出中...' : '开始导出'}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}