import { useCallback, useState } from 'react'

interface PPTUploaderProps {
  onUpload: (file: File) => void
  isUploading: boolean
}

export default function PPTUploader({ onUpload, isUploading }: PPTUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.name.endsWith('.pptx') || file.name.endsWith('.ppt'))) {
      onUpload(file)
    } else {
      alert('请上传 .pptx 或 .ppt 文件')
    }
  }, [onUpload])

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) onUpload(file)
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl transition-all ${
        isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-gray-600 hover:border-gray-500'
      }`}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pptx,.ppt"
        onChange={handleFileSelect}
        className="hidden"
        id="ppt-upload"
      />
      <label
        htmlFor="ppt-upload"
        className="flex flex-col items-center justify-center py-16 cursor-pointer"
      >
        {isUploading ? (
          <div className="animate-pulse text-gray-400">等待上传...</div>
        ) : (
          <>
            <svg className="w-12 h-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="text-lg font-medium text-gray-300 mt-4">点击或拖拽上传 PPT 文件</span>
            <span className="text-gray-500 text-sm mt-2">支持 .pptx 格式</span>
          </>
        )}
      </label>
    </div>
  )
}