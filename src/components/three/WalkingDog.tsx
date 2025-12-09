import { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Waypoints: start at front door, walk to desk area, go under desk, disappear behind wall
const WAYPOINTS = [
  new THREE.Vector3(0, 0, 2.0),      // Start: front of room (outside view)
  new THREE.Vector3(-0.5, 0, 0),     // Middle of room
  new THREE.Vector3(-1.3, 0, -1.5),  // Approaching desk
  new THREE.Vector3(-1.3, 0, -2.4),  // Under desk
  new THREE.Vector3(-1.3, 0, -3.5),  // Past the back wall - disappear here
]

// Module-level state to persist across remounts
let hasWalked = false
let savedWaypointIndex = 0
let savedPosition = WAYPOINTS[0].clone()
let savedRotation = Math.PI

export function WalkingDog() {
  const groupRef = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF('/objects/walkingLev.glb')
  const { actions } = useAnimations(animations, scene)

  // Use refs that sync with module-level state to survive remounts
  const waypointIndex = useRef(savedWaypointIndex)
  const currentPos = useRef(savedPosition.clone())
  const currentRotation = useRef(savedRotation)
  const isFinished = useRef(hasWalked)

  // Play walking animation on mount (only if not finished)
  useEffect(() => {
    if (hasWalked) return
    const action = actions['Armature|Unreal Take|baselayer']
    if (action) {
      action.reset().play()
    }
    return () => {
      // Save state when unmounting
      savedWaypointIndex = waypointIndex.current
      savedPosition = currentPos.current.clone()
      savedRotation = currentRotation.current
    }
  }, [actions])

  useFrame((_, delta) => {
    // Check module-level flag directly to avoid stale closure
    if (!groupRef.current || hasWalked || isFinished.current) return

    const targetWaypoint = WAYPOINTS[waypointIndex.current]
    if (!targetWaypoint) return

    const direction = new THREE.Vector3().subVectors(targetWaypoint, currentPos.current)
    const distance = direction.length()

    if (distance > 0.05) {
      const speed = 0.2
      direction.normalize()
      currentPos.current.add(direction.multiplyScalar(speed * delta))

      // Smoothly rotate to face movement direction
      const targetAngle = Math.atan2(direction.x, direction.z)
      const angleDiff = targetAngle - currentRotation.current
      // Normalize angle difference
      const normalizedDiff = Math.atan2(Math.sin(angleDiff), Math.cos(angleDiff))
      currentRotation.current += normalizedDiff * 3 * delta

      groupRef.current.position.copy(currentPos.current)
      groupRef.current.rotation.y = currentRotation.current
    } else {
      // Reached waypoint, move to next
      waypointIndex.current++

      if (waypointIndex.current >= WAYPOINTS.length) {
        // Reached final waypoint - disappear forever
        hasWalked = true
        isFinished.current = true
        const action = actions['Armature|Unreal Take|baselayer']
        if (action) {
          action.stop()
        }
      }
    }
  })

  // Don't render if already walked
  if (hasWalked) return null

  return (
    <group ref={groupRef} position={currentPos.current.toArray()} rotation={[0, currentRotation.current, 0]}>
      <primitive object={scene} scale={150} />
    </group>
  )
}

useGLTF.preload('/objects/walkingLev.glb')
