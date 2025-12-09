import RoomShell from './RoomShell'
import Furniture from './Furniture'
import Posters from './Posters'
import Window from './Window'
import { CDPlayer } from './CDPlayer'
import { FloatingLabels } from './FloatingLabels'
import { Y2KJeans, Shirt, PinkShoe } from './Guitar'
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
      {/* Dim ambient with greenish tint - enough to see details */}
      <ambientLight intensity={0.12} color="#3a4a3a" />

      {/* Faint cool fill light */}
      <directionalLight
        position={[0, 3, -4]}
        intensity={0.08}
        color="#3a4a4a"
      />

      {/* Warm lamp light - single source */}
      <pointLight
        position={[0, 2.2, -1.5]}
        intensity={1.0}
        color="#d4a55a"
        distance={4}
        decay={2}
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

      {/* Clothes tossed on the floor */}
      <Y2KJeans position={[0.3, 0.02, -0.5]} rotation={[-Math.PI / 2, 0, 0.8]} scale={0.5} />
      <Shirt position={[0.3, 0.1, -1.2]} rotation={[-Math.PI / 2, 0, -0.4]} scale={0.5} />

      {/* Shoes kicked off near the jeans */}
      <PinkShoe position={[-0.2, 0.05, -0.6]} rotation={[0, 0.6, 0]} scale={0.15} />
      <PinkShoe position={[1.0, 0.05, -0.2]} rotation={[Math.PI / 2, 0.3, 0]} scale={0.15} />

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
