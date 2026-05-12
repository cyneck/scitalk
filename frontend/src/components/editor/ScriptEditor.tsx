import { useState, useEffect } from 'react'
import type { Slide } from '../../types'

interface ScriptEditorProps {
  slide: Slide | undefined
  onUpdate: (script: string) => void
}

export default function ScriptEditor({ slide, onUpdate }: ScriptEditorProps) {
  const [script, setScript] = useState('')

  useEffect(() => {
    if (slide) setScript(slide.script)
  }, [slide])

  if (!slide) return null

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm">讲解脚本 - 第 {slide.index + 1} 张</h3>
        <span className="text-xs text-gray-400">
          约 {Math.round(script.length / 400 * 60)} 秒
        </span>
      </div>
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        onBlur={() => onUpdate(script)}
        className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white
                 placeholder-gray-500 focus:outline-none focus:border-indigo-500 resize-none"
        placeholder="输入讲解脚本..."
      />
      <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
        <span>{script.length} 字符</span>
        <span>风格：教育科普</span>
      </div>
    </div>
  )
}