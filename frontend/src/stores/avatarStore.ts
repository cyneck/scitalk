import { create } from 'zustand'

interface AvatarConfig {
  enabled: boolean
  position: 'bottom-left' | 'bottom-right' | 'center'
  size: 'small' | 'medium' | 'large'
  style: string
}

interface AvatarState {
  config: AvatarConfig

  setEnabled: (enabled: boolean) => void
  setPosition: (position: 'bottom-left' | 'bottom-right' | 'center') => void
  setSize: (size: 'small' | 'medium' | 'large') => void
  setStyle: (style: string) => void
  reset: () => void
}

const defaultConfig: AvatarConfig = {
  enabled: false,
  position: 'bottom-right',
  size: 'medium',
  style: 'default',
}

export const useAvatarStore = create<AvatarState>((set) => ({
  config: defaultConfig,

  setEnabled: (enabled) => set((state) => ({
    config: { ...state.config, enabled },
  })),

  setPosition: (position) => set((state) => ({
    config: { ...state.config, position },
  })),

  setSize: (size) => set((state) => ({
    config: { ...state.config, size },
  })),

  setStyle: (style) => set((state) => ({
    config: { ...state.config, style },
  })),

  reset: () => set({ config: defaultConfig }),
}))