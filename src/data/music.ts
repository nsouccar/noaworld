export interface Track {
  id: string
  title: string
  artist: string
  audioUrl: string
  description?: string
}

export const tracks: Track[] = [
  {
    id: 'issues-with-people',
    title: 'Issues With People',
    artist: 'Raccoon Hospital',
    audioUrl: '/audio/Issues with People.mp3',
  },
  {
    id: 'anthony-didio',
    title: 'Anthony Didio',
    artist: 'Hell is a Teenage Girl',
    audioUrl: '/audio/Anthony DiDio.mp3',
  },
]
