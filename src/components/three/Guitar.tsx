import { useGLTF } from '@react-three/drei'

export function Guitar({
  position = [0, 0, 0] as [number, number, number],
  rotation = [0, 0, 0] as [number, number, number],
  scale = 1
}: {
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  const { scene } = useGLTF('/objects/guitar.glb')

  return (
    <primitive
      object={scene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  )
}

useGLTF.preload('/objects/guitar.glb')
