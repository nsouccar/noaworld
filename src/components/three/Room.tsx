import RoomShell from './RoomShell'
import Furniture from './Furniture'
import Posters from './Posters'
import Window from './Window'
import { CDPlayer } from './CDPlayer'
import { FloatingLabels } from './FloatingLabels'
import { Guitar } from './Guitar'
import { WalkingDog } from './WalkingDog'
import { type Hotspot } from '../../data/hotspots'

interface RoomProps {
  onSelectHotspot: (hotspot: Hotspot) => void
  currentHotspotId: string
  isTransitioning: boolean
}

export default function Room({ onSelectHotspot, currentHotspotId, isTransitioning }: RoomProps) {
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

      {/* Guitar lying on carpet */}
      <Guitar position={[0, 0.05, -0.5]} rotation={[-Math.PI / 2, 0, 0.3]} scale={0.5} />

      {/* Lev walking in */}
      <WalkingDog />

      {/* Floating labels above hotspots */}
      <FloatingLabels
        onSelectHotspot={onSelectHotspot}
        currentHotspotId={currentHotspotId}
        isTransitioning={isTransitioning}
      />
    </group>
  )
}
