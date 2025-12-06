export interface Project {
  id: string
  title: string
  description: string
  image?: string
  liveUrl?: string
  repoUrl?: string
  monitor?: number // which monitor to display on (1, 2, or 3)
}

export const projects: Project[] = [
  // Add your projects here
]
