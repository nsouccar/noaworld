import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { songs } from '../../data/songs'

const TARGET_SPIN_SPEED = 3 // Full speed when playing
const SPIN_LERP_FACTOR = 2 // How fast to accelerate/decelerate

export function CDPlayer({
  position = [0, 0, 0] as [number, number, number],
  scale = 1
}: {
  position?: [number, number, number]
  scale?: number
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const cdRef = useRef<THREE.Group>(null)
  const spinSpeedRef = useRef(0) // Current spin speed, starts at 0

  // Load the CD player model
  const { scene } = useGLTF('/objects/cdplayer2.glb')

  // Load the CD model
  const { scene: cdScene } = useGLTF('/objects/cd.glb')

  // Clone CD scene once to avoid re-cloning on every render
  const clonedCd = useMemo(() => cdScene.clone(), [cdScene])

  const currentSong = songs[currentSongIndex]

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio()
    audioRef.current.addEventListener('ended', handleNext)
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleNext)
        audioRef.current.pause()
      }
    }
  }, [])

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.audioFile
      if (isPlaying) {
        audioRef.current.play()
      }
    }
  }, [currentSongIndex])

  // Spin the CD with smooth acceleration/deceleration
  useFrame((_, delta) => {
    if (cdRef.current) {
      // Determine target speed based on play state
      const targetSpeed = isPlaying ? TARGET_SPIN_SPEED : 0

      // Smoothly interpolate current speed toward target
      spinSpeedRef.current = THREE.MathUtils.lerp(
        spinSpeedRef.current,
        targetSpeed,
        delta * SPIN_LERP_FACTOR
      )

      // Apply rotation based on current speed
      cdRef.current.rotation.z += delta * spinSpeedRef.current
    }
  })

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause()
    } else if (audioRef.current && songs.length > 0) {
      audioRef.current.play()
    }
    // Toggle play state (CD will spin even without songs for visual effect)
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (songs.length === 0) return
    setCurrentSongIndex((prev) => (prev + 1) % songs.length)
  }

  const handlePrev = () => {
    if (songs.length === 0) return
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length)
  }

  return (
    <group position={position} scale={scale}>
      {/* CD Player model */}
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />

      {/* Spinning CD - using cd.glb model */}
      <group ref={cdRef} position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <primitive
          object={clonedCd}
          scale={0.5}
        />
      </group>

      {/* Invisible click area for the whole player */}
      <mesh
        position={[0, 0.25, 0]}
        onClick={handlePlayPause}
        onPointerOver={(e) => { document.body.style.cursor = 'pointer'; e.stopPropagation() }}
        onPointerOut={() => { document.body.style.cursor = 'default' }}
      >
        <boxGeometry args={[1, 0.5, 1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Song info display - floating above the player */}
      <Html position={[0, 1, 0]} center>
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: '#00bfff',
            fontFamily: 'monospace',
            fontSize: '12px',
            textAlign: 'center',
            padding: '8px 12px',
            borderRadius: '4px',
            pointerEvents: 'none',
            userSelect: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          {currentSong ? (
            <>
              <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>
                {currentSong.title}
              </div>
              <div style={{ fontSize: '10px', opacity: 0.8 }}>
                {currentSong.artist}
              </div>
              <div style={{ fontSize: '10px', marginTop: '4px' }}>
                {isPlaying ? '▶ Playing' : '⏸ Paused'}
              </div>
            </>
          ) : (
            <div>Click to play</div>
          )}
        </div>
      </Html>

      {/* Previous button - overlaid on model */}
      <Html position={[-0.15, 0.15, 0.35]} center transform occlude>
        <button
          onClick={(e) => { e.stopPropagation(); handlePrev() }}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          ⏮
        </button>
      </Html>

      {/* Play/Pause button - overlaid on model */}
      <Html position={[0, 0.15, 0.35]} center transform occlude>
        <button
          onClick={(e) => { e.stopPropagation(); handlePlayPause() }}
          style={{
            background: 'transparent',
            color: isPlaying ? '#00ff00' : 'white',
            border: 'none',
            width: '28px',
            height: '28px',
            cursor: 'pointer',
            fontSize: '14px',
          }}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </Html>

      {/* Next button - overlaid on model */}
      <Html position={[0.15, 0.15, 0.35]} center transform occlude>
        <button
          onClick={(e) => { e.stopPropagation(); handleNext() }}
          style={{
            background: 'transparent',
            color: 'white',
            border: 'none',
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          ⏭
        </button>
      </Html>
    </group>
  )
}
