import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css" // Sicherstellen, dass CSS geladen ist
import { transformAircraft } from "../utils/transformAircraft"

export default function Map({ aircraft, selectedPlane }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)

  useEffect(() => {
    // Falls die Map schon existiert, nichts tun
    if (map.current) return

    // Initialisierung
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://demotiles.maplibre.org/style.json",
      center: [10, 50],
      zoom: 4,
    })

    // Warten bis der Style geladen ist
    map.current.on("load", () => {
      console.log("Map Style geladen")
      
      map.current.addSource("aircraft", {
        type: "geojson",
        data: transformAircraft([])
      })

      map.current.addLayer({
        id: "aircraft-layer",
        type: "circle",
        source: "aircraft",
        paint: {
          "circle-radius": 6,
          "circle-color": "#ff5533",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#ffffff"
        }
      })
      
      setIsMapLoaded(true)
    })

    // Cleanup beim Unmount
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  // Daten Update
// In Map.js innerhalb des useEffect für [aircraft, selectedPlane]

useEffect(() => {
  if (!map.current || !isMapLoaded) return;

  const source = map.current.getSource("aircraft");
  if (source) {
    // 1. IMMER die Flugzeuge aktualisieren
    source.setData(transformAircraft(aircraft));
  }

  // 2. Highlight & Zoom Logik
  if (selectedPlane) {
    const highlightData = transformAircraft([selectedPlane]);
    
    if (!map.current.getSource("selected-source")) {
      map.current.addSource("selected-source", { type: "geojson", data: highlightData });
      map.current.addLayer({
        id: "selected-layer",
        type: "circle",
        source: "selected-source",
        paint: {
          "circle-radius": 10,
          "circle-color": "#22c55e",
          "circle-stroke-width": 3,
          "circle-stroke-color": "#ffffff"
        }
      });
    } else {
      map.current.getSource("selected-source").setData(highlightData);
    }

    // Zoom zum Flugzeug
    map.current.flyTo({
      center: [selectedPlane[5], selectedPlane[6]],
      zoom: 5,
      essential: true
    });
  } else {
    // 3. DESELECT: Wenn nichts ausgewählt ist, Layer verstecken und rauszoomen
    if (map.current.getLayer("selected-layer")) {
      // Wir setzen die Daten der Highlight-Source auf leer statt den Layer zu löschen
      map.current.getSource("selected-source").setData(transformAircraft([]));
      
      // Rauszoomen auf Startansicht
      map.current.flyTo({
        center: [10, 50],
        zoom: 4,
        essential: true
      });
    }
  }
}, [aircraft, selectedPlane, isMapLoaded]); // isMapLoaded hinzugefügt!

  return (
    <div className="relative w-full h-full border border-gray-300 rounded-xl overflow-hidden p-5 bg-white/30">
      <div 
        ref={mapContainer} 
        style={{ width: '100%', height: '100%', borderRadius: '10px' }} // WICHTIG: Explizite Angabe
      />
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          Lade Karte...
        </div>
      )}
    </div>
  )
}