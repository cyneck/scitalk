import { create } from 'zustand'
import type { Project, Slide } from '../types'

interface ProjectState {
  currentProject: Project | null
  slides: Slide[]
  isLoading: boolean
  error: string | null

  setCurrentProject: (project: Project | null) => void
  setSlides: (slides: Slide[]) => void
  updateSlide: (slideId: string, data: Partial<Slide>) => void
  setLoading: (isLoading: boolean) => void
  setError: (error: string | null) => void
}

export const useProjectStore = create<ProjectState>((set) => ({
  currentProject: null,
  slides: [],
  isLoading: false,
  error: null,

  setCurrentProject: (project) => set({ currentProject: project }),

  setSlides: (slides) => set({ slides }),

  updateSlide: (slideId, data) => set((state) => ({
    slides: state.slides.map((slide) =>
      slide.id === slideId ? { ...slide, ...data } : slide
    ),
  })),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),
}))