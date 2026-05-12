const API_BASE = '/api/v1'

export const api = {
  // Projects
  async createProject(name: string) {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    return res.json()
  },

  async getProjects() {
    const res = await fetch(`${API_BASE}/projects`)
    return res.json()
  },

  async getProject(id: string) {
    const res = await fetch(`${API_BASE}/projects/${id}`)
    return res.json()
  },

  async updateProject(id: string, data: any) {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    return res.json()
  },

  // PPT
  async uploadPPT(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${API_BASE}/ppt/upload`, {
      method: 'POST',
      body: formData,
    })
    return res.json()
  },

  async getSlides(projectId: string) {
    const res = await fetch(`${API_BASE}/ppt/${projectId}/slides`)
    return res.json()
  },

  // Script
  async generateScript(projectId: string, slideContent: string, style: string = 'educational') {
    const res = await fetch(`${API_BASE}/script/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ project_id: projectId, slide_content: slideContent, style }),
    })
    return res.json()
  },

  async updateScript(slideId: string, script: string) {
    const res = await fetch(`${API_BASE}/script/${slideId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script }),
    })
    return res.json()
  },

  // TTS
  async synthesize(text: string, engine: string = 'chattts', speed: number = 1.0) {
    const res = await fetch(`${API_BASE}/tts/synthesize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, engine, speed }),
    })
    return res.json()
  },

  // Avatar
  async generateAvatar(audioPath: string, avatarStyle: string = 'default', position: string = 'bottom-right', size: string = 'medium') {
    const res = await fetch(`${API_BASE}/avatar/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audio_path: audioPath, avatar_style: avatarStyle, position, size }),
    })
    return res.json()
  },

  // Video
  async compositeVideo(
    projectId: string,
    slides: string[],
    audios: string[],
    avatarEnabled: boolean = false,
    avatarPosition: string = 'bottom-right'
  ) {
    const res = await fetch(`${API_BASE}/video/composite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        project_id: projectId,
        slides,
        audios,
        avatar_videos: slides.map(() => null),
        avatar_enabled: avatarEnabled,
        avatar_position: avatarPosition,
      }),
    })
    return res.json()
  },
}