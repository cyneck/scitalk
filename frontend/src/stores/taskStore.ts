import { create } from 'zustand'

interface Task {
  id: string
  type: 'ppt' | 'script' | 'tts' | 'avatar' | 'video'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  message: string
}

interface TaskState {
  tasks: Task[]

  addTask: (task: Task) => void
  updateTask: (taskId: string, data: Partial<Task>) => void
  removeTask: (taskId: string) => void
  clearTasks: () => void
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],

  addTask: (task) => set((state) => ({
    tasks: [...state.tasks, task],
  })),

  updateTask: (taskId, data) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === taskId ? { ...task, ...data } : task
    ),
  })),

  removeTask: (taskId) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== taskId),
  })),

  clearTasks: () => set({ tasks: [] }),
}))