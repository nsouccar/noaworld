import { useGLTF } from '@react-three/drei'
import RoomShell from './RoomShell'
import Furniture from './Furniture'
import Posters from './Posters'
import Window from './Window'
import { CDPlayer } from './CDPlayer'

function Guitar() {
  const { scene } = useGLTF('/objects/guitar.glb')
  return (
    <primitive
      object={scene}
      position={[0, 0.1, 0]}
      scale={0.5}
      rotation={[-Math.PI / 2, 0, -Math.PI / 4]}
    />
  )
}

export default function Room() {
  return (
    <group>
      {/* Dim ambient light for nighttime */}
      <ambientLight intensity={0.15} color="#4a5568" />

      {/* Soft moonlight from window direction */}
      <directionalLight
        position={[0, 3, -4]}
        intensity={0.3}
        color="#b0c4de"
      />

      {/* Room structure */}
      <RoomShell />

      {/* Window with moonlight */}
      <Window />

      {/* Furniture */}
      <Furniture />

      {/* Wall posters */}
      <Posters />

      {/* CD Player on the floor */}
      <CDPlayer position={[-1.4, 0.15, -0.5]} scale={0.4} />

      {/* Guitar on floor */}
      <Guitar />
    </group>
  )
}
