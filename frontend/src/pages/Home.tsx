import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../services/api'

export default function Home() {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  const handleCreateProject = async () => {
    if (!projectName.trim()) return

    setIsCreating(true)
    try {
      const project = await api.createProject(projectName)
      navigate(`/project/${project.id}`)
    } catch (error) {
      console.error('创建项目失败:', error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            SciTalk - 科普数字人
          </h1>
          <span className="text-gray-400 text-sm">PPT 转视频 · AI 驱动</span>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-5xl font-bold">
              将 PPT 变成
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                {' '}科普视频
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              上传你的 PPT，AI 自动生成讲解脚本和语音，
              <br />
              可选择添加数字人个人镜头，轻松制作科普视频。
            </p>
          </div>

          {/* Create Project Card */}
          <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-left text-gray-300 font-medium">
                项目名称
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="输入项目名称..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-xl
                         text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500
                         transition-colors"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
              />
            </div>

            <button
              onClick={handleCreateProject}
              disabled={!projectName.trim() || isCreating}
              className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600
                       text-white font-semibold rounded-xl hover:from-indigo-500 hover:to-purple-500
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isCreating ? '创建中...' : '创建项目'}
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold">PPT 解析</h3>
              <p className="text-gray-500 text-sm">智能提取幻灯片内容</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="font-semibold">AI 配音</h3>
              <p className="text-gray-500 text-sm">高质量中文语音合成</p>
            </div>

            <div className="space-y-2">
              <div className="w-12 h-12 mx-auto bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold">数字人</h3>
              <p className="text-gray-500 text-sm">可选个人镜头增强</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}