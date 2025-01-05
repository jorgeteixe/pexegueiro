import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect } from 'react'

// Example points with title, description, and a link
const examplePoints: {
  name: string
  description: string
  link: string
  coords: [number, number]
}[] = [
  {
    name: 'Muiño do Rial ou do Codia',
    description:
      'Descrición de exemplo. Calquera texto pode ir aquí, ou táboa ou o que se considere.',
    link: '#',
    coords: [42.299136, -8.604922],
  },
  {
    name: 'Muiño do Rato',
    description:
      'Descrición de exemplo. Calquera texto pode ir aquí, ou táboa ou o que se considere.',
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
  useEffect(() => {
    const map = L.map('map').setView([42.299136, -8.604922], 15)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Add example points
    examplePoints.forEach((point) => {
      const marker = L.marker(point.coords).addTo(map)
      marker.bindPopup(
        `<div>
          <h3 class="font-bold text-lg">${point.name}</h3>
          <p class="text-sm">${point.description}</p>
          <a href="${point.link}" class="text-blue-500 underline">Máis información</a>
        </div>`
      )
    })

    // Add example path (polyline)
    L.polyline(examplePath, { color: 'blue', weight: 3 }).addTo(map)
  }, [])

  return (
    <div id="map" className="absolute top-0 left-0 w-full h-screen -z-10"></div>
  )
}

export default GlobalMap
