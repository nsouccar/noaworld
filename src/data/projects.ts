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
  {
    id: 'constellation-of-people',
    title: 'Constellation of People',
    description: 'Mapping twitter communities overtime',
    image: '/textures/cop.png',
    liveUrl: 'https://constellationofpeople.com/',
    monitor: 1,
  },
  {
    id: 'synthchronicity',
    title: 'SYNTHCHRONICITY',
    description: 'Learn how to make your own synths!',
    image: '/textures/synth.png',
    liveUrl: 'https://synthchronicity.io/',
    monitor: 2,
  },
  {
    id: 'settlekit',
    title: 'SettleKit',
    description: 'Designed and built the entire MVP for Antler backed immigration startup.',
    image: '/textures/settlekit.png',
    liveUrl: 'https://settlekit-frontend.vercel.app',
    monitor: 3,
  },
]
