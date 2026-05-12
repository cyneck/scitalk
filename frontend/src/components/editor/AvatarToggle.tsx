import { useAvatarStore } from '../../stores/avatarStore'

interface AvatarToggleProps {
  extended?: boolean
}

export default function AvatarToggle({ extended = false }: AvatarToggleProps) {
  const { config, setEnabled, setPosition, setSize } = useAvatarStore()

  return (
    <div className="space-y-3">
      {/* Enable Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setEnabled(!config.enabled)}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            config.enabled ? 'bg-indigo-600' : 'bg-gray-600'
          }`}
        >
          <span
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              config.enabled ? 'left-7' : 'left-1'
            }`}
          />
        </button>
        <span className="text-sm text-gray-300">显示数字人</span>
      </div>

      {extended && config.enabled && (
        <div className="space-y-3 pl-4 border-l-2 border-gray-700">
          {/* Position */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">位置</label>
            <div className="flex gap-2">
              {(['bottom-left', 'bottom-right', 'center'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    config.position === pos
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {pos === 'bottom-left' ? '左下' : pos === 'bottom-right' ? '右下' : '居中'}
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div>
            <label className="text-xs text-gray-400 mb-1 block">大小</label>
            <div className="flex gap-2">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setSize(size)}
                  className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                    config.size === size
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}