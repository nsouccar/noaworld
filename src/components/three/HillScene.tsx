import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTexture, Html } from '@react-three/drei'
import * as THREE from 'three'

interface HillSceneProps {
  onDoorClick: () => void
}

// Infinite scrolling starry sky
function StarrySky() {
  const texture = useTexture('/textures/nightsky2.jpg')
  const offsetRef = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })

  // Configure texture for seamless horizontal wrapping only
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.ClampToEdgeWrapping
  texture.repeat.set(2, 1)

  // Handle mouse/touch events for infinite horizontal scrolling
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true
      lastMouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return

      const deltaX = (e.clientX - lastMouse.current.x) * 0.001

      // Only scroll horizontally (infinite)
      offsetRef.current.x += deltaX

      texture.offset.set(offsetRef.current.x, 0)

      lastMouse.current = { x: e.clientX, y: e.clientY }
    }

    const handleMouseUp = () => {
      isDragging.current = false
    }

    // Handle scroll wheel - horizontal only
    const handleWheel = (e: WheelEvent) => {
      offsetRef.current.x += (e.deltaX + e.deltaY) * 0.0003
      texture.offset.set(offsetRef.current.x, 0)
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('wheel', handleWheel)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [texture])

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[80, 64, 64]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        fog={false}
        color="#ffffff"
      />
    </mesh>
  )
}


// Glowing door
function Door({ onClick }: { onClick: () => void }) {
  const groupRef = useRef<THREE.Group>(null)

  // Subtle floating animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  const handleClick = () => {
    onClick()
  }

  return (
    <group ref={groupRef} position={[0, 0.5, 0]}>
      {/* Door panel */}
      <mesh position={[0, 1, 0]} castShadow onClick={handleClick}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#4a2820" roughness={0.7} />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.35, 1, 0.15]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#c9a227" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Click me sign */}
      <Html position={[0, 2.4, 0.1]} center>
        <div
          style={{
            color: '#ffeecc',
            fontSize: '14px',
            fontFamily: "'GC Romans Flower', system-ui, -apple-system, sans-serif",
            textShadow: '0 0 10px rgba(255,238,204,0.8)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            animation: 'bounce 1.5s ease-in-out infinite',
          }}
        >
          click me!
        </div>
        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-5px); }
            }
          `}
        </style>
      </Html>

      {/* Light emanating from door crack */}
      <pointLight
        position={[0, 1, 0.3]}
        color="#ffeecc"
        intensity={2}
        distance={5}
        decay={2}
      />

    </group>
  )
}

export function HillScene({ onDoorClick }: HillSceneProps) {
  return (
    <>
      {/* Warm ambient light - gives base golden tone */}
      <ambientLight intensity={0.2} color="#aa8866" />

      {/* Main warm light from upper left - creates the golden glow on grass */}
      <directionalLight
        position={[-10, 15, 5]}
        intensity={0.8}
        color="#ffaa66"
        castShadow
      />

      {/* Secondary warm light for more glow */}
      <directionalLight
        position={[0, 10, 10]}
        intensity={0.3}
        color="#ffcc88"
      />

      {/* Subtle cool fill for contrast */}
      <directionalLight
        position={[5, 10, -5]}
        intensity={0.05}
        color="#6688aa"
      />

      {/* Parallax starry sky */}
      <StarrySky />

      {/* The door */}
      <group position={[0, -0.5, -3]} rotation={[0, 0, 0]}>
        <Door onClick={onDoorClick} />
      </group>

      {/* Subtle fog for depth */}
      <fog attach="fog" args={['#0a0812', 15, 60]} />
    </>
  )
}

