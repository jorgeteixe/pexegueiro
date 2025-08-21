import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

interface MillMapProps {
  coordinates: {
    lat: number
    lng: number
  }
  name: string
  location: string
}

const MillMap = ({ coordinates, name, location }: MillMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    // Hide loading placeholder
    const loadingElement = document.querySelector('.mill-map-loading')
    if (loadingElement) {
      ;(loadingElement as HTMLElement).style.display = 'none'
    }

    // Initialize map with zoom controls
    const map = L.map(mapRef.current, {
      zoomControl: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      scrollWheelZoom: true,
      boxZoom: false,
      keyboard: false,
      zoomSnap: 0.5,
      zoomDelta: 0.5,
    }).setView([coordinates.lat, coordinates.lng], 15)

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '',
      maxZoom: 18,
      minZoom: 10,
    }).addTo(map)

    // Add simple red circle marker
    L.circleMarker([coordinates.lat, coordinates.lng], {
      color: '#dc2626',
      fillColor: '#dc2626',
      fillOpacity: 0.8,
      radius: 8,
      weight: 2,
    }).addTo(map)

    mapInstanceRef.current = map

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [coordinates, name, location])

  return (
    <div className="rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
      <div ref={mapRef} className="h-48 w-full"></div>
    </div>
  )
}

export default MillMap
