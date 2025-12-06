import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export function SleepingLev({
  position = [0, 0, 0] as [number, number, number],
  scale = 1
}: {
  position?: [number, number, number]
  scale?: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const chestBoneRef = useRef<THREE.Object3D | null>(null)
  const timeRef = useRef(0)

  const { scene } = useGLTF('/objects/walkingLev.glb')

  // Find the chest bone for breathing animation
  useEffect(() => {
    chestBoneRef.current = scene.getObjectByName('chest') || null
  }, [scene])

  // Breathing animation
  useFrame((_, delta) => {
    timeRef.current += delta

    // Subtle breathing - scale the chest slightly
    if (chestBoneRef.current) {
      const breathe = 1 + Math.sin(timeRef.current * 1.5) * 0.03
      chestBoneRef.current.scale.set(breathe, breathe, breathe)
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Rotate to lie on side: roll 90° and adjust orientation */}
      <group rotation={[0, -Math.PI / 2, Math.PI / 2]}>
        <primitive object={scene} />
      </group>
    </group>
  )
}
