import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Text } from '@react-three/drei'
import * as THREE from 'three'
import { tracks } from '../../data/music'

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

  const currentTrack = tracks[currentSongIndex]

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
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [currentSongIndex, currentTrack, isPlaying])

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
    } else if (audioRef.current && tracks.length > 0) {
      audioRef.current.play().catch(console.error)
    }
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (tracks.length === 0) return
    setCurrentSongIndex((prev) => (prev + 1) % tracks.length)
  }

  const handlePrev = () => {
    if (tracks.length === 0) return
    setCurrentSongIndex((prev) => (prev - 1 + tracks.length) % tracks.length)
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

      {/* Click area for the whole player */}
      <mesh
        position={[0, 0.25, 0]}
        onClick={(e) => { e.stopPropagation(); handlePlayPause() }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer' }}
        onPointerOut={() => { document.body.style.cursor = 'default' }}
      >
        <boxGeometry args={[1.5, 0.8, 1.5]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* LCD Housing - 3D bezel attached to front of CD player */}
      <group position={[0, 0.15, 0.85]} rotation={[-Math.PI / 6, 0, 0]}>
        {/* Outer housing/bezel */}
        <mesh position={[0, 0, 0.02]}>
          <boxGeometry args={[0.8, 0.35, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.7} />
        </mesh>
        {/* Inner recessed area - the LCD screen with blue backlight effect */}
        <mesh position={[0, 0, 0.045]}>
          <boxGeometry args={[0.7, 0.25, 0.02]} />
          <meshStandardMaterial
            color="#0a2a4a"
            emissive="#003366"
            emissiveIntensity={0.3}
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
      </group>

      {/* LCD Screen content - 3D text anchored to the housing */}
      <group position={[0, 0.15, 0.92]} rotation={[-Math.PI / 6, 0, 0]}>
        {/* Song title */}
        <Text
          font="/ds_digital/DS-DIGI.TTF"
          position={[0, 0.05, 0]}
          fontSize={0.055}
          color="#00ccff"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.65}
          textAlign="center"
        >
          {currentTrack ? currentTrack.title.toUpperCase() : 'NO DISC'}
          <meshBasicMaterial color="#00ccff" toneMapped={false} />
        </Text>

        {/* Artist name */}
        {currentTrack && (
          <Text
            font="/ds_digital/DS-DIGI.TTF"
            position={[0, -0.01, 0]}
            fontSize={0.035}
            color="#0099cc"
            anchorX="center"
            anchorY="middle"
            maxWidth={0.65}
            textAlign="center"
          >
            {currentTrack.artist.toUpperCase()}
            <meshBasicMaterial color="#0099cc" toneMapped={false} />
          </Text>
        )}

        {/* Control row: Prev | Play/Pause | Next */}
        <group position={[0, -0.08, 0]}>
          {/* Previous button */}
          <Text
            font="/ds_digital/DS-DIGI.TTF"
            position={[-0.15, 0, 0.01]}
            fontSize={0.04}
            color="#00ccff"
            anchorX="center"
            anchorY="middle"
            onClick={(e) => { e.stopPropagation(); handlePrev() }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'default' }}
          >
            {'<<'}
            <meshBasicMaterial color="#00ccff" toneMapped={false} />
          </Text>

          {/* Play/Pause button */}
          <Text
            font="/ds_digital/DS-DIGI.TTF"
            position={[0, 0, 0.01]}
            fontSize={0.035}
            color={isPlaying ? '#00ff88' : '#00ccff'}
            anchorX="center"
            anchorY="middle"
            onClick={(e) => { e.stopPropagation(); handlePlayPause() }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'default' }}
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
            <meshBasicMaterial color={isPlaying ? '#00ff88' : '#00ccff'} toneMapped={false} />
          </Text>

          {/* Next button */}
          <Text
            font="/ds_digital/DS-DIGI.TTF"
            position={[0.15, 0, 0.01]}
            fontSize={0.04}
            color="#00ccff"
            anchorX="center"
            anchorY="middle"
            onClick={(e) => { e.stopPropagation(); handleNext() }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'default' }}
          >
            {'>>'}
            <meshBasicMaterial color="#00ccff" toneMapped={false} />
          </Text>
        </group>
      </group>
    </group>
  )
}
