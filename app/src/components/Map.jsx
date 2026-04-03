import { useEffect, useRef, useState } from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { transformAircraft } from "../utils/transformAircraft"

const planeSvg = `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V14L13 9V3.5C13 2.67 12.33 2 11.5 2C10.67 2 10 2.67 10 3.5V9L2 14V16L10 13.5V19L8 20.5V22L11.5 21L15 22V20.5L13 19V13.5L21 16Z" fill="#3b82f6" stroke="white" stroke-width="0.5"/></svg>`;


export default function Map({ aircraft, selectedPlane, onSelectPlane }) {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  
  // Nutze Ref für die Flugzeuge damit die Klick Events auf die aktuellen Daten zugreifen, ohne Effect neu zu laden
  const aircraftRef = useRef(aircraft);
  useEffect(() => {
    aircraftRef.current = aircraft;
  }, [aircraft]);

  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json', 
      center: [10, 50],
      zoom: 4,
    });

    const onMapLoad = () => {
      if (!map.current.getSource("aircraft")) {
        map.current.addSource("aircraft", {
          type: "geojson",
          data: transformAircraft([])
        });
      }

      const blob = new Blob([planeSvg], {type: 'image/svg+xml;charset=utf-8'});
      const url = URL.createObjectURL(blob);
      const img = new Image();
      
      img.onload = () => {
        if (!map.current) return;
        
        if (!map.current.hasImage('airplane')) {
          map.current.addImage('airplane', img);
        }

        if (!map.current.getLayer("aircraft-layer")) {
          map.current.addLayer({
            id: "aircraft-layer",
            type: "symbol",
            source: "aircraft",
            layout: {
              "icon-image": "airplane",
              "icon-size": 0.8,
              "icon-rotate": ["get", "true_track"],
              "icon-rotation-alignment": "map",
              "icon-allow-overlap": true
            }
          });

          // Interaktion für Flugzeug auf Map Hover
          map.current.on('mouseenter', 'aircraft-layer', () => {
            map.current.getCanvas().style.cursor = 'pointer';
          });

          map.current.on('mouseleave', 'aircraft-layer', () => {
            map.current.getCanvas().style.cursor = '';
          });

          map.current.on('click', 'aircraft-layer', (e) => {
            if (e.features.length > 0) {
              const clickedFeature = e.features[0];
              const { icao } = clickedFeature.properties;
              
              // Suche in der aktuellen Ref
              const fullPlaneData = aircraftRef.current.find(p => p[0] === icao);
              if (fullPlaneData && typeof onSelectPlane === 'function') {
                onSelectPlane(fullPlaneData);
              }
            }
          });
        }
        setIsMapLoaded(true);
      };
      img.src = url;
    };

    map.current.on("load", onMapLoad);

    return () => {
      if (map.current) {
        map.current.off("load", onMapLoad);
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || !isMapLoaded) return;

    const source = map.current.getSource("aircraft");
    if (source) {
      source.setData(transformAircraft(aircraft));
    }

    if (selectedPlane) {
      // Zoom-Animation wenn ein Flugzeug ausgewählt wurde
      map.current.flyTo({
        center: [selectedPlane[5], selectedPlane[6]],
        zoom: 7, 
        speed: 1.2,
        essential: true
      });
    } else {
      // Wenn deselektiert wird, zurück zum default
      map.current.flyTo({
        center: [10, 50],
        zoom: 4,
        speed: 0.8,
        essential: true
      });
    }
  }, [aircraft, selectedPlane, isMapLoaded]);

  return (
    <div className="relative w-full h-full min-h-125 bg-slate-100 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
      <div ref={mapContainer} className="w-full h-full" />
      
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-md z-9999">
          <div className="flex flex-col items-center gap-3 p-6 bg-white/80 rounded-2xl shadow-xl">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-black text-blue-600 uppercase tracking-widest animate-pulse">
              Radar Sync...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}