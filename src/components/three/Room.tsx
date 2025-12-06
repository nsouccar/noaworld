import RoomShell from './RoomShell'
import Furniture from './Furniture'
import Posters from './Posters'
import Window from './Window'

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
    </group>
  )
}
