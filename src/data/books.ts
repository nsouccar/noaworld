export interface Book {
  id: string
  title: string
  author?: string
  coverTexture: string // path to cover image texture
  spineTexture?: string // optional spine texture
  color?: string // fallback color if no texture
  width?: number // optional custom width
  height?: number // optional custom height (thickness when stacked)
  depth?: number // optional custom depth
}

export const books: Book[] = [
  {
    id: 'tomorrow-x3',
    title: 'Tomorrow and Tomorrow and Tomorrow',
    author: 'Gabrielle Zevin',
    coverTexture: '/textures/tommorowtommorowcover.jpg',
    color: '#2B5C8A', // blue fallback matching cover
  },
  {
    id: 'meet-me-bathroom',
    title: 'Meet Me In The Bathroom',
    author: 'Lizzy Goodman',
    coverTexture: '/textures/meetmeinthebathroom.png',
    color: '#1a1a1a', // dark fallback
  },
  {
    id: 'the-nix',
    title: 'The Nix',
    author: 'Nathan Hill',
    coverTexture: '/textures/thenix.png',
    color: '#4a6741', // green fallback
  },
  {
    id: 'we-all-fall-down',
    title: 'We All Fall Down',
    author: 'Nic Sheff',
    coverTexture: '/textures/weallfalldown.png',
    color: '#5c4033', // brown fallback
  },
  {
    id: 'just-kids',
    title: 'Just Kids',
    author: 'Patti Smith',
    coverTexture: '/textures/justkids.png',
    color: '#f5f5dc', // beige fallback
  },
]
