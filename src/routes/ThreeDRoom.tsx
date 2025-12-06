import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsType } from 'three-stdlib'
import * as THREE from 'three'
import Room from '../components/three/Room'

// Room bounds (slightly inset from walls)
// Room is 4x5 with 2.5 height
const BOUNDS = {
  minX: -1.5,
  maxX: 1.5,
  minY: 0.5,
  maxY: 2.2,
  minZ: -2,
  maxZ: 2,
}

function CameraConstraint() {
  const controlsRef = useRef<OrbitControlsType>(null)

  useFrame(({ camera }) => {
    // Clamp camera position to room bounds
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, BOUNDS.minX, BOUNDS.maxX)
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, BOUNDS.minY, BOUNDS.maxY)
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, BOUNDS.minZ, BOUNDS.maxZ)

    // Also clamp the orbit target so it stays in the room
    if (controlsRef.current) {
      const target = controlsRef.current.target
      target.x = THREE.MathUtils.clamp(target.x, BOUNDS.minX, BOUNDS.maxX)
      target.y = THREE.MathUtils.clamp(target.y, BOUNDS.minY, BOUNDS.maxY)
      target.z = THREE.MathUtils.clamp(target.z, BOUNDS.minZ, BOUNDS.maxZ)
    }
  })

  // TEMP: Target the CD player
  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.1}
      maxDistance={3}
      minDistance={0.3}
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={0}
      target={[-1, 0.15, -1]}
    />
  )
}

export default function ThreeDRoom() {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      {/* TEMP: Bird's eye view of CD player at [-1, 0.15, -1] */}
      <Canvas camera={{ position: [-1, 2.2, -1], fov: 50 }}>
        <CameraConstraint />
        <Room />
      </Canvas>
    </div>
  )
}
