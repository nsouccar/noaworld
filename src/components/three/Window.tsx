// Window component with night sky and moonlight
import { useTexture } from '@react-three/drei'
import { useEffect } from 'react'

const ROOM_DEPTH = 5
const BACK_WALL_Z = -ROOM_DEPTH / 2

export default function Window() {
  const moonTexture = useTexture('/textures/moon.png')

  // Center the texture on the circle
  useEffect(() => {
    moonTexture.center.set(0.5, 0.5)
  }, [moonTexture])
  const windowWidth = 0.8
  const windowHeight = 1.2
  const frameThickness = 0.05
  const frameDepth = 0.08
  const windowX = 0 // centered between posters
  const windowY = 1.4 // eye level

  return (
    <group position={[windowX, windowY, BACK_WALL_Z]}>
      {/* Night sky - emissive plane */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[windowWidth - frameThickness * 2, windowHeight - frameThickness * 2]} />
        <meshStandardMaterial
          color="#0a0a1a"
          emissive="#1a1a3a"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Moon with texture */}
      <mesh position={[0.15, 0.2, 0.02]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial
          map={moonTexture}
          emissive="#ffffee"
          emissiveIntensity={1.0}
        />
      </mesh>

      {/* Window frame - dark wood/metal */}
      {/* Top */}
      <mesh position={[0, windowHeight / 2 - frameThickness / 2, frameDepth / 2]}>
        <boxGeometry args={[windowWidth, frameThickness, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Bottom */}
      <mesh position={[0, -windowHeight / 2 + frameThickness / 2, frameDepth / 2]}>
        <boxGeometry args={[windowWidth, frameThickness, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Left */}
      <mesh position={[-windowWidth / 2 + frameThickness / 2, 0, frameDepth / 2]}>
        <boxGeometry args={[frameThickness, windowHeight, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Right */}
      <mesh position={[windowWidth / 2 - frameThickness / 2, 0, frameDepth / 2]}>
        <boxGeometry args={[frameThickness, windowHeight, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Center vertical divider */}
      <mesh position={[0, 0, frameDepth / 2]}>
        <boxGeometry args={[frameThickness * 0.7, windowHeight - frameThickness * 2, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Center horizontal divider */}
      <mesh position={[0, 0, frameDepth / 2]}>
        <boxGeometry args={[windowWidth - frameThickness * 2, frameThickness * 0.7, frameDepth]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Moonlight casting into room */}
      <pointLight
        position={[0, 0.2, 0.5]}
        color="#b0c4de"
        intensity={0.6}
        distance={4}
        decay={2}
      />
    </group>
  )
}
