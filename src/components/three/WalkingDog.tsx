import { useRef, useState, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function WalkingDog() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/objects/walkingLev.glb')
  const { actions } = useAnimations(animations, scene)

  const [phase, setPhase] = useState<'walking' | 'stopped'>('walking')

  // Starting position (front wall) and target (back of room)
  const targetPos = useRef(new THREE.Vector3(0, 0, -0.5))
  const currentPos = useRef(new THREE.Vector3(0, 0, 1.5))

  // Play walking animation on mount
  useEffect(() => {
    const action = actions['Armature|Unreal Take|baselayer']
    if (action) {
      action.reset().play()
    }
  }, [actions])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    if (phase === 'walking') {
      const direction = new THREE.Vector3().subVectors(targetPos.current, currentPos.current)
      const distance = direction.length()

      if (distance > 0.05) {
        const speed = 0.3
        direction.normalize()
        currentPos.current.add(direction.multiplyScalar(speed * delta))

        groupRef.current.position.copy(currentPos.current)
      } else {
        setPhase('stopped')
        groupRef.current.position.copy(targetPos.current)

        const action = actions['Armature|Unreal Take|baselayer']
        if (action) {
          action.fadeOut(0.5)
        }
      }
    }
    // Always face the back wall (no turning)
  })

  return (
    <group ref={groupRef} position={[0, 0, 1.5]} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} scale={100} />
    </group>
  )
}

useGLTF.preload('/objects/walkingLev.glb')
