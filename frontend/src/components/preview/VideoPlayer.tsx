import type { Slide } from '../../types'

interface VideoPlayerProps {
  slides: Slide[]
  avatarEnabled: boolean
}

export default function VideoPlayer({ slides, avatarEnabled }: VideoPlayerProps) {
  const currentSlide = slides[0]

  return (
    <div className="aspect-video bg-gray-800 rounded-lg relative overflow-hidden">
      {currentSlide ? (
        <>
          <img
            src={currentSlide.image_path || ''}
            alt="Current slide"
            className="w-full h-full object-contain"
          />
          {avatarEnabled && (
            <div className="absolute bottom-2 right-2 w-24 h-32 bg-gray-900/80 rounded-lg border border-gray-600 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                数字人
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          无预览内容
        </div>
      )}

      {/* Playback Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <div className="flex items-center gap-3">
          <button className="p-1 hover:bg-white/20 rounded transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
          <div className="flex-1 h-1 bg-gray-600 rounded-full">
            <div className="h-full w-0 bg-indigo-500 rounded-full" />
          </div>
          <span className="text-xs text-gray-300">0:00 / 0:00</span>
        </div>
      </div>
    </div>
  )
}