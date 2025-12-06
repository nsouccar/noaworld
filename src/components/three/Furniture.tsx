import { useEffect } from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { books, type Book } from '../../data/books'

// Monitor component - thin display with bezel and stand
function Monitor({ position }: { position: [number, number, number] }) {
  const screenWidth = 0.6
  const screenHeight = 0.38
  const bezelThickness = 0.015
  const screenDepth = 0.02

  return (
    <group position={position}>
      {/* Monitor bezel/frame */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[screenWidth + bezelThickness * 2, screenHeight + bezelThickness * 2, screenDepth]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, screenDepth / 2 + 0.001]}>
        <planeGeometry args={[screenWidth, screenHeight]} />
        <meshStandardMaterial color="#111111" emissive="#222233" emissiveIntensity={0.3} />
      </mesh>

      {/* Stand neck */}
      <mesh position={[0, -screenHeight / 2 - 0.05, -0.02]}>
        <boxGeometry args={[0.03, 0.1, 0.03]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Stand base */}
      <mesh position={[0, -screenHeight / 2 - 0.1, 0.02]}>
        <boxGeometry args={[0.15, 0.01, 0.1]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

// MacBook component - laptop with angled screen
function MacBook({ position }: { position: [number, number, number] }) {
  const baseWidth = 0.45
  const baseDepth = 0.3
  const baseHeight = 0.015
  const screenWidth = 0.42
  const screenHeight = 0.27
  const screenAngle = -Math.PI * 0.35 // Tilted back ~63 degrees

  return (
    <group position={position}>
      {/* Laptop base (keyboard area) */}
      <mesh position={[0, baseHeight / 2, 0]}>
        <boxGeometry args={[baseWidth, baseHeight, baseDepth]} />
        <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Keyboard area (darker inset) */}
      <mesh position={[0, baseHeight + 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[baseWidth * 0.85, baseDepth * 0.6]} />
        <meshStandardMaterial color="#333333" />
      </mesh>

      {/* Screen housing */}
      <group position={[0, baseHeight, -baseDepth / 2]} rotation={[screenAngle, 0, 0]}>
        <mesh position={[0, screenHeight / 2 + 0.01, 0]}>
          <boxGeometry args={[baseWidth, screenHeight + 0.02, 0.005]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Screen */}
        <mesh position={[0, screenHeight / 2 + 0.01, 0.003]}>
          <planeGeometry args={[screenWidth, screenHeight]} />
          <meshStandardMaterial color="#111111" emissive="#222233" emissiveIntensity={0.3} />
        </mesh>
      </group>
    </group>
  )
}

// Equipment positioned on desk surface
function DeskEquipment() {
  return (
    <group position={[1.0, 0.7, 0.2]}>
      {/* Left monitor */}
      <Monitor position={[-0.35, 0.22, 0]} />

      {/* Right monitor */}
      <Monitor position={[0.35, 0.22, 0]} />

      {/* MacBook in center, slightly forward */}
      <group position={[0, 0.04, 0.5]} rotation={[0, Math.PI / 8, 0]}>
        <MacBook position={[0, 0, 0]} />
      </group>
    </group>
  )
}

export function Desk() {
  const { scene } = useGLTF('/objects/desk.glb')

  return (
    <group position={[-2.3, 0, -2.4]}>
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
      <DeskEquipment />
    </group>
  )
}

export function Bed() {
  const { scene } = useGLTF('/objects/gothic-bed.glb')
  const metalTexture = useTexture('/textures/metal.jpg')

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({
          map: metalTexture,
          metalness: 0.8,
          roughness: 0.3,
        })
      }
    })
  }, [scene, metalTexture])

  return (
    <group position={[1.2, 0, -1.5]}>
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  )
}

export function SleepingDog() {
  const { scene } = useGLTF('/objects/lev-small.glb')

  return (
    <group position={[0, 0, 0.5]} rotation={[0, Math.PI * 0.3, 0]}>
      <primitive object={scene} scale={0.5} />
    </group>
  )
}

// Single book component
function BookMesh({
  book,
  position
}: {
  book: Book
  position: [number, number, number]
}) {
  const width = book.width || 0.15
  const height = book.height || 0.025 // thickness when lying flat
  const depth = book.depth || 0.2

  // Try to load cover texture, fall back to color
  const coverTexture = book.coverTexture ? useTexture(book.coverTexture) : null

  return (
    <mesh position={position}>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial
        map={coverTexture}
        color={coverTexture ? undefined : (book.color || '#8B4513')}
      />
    </mesh>
  )
}

// Stack of books rendered from data
function BookStack({ position }: { position: [number, number, number] }) {
  if (books.length === 0) return null

  const baseHeight = 0.025 // default book thickness

  return (
    <group position={position}>
      {books.map((book, index) => {
        const bookHeight = book.height || baseHeight
        // Stack books on top of each other
        const yOffset = books
          .slice(0, index)
          .reduce((sum, b) => sum + (b.height || baseHeight), 0) + bookHeight / 2

        return (
          <BookMesh
            key={book.id}
            book={book}
            position={[0, yOffset, 0]}
          />
        )
      })}
    </group>
  )
}

// Simple metal nightstand
export function Nightstand() {
  const metalTexture = useTexture('/textures/metal.jpg')

  const width = 0.4
  const depth = 0.35
  const height = 0.5
  const legThickness = 0.04
  const topThickness = 0.03

  return (
    <group position={[0.3, 0, -2.3]}>
      {/* Tabletop */}
      <mesh position={[0, height, 0]}>
        <boxGeometry args={[width, topThickness, depth]} />
        <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Legs */}
      {/* Front left */}
      <mesh position={[-width/2 + legThickness/2, height/2, depth/2 - legThickness/2]}>
        <boxGeometry args={[legThickness, height, legThickness]} />
        <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Front right */}
      <mesh position={[width/2 - legThickness/2, height/2, depth/2 - legThickness/2]}>
        <boxGeometry args={[legThickness, height, legThickness]} />
        <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Back left */}
      <mesh position={[-width/2 + legThickness/2, height/2, -depth/2 + legThickness/2]}>
        <boxGeometry args={[legThickness, height, legThickness]} />
        <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Back right */}
      <mesh position={[width/2 - legThickness/2, height/2, -depth/2 + legThickness/2]}>
        <boxGeometry args={[legThickness, height, legThickness]} />
        <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Lower shelf */}
      <mesh position={[0, height * 0.3, 0]}>
        <boxGeometry args={[width - legThickness * 2, topThickness * 0.7, depth - legThickness * 2]} />
        <meshStandardMaterial map={metalTexture} metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Books stacked on top */}
      <BookStack position={[0, height + topThickness / 2, 0]} />
    </group>
  )
}

// Floor lamp with warm lighting
export function Lamp() {
  const { scene } = useGLTF('/objects/lamp.glb')

  return (
    <group position={[1.4, 1.0, -0.5]}>
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
      />
      {/* Warm light emanating from lamp */}
      <pointLight
        position={[0, 1.8, 0]}
        color="#ffaa55"
        intensity={6}
        distance={0}
        decay={1}
      />
    </group>
  )
}

// Preload models
useGLTF.preload('/objects/desk.glb')
useGLTF.preload('/objects/gothic-bed.glb')
useGLTF.preload('/objects/lev-small.glb')
useGLTF.preload('/objects/lamp.glb')

export default function Furniture() {
  return (
    <group>
      <Desk />
      <Bed />
      <Nightstand />
      <SleepingDog />
      <Lamp />
    </group>
  )
}
