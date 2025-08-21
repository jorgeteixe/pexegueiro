import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react'

interface Mill {
  slug: string
  name: string
  lugar: string
  coordinates: {
    lat: number
    lng: number
  }
  estado: string
  tipoloxia: string
  firstImage?: {
    src: string
    width: number
    height: number
  } | null
}

interface GlobalMapProps {
  mills: Mill[]
}

const GlobalMap = ({ mills }: GlobalMapProps) => {
  const mapRef = useRef<L.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapContainerRef.current) return

    // Initialize map
    const map = L.map(mapContainerRef.current)
    mapRef.current = map

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Create markers array to fit bounds later
    const markers: L.Marker[] = []

    // Add markers for mills
    mills.forEach((mill) => {
      const marker = L.marker([mill.coordinates.lat, mill.coordinates.lng])
      
      const popupContent = `
        <div style="min-width: 200px; max-width: 280px;">
          ${mill.firstImage ? `
            <div style="margin-bottom: 12px;">
              <img 
                src="${mill.firstImage.src}" 
                alt="${mill.name}" 
                style="width: 100%; height: 120px; object-fit: cover; border-radius: 6px; border: 1px solid #e5e7eb;"
              />
            </div>
          ` : ''}
          <h3 style="font-weight: bold; margin: 0 0 8px 0; color: #1F2937; font-size: 16px;">${mill.name}</h3>
          <div style="margin-bottom: 8px; color: #6B7280; font-size: 14px;">
            <strong>📍 Lugar:</strong> ${mill.lugar}
          </div>
          <div style="margin-bottom: 8px; color: #6B7280; font-size: 14px;">
            <strong>⚙️ Tipoloxía:</strong> ${mill.tipoloxia}
          </div>
          <div style="margin-bottom: 12px; color: #6B7280; font-size: 14px;">
            <strong>📊 Estado:</strong> ${mill.estado}
          </div>
          <a 
            href="/muinos/${mill.slug}" 
            style="color: #3B82F6; text-decoration: none; font-weight: 500; font-size: 14px; display: inline-block; margin-top: 8px;"
          >
            Ver máis información →
          </a>
        </div>
      `
      
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        className: 'custom-popup'
      }).addTo(map)
      
      markers.push(marker)
    })

    // Fit map to show all mills with some padding
    if (markers.length > 0) {
      const group = new L.FeatureGroup(markers)
      map.fitBounds(group.getBounds(), {
        padding: [20, 20]
      })
    } else {
      // Fallback if no mills
      map.setView([42.299136, -8.604922], 15)
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [mills])

  return (
    <div style={{ height: '600px', width: '100%' }}>
      <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}

export default GlobalMap