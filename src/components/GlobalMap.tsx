import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'

// Custom mill icon
const millIcon = L.divIcon({
  html: `
    <div style="
      background: white;
      border: 2px solid #374151;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    ">⚙</div>
  `,
  className: '',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
  popupAnchor: [0, -12]
})

// Example points with title, description, and a link
const examplePoints: {
  name: string
  description: string
  link: string
  coords: [number, number]
}[] = [
  {
    name: 'Muiño do Rial ou do Codia',
    description: 'Muíño histórico situado no río Rial, un exemplo da arquitectura muiñeira tradicional de Cesantes.',
    link: '#',
    coords: [42.299136, -8.604922],
  },
  {
    name: 'Muiño do Rato',
    description: 'Antigo muíño de rodicio que aproveitaba as augas do río para moer o gran dos veciños.',
    link: '#',
    coords: [42.2983548, -8.6067458],
  },
]

// Example path (just for visualization)
const examplePath: [number, number][] = [
  [42.2996098, -8.6027756],
  [42.2996436, -8.603009],
  [42.2995369, -8.6032444],
  [42.2994065, -8.6034046],
  [42.2992873, -8.6036462],
  [42.2991997, -8.6039093],
  [42.2990882, -8.6044784],
  [42.2991032, -8.6049513],
  [42.2991015, -8.6053822],
  [42.2990345, -8.6060938],
  [42.2989959, -8.6063367],
  [42.2988391, -8.6066081],
  [42.2985733, -8.6068289],
  [42.2982956, -8.6069916],
  [42.2980575, -8.6072955],
  [42.2977243, -8.6075385],
  [42.2970261, -8.6075739],
  [42.2964708, -8.6074729],
  [42.2957965, -8.6075651],
  [42.2954873, -8.6074427],
]

const GlobalMap = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const map = L.map('map', {
      zoomControl: false
    }).setView([42.299136, -8.604922], 15)

    // Add zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add example points with custom icon
    examplePoints.forEach((point) => {
      const marker = L.marker(point.coords, { icon: millIcon }).addTo(map)
      marker.bindPopup(
        `<div style="min-width: 200px; font-family: system-ui, sans-serif;">
          <h3 style="font-weight: bold; font-size: 16px; margin: 0 0 8px 0; color: #111827;">${point.name}</h3>
          <p style="font-size: 14px; color: #6b7280; margin: 0 0 12px 0; line-height: 1.4;">${point.description}</p>
          <a href="${point.link}" style="color: #374151; font-size: 14px; text-decoration: underline; font-weight: 500;">Máis información →</a>
        </div>`,
        {
          className: 'custom-popup'
        }
      )
    })

    // Add example path (polyline) with better styling
    L.polyline(examplePath, { 
      color: '#374151', 
      weight: 3,
      opacity: 0.7,
      dashArray: '5, 5'
    }).addTo(map)

    // Hide loading after map loads
    map.on('load', () => {
      setIsLoading(false)
    })

    // Fallback to hide loading after timeout
    setTimeout(() => setIsLoading(false), 2000)

    return () => {
      map.remove()
    }
  }, [])

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando o mapa...</p>
          </div>
        </div>
      )}
      <div id="map" className="h-full w-full rounded-lg overflow-hidden"></div>
      
      {/* Map Legend */}
      <div className="absolute top-4 left-4 z-20 bg-white rounded-lg shadow-md p-3 text-sm">
        <div className="flex items-center space-x-2 mb-2">
          <div style={{
            background: 'white',
            border: '2px solid #374151',
            borderRadius: '50%',
            width: '16px',
            height: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px'
          }}>⚙</div>
          <span className="text-gray-700">Muíños</span>
        </div>
        <div className="flex items-center space-x-2">
          <div style={{
            width: '20px',
            height: '2px',
            background: '#374151',
            opacity: 0.7,
            backgroundImage: 'repeating-linear-gradient(to right, #374151 0, #374151 5px, transparent 5px, transparent 10px)'
          }}></div>
          <span className="text-gray-700">Sendeiro</span>
        </div>
      </div>
    </div>
  )
}

export default GlobalMap
