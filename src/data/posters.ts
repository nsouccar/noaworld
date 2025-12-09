export type Wall = 'back' | 'left' | 'right' | 'front'

export interface Poster {
  id: string
  title: string
  image: string
  wall: Wall // which wall to place on
  position: [number, number] // [horizontal, vertical] position on the wall
  width?: number // optional custom width (default 0.4)
  height?: number // optional custom height (default 0.5)
  externalUrl?: string
}

export const posters: Poster[] = [
  {
    id: 'girl-pictures',
    title: 'Girl Pictures',
    image: '/textures/girlspic.jpg',
    wall: 'back',
    position: [-1.3, 1.7], // above the monitors
    width: 1.0,
    height: 1.1,
    externalUrl: 'https://www.justinekurland.com/work/girl-pictures-19972002',
  },
  {
    id: 'new-lows',
    title: 'Climbing To New Lows',
    image: '/textures/newlows.jpg',
    wall: 'left',
    position: [0, 1.5],
    width: 0.6,
    height: 0.6,
    externalUrl: 'https://www.youtube.com/watch?v=dJ2LZt6hX7M',
  },
  {
    id: 'david-sorrenti',
    title: 'David Sorrenti',
    image: '/textures/sorrenti.jpg',
    wall: 'back',
    position: [1.2, 1.7], // above the bed
    width: 1.2,
    height: 0.8,
    externalUrl: 'https://www.flaunt.com/blog/see-know-evil-davide-sorrenti',
  },
  {
    id: 'hell-is-a-teenage-girl',
    title: 'Hell is a Teenage Girl',
    image: '/textures/band1.png',
    wall: 'left',
    position: [-1.0, 1.5], // closer to monitors than new-lows
    width: 0.6,
    height: 0.6,
    externalUrl: 'https://open.spotify.com/artist/6SIY1EaHYUWRXVn3Po1lxg',
  },
  {
    id: 'raccoon-hospital',
    title: 'Raccoon Hospital',
    image: '/textures/band2.png',
    wall: 'right',
    position: [-1.5, 1.5], // directly above the bed
    width: 0.9,
    height: 0.9,
    externalUrl: 'https://open.spotify.com/artist/0DniROsUAgyZmEj3tVNeT1',
  },
]
