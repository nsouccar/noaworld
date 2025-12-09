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
  {
    id: 'justine',
    title: 'Justine',
    artist: 'Hell is a Teenage Girl',
    audioUrl: '/audio/Justine.mp3',
  },
  {
    id: 'in-my-dreams',
    title: 'In My Dreamas',
    artist: 'Raccoon Hospital',
    audioUrl: '/audio/In My Dreams.mp3',
  },
  {
    id: 'meet-me-at-the-mall',
    title: 'Meet Me At The Mall',
    artist: 'Hell is a Teenage Girl',
    audioUrl: '/audio/Meet Me at the Mall.mp3',
  },
  {
    id: 'kiss-the-letter',
    title: 'Kiss the Letter',
    artist: 'Hell is a Teenage Girl',
    audioUrl: '/audio/Kiss the Letter.mp3',
  },
]
