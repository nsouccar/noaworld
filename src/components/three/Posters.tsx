import { useTexture } from '@react-three/drei'
import { posters, type Poster, type Wall } from '../../data/posters'

// Room dimensions
const ROOM_WIDTH = 4
const ROOM_DEPTH = 5

// Wall positions and rotations
const WALL_CONFIG: Record<Wall, { getPosition: (h: number, v: number) => [number, number, number]; rotation: [number, number, number] }> = {
  back: {
    getPosition: (h, v) => [h, v, -ROOM_DEPTH / 2 + 0.01],
    rotation: [0, 0, 0],
  },
  front: {
    getPosition: (h, v) => [h, v, ROOM_DEPTH / 2 - 0.01],
    rotation: [0, Math.PI, 0],
  },
  left: {
    getPosition: (h, v) => [-ROOM_WIDTH / 2 + 0.01, v, h],
    rotation: [0, Math.PI / 2, 0],
  },
  right: {
    getPosition: (h, v) => [ROOM_WIDTH / 2 - 0.01, v, h],
    rotation: [0, -Math.PI / 2, 0],
  },
}

// Single poster component
function PosterMesh({ poster }: { poster: Poster }) {
  const width = poster.width || 0.4
  const height = poster.height || 0.5
  const texture = useTexture(poster.image)

  const config = WALL_CONFIG[poster.wall]
  const position = config.getPosition(poster.position[0], poster.position[1])

  return (
    <mesh position={position} rotation={config.rotation}>
      <planeGeometry args={[width, height]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}

// Render all posters on walls
export default function Posters() {
  if (posters.length === 0) return null

  return (
    <group>
      {posters.map((poster) => (
        <PosterMesh key={poster.id} poster={poster} />
      ))}
    </group>
  )
}
