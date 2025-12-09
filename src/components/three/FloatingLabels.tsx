import { Text, Billboard } from '@react-three/drei'
import { hotspots, type Hotspot } from '../../data/hotspots'

interface FloatingLabelsProps {
  onSelectHotspot: (hotspot: Hotspot) => void
  currentHotspotId: string
  isTransitioning: boolean
}

export function FloatingLabels({ onSelectHotspot, currentHotspotId, isTransitioning }: FloatingLabelsProps) {
  const labelsToShow = hotspots.filter(h => h.label && h.labelPosition)

  return (
    <group>
      {labelsToShow.map((hotspot) => {
        const isActive = hotspot.id === currentHotspotId || hotspot.name === hotspots.find(h => h.id === currentHotspotId)?.name
        const isClickable = !isActive && !isTransitioning

        return (
          <Billboard
            key={hotspot.id}
            position={hotspot.labelPosition!.toArray() as [number, number, number]}
            follow={true}
          >
            <Text
              font="/gc-romans-flower-demo/GC Romans Flower.ttf"
              fontSize={0.12}
              color={isActive ? '#ffb6c1' : '#ffffff'}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.008}
              outlineColor="#000000"
              onClick={(e) => {
                if (isClickable) {
                  e.stopPropagation()
                  onSelectHotspot(hotspot)
                }
              }}
              onPointerOver={() => {
                if (isClickable) document.body.style.cursor = 'pointer'
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default'
              }}
            >
              {hotspot.label}
              <meshBasicMaterial color={isActive ? '#ffb6c1' : '#ffffff'} toneMapped={false} />
            </Text>
          </Billboard>
        )
      })}
    </group>
  )
}
