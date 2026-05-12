import type { Slide } from '../../types'

interface SlidePreviewProps {
  slides: Slide[]
  activeIndex: number
  onSelect: (index: number) => void
}

export default function SlidePreview({ slides, activeIndex, onSelect }: SlidePreviewProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          onClick={() => onSelect(index)}
          className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
            index === activeIndex ? 'border-indigo-500 ring-2 ring-indigo-500/30' : 'border-gray-700 hover:border-gray-600'
          }`}
        >
          {slide.image_path ? (
            <img src={slide.image_path} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
              {index + 1}
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-1">
            <span className="text-xs text-white/80">{index + 1}</span>
          </div>
          {slide.script && (
            <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full" title="已生成脚本" />
          )}
        </button>
      ))}
    </div>
  )
}