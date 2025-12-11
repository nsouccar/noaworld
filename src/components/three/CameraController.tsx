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
  // Mobile settings
  isMobile?: boolean
}

// Threshold for considering transition "complete"
const POSITION_THRESHOLD = 0.01
const ROTATION_THRESHOLD = 0.01

// Orbit constraint values (must match OrbitControls props below)
const getOrbitConstraints = (isMobile: boolean) => ({
  minPolarAngle: Math.PI * (isMobile ? 0.25 : 0.35),
  maxPolarAngle: Math.PI * (isMobile ? 0.75 : 0.65),
  minAzimuthAngle: -Math.PI * (isMobile ? 0.3 : 0.1),
  maxAzimuthAngle: Math.PI * (isMobile ? 0.3 : 0.1),
})

// Clamp a lookAt target to fit within orbit constraints
// This prevents snap-back when OrbitControls re-enables
function clampLookAtToConstraints(
  cameraPos: THREE.Vector3,
  lookAt: THREE.Vector3,
  isMobile: boolean
): THREE.Vector3 {
  const constraints = getOrbitConstraints(isMobile)

  // Calculate spherical coordinates from camera to lookAt
  const offset = new THREE.Vector3().subVectors(cameraPos, lookAt)
  const spherical = new THREE.Spherical().setFromVector3(offset)

  // Clamp the angles
  spherical.phi = Math.max(constraints.minPolarAngle, Math.min(constraints.maxPolarAngle, spherical.phi))
  spherical.theta = Math.max(constraints.minAzimuthAngle, Math.min(constraints.maxAzimuthAngle, spherical.theta))

  // Convert back to cartesian and compute new lookAt
  const clampedOffset = new THREE.Vector3().setFromSpherical(spherical)
  return new THREE.Vector3().subVectors(cameraPos, clampedOffset)
}

export function CameraController({
  hotspot,
  onTransitionComplete,
  moveSpeed = 2,
  enableHeadBob = true,
  headBobAmount = 0.03,
  headBobSpeed = 8,
  isMobile = false,
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

    // Clamp the lookAt to orbit constraints so we transition directly to the final position
    const clampedLookAt = clampLookAtToConstraints(hotspot.cameraPosition, hotspot.lookAt, isMobile)
    targetLookAtRef.current.copy(clampedLookAt)

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
  }, [hotspot, camera, isMobile])

  // Update FOV based on mobile state
  useEffect(() => {
    if ('fov' in camera) {
      (camera as THREE.PerspectiveCamera).fov = isMobile ? 70 : 50
      ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()
    }
  }, [camera, isMobile])

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
      currentLookAtRef.current.copy(targetLookAtRef.current)
      camera.lookAt(targetLookAtRef.current)

      // Re-enable orbit controls - use saveState to lock in position before enabling
      if (controlsRef.current) {
        controlsRef.current.target.copy(targetLookAtRef.current)
        controlsRef.current.saveState() // Save current position as the "default"
        controlsRef.current.enabled = true
        // Don't call update() - it would recalculate and potentially clamp/snap
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

    // Keep OrbitControls target in sync during transition to prevent snap-back
    if (controlsRef.current) {
      controlsRef.current.target.copy(currentLookAtRef.current)
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false} // Disable panning to keep view centered
      enableZoom={true}
      enableRotate={true}
      rotateSpeed={isMobile ? 0.3 : 0.5}
      zoomSpeed={0.8}
      minDistance={0.5}
      maxDistance={isMobile ? 5 : 4}
      // Limit vertical rotation to prevent looking at ceiling/floor
      maxPolarAngle={Math.PI * 0.55}
      minPolarAngle={Math.PI * 0.4}
      // Limit horizontal rotation to keep focus on the room
      minAzimuthAngle={-Math.PI * 0.15}
      maxAzimuthAngle={Math.PI * 0.15}
      // Touch settings for mobile
      enableDamping={true}
      dampingFactor={0.1}
    />
  )
}
