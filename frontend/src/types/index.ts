// Project types
export interface Project {
  id: string
  name: string
  pptx_path?: string
  avatar_enabled: boolean
  avatar_position: 'bottom-left' | 'bottom-right' | 'center'
  avatar_size: 'small' | 'medium' | 'large'
  voice_config: VoiceConfig
  status: 'draft' | 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export interface VoiceConfig {
  engine: string
  speed: number
  pitch: number
}

// Slide types
export interface Slide {
  id: string
  project_id: string
  index: number
  image_path?: string
  content_text: string
  script: string
  audio_path?: string
  avatar_video_path?: string
  duration_seconds: number
}

// API response types
export interface PPTUploadResponse {
  project_id: string
  filename: string
  slides_count: number
}

export interface ScriptGenerateResponse {
  slide_id: string
  script: string
  estimated_duration: number
}

export interface TTSResponse {
  audio_path: string
  duration: number
}

export interface AvatarResponse {
  video_path: string
  duration: number
}

export interface VideoResponse {
  video_path: string
  duration: number
  file_size: number
}