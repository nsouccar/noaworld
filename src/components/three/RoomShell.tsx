import { DoubleSide, RepeatWrapping } from 'three'
import { useTexture } from '@react-three/drei'

// Room dimensions (cozy bedroom size)
const ROOM_WIDTH = 4
const ROOM_DEPTH = 5
const ROOM_HEIGHT = 2.5

// Colors
const CEILING_COLOR = '#333333'

function Floor() {
  const texture = useTexture('/textures/wood-floor.jpg')

  // Make texture repeat across the floor
  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(2, 2.5)

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  )
}

function Carpet() {
  const texture = useTexture('/textures/carpet.jpg')

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0.5]}>
      <planeGeometry args={[2.5, 2]} />
      <meshStandardMaterial map={texture} side={DoubleSide} />
    </mesh>
  )
}

function Walls() {
  const texture = useTexture('/textures/wood-floor.jpg')

  texture.wrapS = texture.wrapT = RepeatWrapping
  texture.repeat.set(2, 1.25)

  return (
    <group>
      {/* Back wall (where posters will go) */}
      <mesh position={[0, ROOM_HEIGHT / 2, -ROOM_DEPTH / 2]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <meshStandardMaterial map={texture} side={DoubleSide} />
      </mesh>

      {/* Front wall (behind camera, with door opening) */}
      <mesh position={[0, ROOM_HEIGHT / 2, ROOM_DEPTH / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
        <meshStandardMaterial map={texture} side={DoubleSide} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_HEIGHT]} />
        <meshStandardMaterial map={texture} side={DoubleSide} />
      </mesh>

      {/* Right wall */}
      <mesh position={[ROOM_WIDTH / 2, ROOM_HEIGHT / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[ROOM_DEPTH, ROOM_HEIGHT]} />
        <meshStandardMaterial map={texture} side={DoubleSide} />
      </mesh>
    </group>
  )
}

export default function RoomShell() {
  return (
    <group>
      {/* Floor */}
      <Floor />

      {/* Carpet */}
      <Carpet />

      {/* Walls */}
      <Walls />

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ROOM_HEIGHT, 0]}>
        <planeGeometry args={[ROOM_WIDTH, ROOM_DEPTH]} />
        <meshStandardMaterial color={CEILING_COLOR} side={DoubleSide} />
      </mesh>
    </group>
  )
}
