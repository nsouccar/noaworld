import { useNavigate } from 'react-router-dom'
import { useState, useCallback, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { HillScene } from '../components/three/HillScene'

export default function Landing() {
  const navigate = useNavigate()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [fadeOpacity, setFadeOpacity] = useState(0)

  const handleDoorClick = useCallback(() => {
    if (isTransitioning) return
    setIsTransitioning(true)

    // Fade to black, then navigate
    setFadeOpacity(1)
    setTimeout(() => {
      navigate('/3d')
    }, 800)
  }, [isTransitioning, navigate])

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#050510' }}>
      <Canvas
        camera={{
          position: [3, 1.5, 6],
          fov: 55,
        }}
        shadows
      >
        <Suspense fallback={null}>
          <HillScene onDoorClick={handleDoorClick} />
        </Suspense>

        {/* Film grain and vignette effects */}
        <EffectComposer>
          <Noise
            blendFunction={BlendFunction.OVERLAY}
            opacity={1}
          />
          <Vignette
            offset={0.2}
            darkness={0.9}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>

      {/* Fade overlay for transition */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000',
          opacity: fadeOpacity,
          transition: 'opacity 0.7s ease-in',
          pointerEvents: 'none',
        }}
      />

    </div>
  )
}
