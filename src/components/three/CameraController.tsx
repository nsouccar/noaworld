import { useRef, useEffect } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { type Hotspot } from '../../data/hotspots'

interface CameraControllerProps {
  hotspot: Hotspot
  onTransitionComplete?: () => void
  // Movement settings
  moveSpeed?: number // How fast to move (0-1, higher = faster)
  enableHeadBob?: boolean // Add subtle vertical bobbing during movement
  headBobAmount?: number // How much to bob (in units)
  headBobSpeed?: number // How fast to bob
}

// Threshold for considering transition "complete"
const POSITION_THRESHOLD = 0.01
const ROTATION_THRESHOLD = 0.01

export function CameraController({
  hotspot,
  onTransitionComplete,
  moveSpeed = 2,
  enableHeadBob = true,
  headBobAmount = 0.03,
  headBobSpeed = 8,
}: CameraControllerProps) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)

  // Track transition state
  const isMovingRef = useRef(false)
  const transitionTimeRef = useRef(0)
  const hasNotifiedComplete = useRef(true)

  // Store target positions
  const targetPositionRef = useRef(new THREE.Vector3())
  const targetLookAtRef = useRef(new THREE.Vector3())

  // For smooth lookAt interpolation, we use a dummy object
  const currentLookAtRef = useRef(new THREE.Vector3())

  // Update targets when hotspot changes
  useEffect(() => {
    targetPositionRef.current.copy(hotspot.cameraPosition)
    targetLookAtRef.current.copy(hotspot.lookAt)
    isMovingRef.current = true
    transitionTimeRef.current = 0
    hasNotifiedComplete.current = false

    // Disable orbit controls during transition
    if (controlsRef.current) {
      controlsRef.current.enabled = false
    }

    // Initialize current lookAt from camera's current direction
    const direction = new THREE.Vector3()
    camera.getWorldDirection(direction)
    currentLookAtRef.current.copy(camera.position).add(direction.multiplyScalar(5))
  }, [hotspot, camera])

  useFrame((_, delta) => {
    if (!isMovingRef.current) return

    transitionTimeRef.current += delta

    // Calculate distance to target
    const positionDistance = camera.position.distanceTo(targetPositionRef.current)
    const lookAtDistance = currentLookAtRef.current.distanceTo(targetLookAtRef.current)

    // Check if we've arrived
    if (positionDistance < POSITION_THRESHOLD && lookAtDistance < ROTATION_THRESHOLD) {
      isMovingRef.current = false
      camera.position.copy(targetPositionRef.current)
      camera.lookAt(targetLookAtRef.current)

      // Re-enable orbit controls and set target
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAtRef.current)
        controlsRef.current.enabled = true
        controlsRef.current.update()
      }

      if (!hasNotifiedComplete.current) {
        hasNotifiedComplete.current = true
        onTransitionComplete?.()
      }
      return
    }

    // Smooth interpolation factor (easeOut feel)
    const lerpFactor = 1 - Math.pow(0.001, delta * moveSpeed)

    // Interpolate position
    camera.position.lerp(targetPositionRef.current, lerpFactor)

    // Add head bob while moving (simulates walking)
    if (enableHeadBob && positionDistance > 0.1) {
      const bobOffset = Math.sin(transitionTimeRef.current * headBobSpeed) * headBobAmount
      camera.position.y += bobOffset
    }

    // Smoothly interpolate lookAt target
    currentLookAtRef.current.lerp(targetLookAtRef.current, lerpFactor)
    camera.lookAt(currentLookAtRef.current)
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      panSpeed={0.5}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      minDistance={0.5}
      maxDistance={5}
      // Limit vertical rotation to prevent flipping
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={Math.PI * 0.05}
    />
  )
}
