export interface Song {
  id: string
  title: string
  artist: string
  audioFile: string // path to audio file in /public/audio/
}

export const songs: Song[] = [
  // Add your songs here, e.g.:
  // {
  //   id: 'song-1',
  //   title: 'Song Title',
  //   artist: 'Artist Name',
  //   audioFile: '/audio/song-1.mp3',
  // },
]
