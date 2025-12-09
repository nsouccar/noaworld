import { useState, useCallback, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import Room from '../components/three/Room'
import { CameraController } from '../components/three/CameraController'
import { visibleHotspots, defaultHotspot, getHotspotById, type Hotspot } from '../data/hotspots'

export default function ThreeDRoom() {
  const [currentHotspot, setCurrentHotspot] = useState<Hotspot>(defaultHotspot)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleSelectHotspot = useCallback((hotspot: Hotspot) => {
    if (hotspot.id === currentHotspot.id || isTransitioning) return
    setIsTransitioning(true)
    setCurrentHotspot(hotspot)
  }, [currentHotspot.id, isTransitioning])

  const autoTransitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleTransitionComplete = useCallback(() => {
    setIsTransitioning(false)

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
  }, [currentHotspot])

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
          position: defaultHotspot.cameraPosition.toArray() as [number, number, number],
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
          color: '#00bfff',
          padding: '12px 16px',
          borderRadius: '8px',
          fontFamily: 'monospace',
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
                background: isActive ? 'rgba(0, 191, 255, 0.3)' : 'rgba(0, 0, 0, 0.7)',
                color: isActive ? '#00bfff' : '#ffffff',
                border: isActive ? '1px solid #00bfff' : '1px solid rgba(255, 255, 255, 0.3)',
                padding: '8px 12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
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
    </div>
  )
}
