import { useState, useEffect } from "react";
import { fetchAircraft } from "../services/opensky";
import { MOCK_AIRCRAFT } from "../utils/mockData";

export function useAircraft() {
  // Wir initialisieren den State direkt mit den Mock-Daten
  const [aircraft, setAircraft] = useState(MOCK_AIRCRAFT);

  useEffect(() => {
    async function load() {
      try {
        console.log("Versuche Live-Daten von OpenSky zu laden...");
        const data = await fetchAircraft();

        if (data && Array.isArray(data.states)) {
          console.log(`Erfolg! ${data.states.length} Live-Flugzeuge geladen.`);
          setAircraft(data.states);
        } else {
          // Falls die API zwar antwortet, aber keine 'states' liefert (z.B. Rate Limit)
          console.warn("API lieferte keine Daten. Nutze weiterhin Mock-Daten/letzten Stand.");
          // Falls aircraft noch leer wäre (was es durch MOCK_AIRCRAFT nicht ist), 
          // könnte man hier explizit nochmal setAircraft(MOCK_AIRCRAFT) setzen.
        }
      } catch (err) {
        console.error("Netzwerkfehler beim Laden der Live-Daten:", err);
        // Im Fehlerfall behalten wir einfach den aktuellen State (der am Anfang Mock ist)
      }
    }

    load();
    
    // Intervall alle 30 Sekunden
    const interval = setInterval(load, 30000); 
    
    return () => clearInterval(interval);
  }, []);

  return aircraft;
}