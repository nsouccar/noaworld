import { useState, useCallback, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useProgress } from '@react-three/drei'
import Room from '../components/three/Room'
import { CameraController } from '../components/three/CameraController'
import { visibleHotspots, defaultHotspot, getHotspotById, type Hotspot } from '../data/hotspots'
import * as THREE from 'three'

// Loading screen component
function LoadingScreen() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (!active && progress === 100) {
      // Fade out after loading complete
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [active, progress])

  if (!visible) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: active ? 'auto' : 'none',
      }}
    >
      <div
        style={{
          width: '200px',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '1px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: '100%',
            background: '#ffb6c1',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>
      <div
        style={{
          fontFamily: "'GC Romans Flower', monospace",
          color: 'rgba(255, 255, 255, 0.5)',
          fontSize: '12px',
          marginTop: '10px',
        }}
      >
        {Math.round(progress)}%
      </div>
    </div>
  )
}

// Intro hotspot - starting outside the room
const introHotspot: Hotspot = {
  id: 'intro',
  name: 'Outside',
  cameraPosition: new THREE.Vector3(0, 1.6, 5),
  lookAt: new THREE.Vector3(0, 1.0, -1.0),
  markerPosition: new THREE.Vector3(0, 0, 0),
  hidden: true,
}

export default function ThreeDRoom() {
  const [isIntro, setIsIntro] = useState(true)
  const [fadeOpacity, setFadeOpacity] = useState(1)
  const [currentHotspot, setCurrentHotspot] = useState<Hotspot>(introHotspot)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSelectHotspot = useCallback((hotspot: Hotspot) => {
    if (hotspot.id === currentHotspot.id || isTransitioning) return
    setIsTransitioning(true)
    setCurrentHotspot(hotspot)
  }, [currentHotspot.id, isTransitioning])

  const autoTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false)

    // If we just finished the intro, mark it complete
    if (isIntro) {
      setIsIntro(false)
      return
    }

    // Check if current hotspot has auto-transition
    if (currentHotspot.autoTransitionTo) {
      const nextHotspot = getHotspotById(currentHotspot.autoTransitionTo)
      if (nextHotspot) {
        const delay = currentHotspot.autoTransitionDelay || 2000
        autoTransitionTimerRef.current = setTimeout(() => {
          setIsTransitioning(true)
          setCurrentHotspot(nextHotspot)
        }, delay)
      }
    }
  }, [currentHotspot, isIntro])

  // Intro sequence: fade in, then walk into the room
  useEffect(() => {
    if (!isIntro) return

    // Start with black screen, fade in over 0.5s
    const fadeInTimer = setTimeout(() => {
      setFadeOpacity(0)
    }, 100)

    // After fade completes, start walking into the room
    const walkInTimer = setTimeout(() => {
      setIsTransitioning(true)
      setCurrentHotspot(defaultHotspot)
    }, 800)

    return () => {
      clearTimeout(fadeInTimer)
      clearTimeout(walkInTimer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Clean up timer on unmount or when hotspot changes
  useEffect(() => {
    return () => {
      if (autoTransitionTimerRef.current) {
        clearTimeout(autoTransitionTimerRef.current)
      }
    }
  }, [currentHotspot])

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{
          position: introHotspot.cameraPosition.toArray() as [number, number, number],
          fov: 50,
        }}
      >
        <CameraController
          hotspot={currentHotspot}
          onTransitionComplete={handleTransitionComplete}
          moveSpeed={2}
          enableHeadBob={true}
        />

        <Room
          onSelectHotspot={handleSelectHotspot}
          currentHotspotId={currentHotspot.id}
          isTransitioning={isTransitioning}
        />

      </Canvas>

      {/* Current location indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: '#ffb6c1',
          padding: '12px 16px',
          borderRadius: '8px',
          fontFamily: "'GC Romans Flower', monospace",
          fontSize: '14px',
        }}
      >
        <div style={{ opacity: 0.7, fontSize: '10px', marginBottom: '4px' }}>
          CURRENT LOCATION
        </div>
        <div>{currentHotspot.name}</div>
      </div>

      {/* Hotspot navigation buttons */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          maxWidth: '300px',
          justifyContent: 'flex-end',
        }}
      >
        {visibleHotspots.map((hotspot) => {
          const isActive = hotspot.id === currentHotspot.id || hotspot.name === currentHotspot.name
          return (
            <button
              key={hotspot.id}
              onClick={() => handleSelectHotspot(hotspot)}
              disabled={isActive || isTransitioning}
              style={{
                background: isActive ? 'rgba(255, 182, 193, 0.3)' : 'rgba(0, 0, 0, 0.7)',
                color: isActive ? '#ffb6c1' : '#ffffff',
                border: isActive ? '1px solid #ffb6c1' : '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 12px',
                borderRadius: '4px',
                fontFamily: "'GC Romans Flower', monospace",
                fontSize: '12px',
                cursor: isActive || isTransitioning ? 'default' : 'pointer',
                opacity: isTransitioning ? 0.5 : 1,
                transition: 'all 0.2s ease',
              }}
            >
              {hotspot.name}
            </button>
          )
        })}
      </div>

      {/* Fade overlay for intro */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          opacity: fadeOpacity,
          transition: 'opacity 0.7s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Loading screen */}
      <LoadingScreen />
    </div>
  )
}
