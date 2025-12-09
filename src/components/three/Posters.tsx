import { useState } from 'react'
import { useTexture, Html } from '@react-three/drei'
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
  const [hovered, setHovered] = useState(false)
  const width = poster.width || 0.4
  const height = poster.height || 0.5
  const texture = useTexture(poster.image)

  const config = WALL_CONFIG[poster.wall]
  const position = config.getPosition(poster.position[0], poster.position[1])

  const handleClick = () => {
    if (poster.externalUrl) {
      window.open(poster.externalUrl, '_blank')
    }
  }

  return (
    <group position={position} rotation={config.rotation}>
      <mesh
        onClick={(e) => { e.stopPropagation(); handleClick() }}
        onPointerOver={() => {
          setHovered(true)
          if (poster.externalUrl) document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          setHovered(false)
          document.body.style.cursor = 'default'
        }}
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial
          map={texture}
          emissive={hovered ? '#ffffff' : '#000000'}
          emissiveIntensity={hovered ? 0.15 : 0}
        />
      </mesh>

      {/* Tooltip on hover */}
      {hovered && (
        <Html
          position={[0, height / 2 + 0.1, 0.01]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.85)',
              padding: '8px 12px',
              borderRadius: '4px',
              fontFamily: "'GC Romans Flower', system-ui, sans-serif",
              whiteSpace: 'nowrap',
            }}
          >
            <div style={{ color: '#ffffff', fontSize: '14px' }}>{poster.title}</div>
            {poster.externalUrl && (
              <div style={{ color: '#888', fontSize: '11px', marginTop: '4px' }}>
                click to visit
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
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
