import * as THREE from 'three'

export interface Hotspot {
  id: string
  name: string
  // Camera position when viewing this hotspot
  cameraPosition: THREE.Vector3
  // What the camera looks at
  lookAt: THREE.Vector3
  // Floor position for the clickable marker
  markerPosition: THREE.Vector3
  // Optional floating label above the object
  label?: string
  labelPosition?: THREE.Vector3
  // Optional: auto-transition to another hotspot after arriving
  autoTransitionTo?: string
  autoTransitionDelay?: number // in milliseconds
  // Hide from floor markers (for auto-transition destinations)
  hidden?: boolean
}

// Eye-level height for camera
const EYE_HEIGHT = 1.6

export const hotspots: Hotspot[] = [
  {
    id: 'entrance',
    name: 'Entrance',
    // Standing at the door, looking into the room
    cameraPosition: new THREE.Vector3(0, EYE_HEIGHT, 2.5),
    lookAt: new THREE.Vector3(0, 1.0, -1.0),
    markerPosition: new THREE.Vector3(0, 0.01, 2.3),
  },
  {
    id: 'radio',
    name: 'CD Player',
    // Bird's eye view centered on the CD player
    cameraPosition: new THREE.Vector3(-1.4, 2.0, -0.5),
    lookAt: new THREE.Vector3(-1.4, 0.15, -0.5),
    markerPosition: new THREE.Vector3(-0.8, 0.01, 0.3),
    label: 'My Music',
    labelPosition: new THREE.Vector3(-1.4, 0.8, -0.5),
    // Auto-transition to front view after 2 seconds
    autoTransitionTo: 'radio-front',
    autoTransitionDelay: 2000,
  },
  {
    id: 'radio-front',
    name: 'CD Player',
    // Front view looking at the LCD screen
    cameraPosition: new THREE.Vector3(-1.4, 0.4, 0.4),
    lookAt: new THREE.Vector3(-1.4, 0.15, -0.3),
    markerPosition: new THREE.Vector3(-0.8, 0.01, 0.3),
    hidden: true, // Don't show floor marker for this
  },
  {
    id: 'desk',
    name: 'Desk',
    // Sitting at the desk, looking at the monitors
    cameraPosition: new THREE.Vector3(-1.3, 1.1, -0.8),
    lookAt: new THREE.Vector3(-1.3, 0.9, -2.4),
    markerPosition: new THREE.Vector3(-1.2, 0.01, -1.2),
    label: 'My Projects',
    labelPosition: new THREE.Vector3(-1.3, 1.2, -2.0),
  },
]

export const defaultHotspot = hotspots[0] // Start at the CD player

// Get hotspot by id
export const getHotspotById = (id: string): Hotspot | undefined =>
  hotspots.find(h => h.id === id)

// Get only visible hotspots (for floor markers)
export const visibleHotspots = hotspots.filter(h => !h.hidden)
