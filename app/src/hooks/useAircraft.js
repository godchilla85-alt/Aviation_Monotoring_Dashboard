import { useState, useEffect } from "react";
import { fetchAircraft } from "../services/opensky";
import { MOCK_AIRCRAFT } from "../utils/mockData";

export function useAircraft() {

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

          console.warn("API lieferte keine Daten. Nutze weiterhin Mock-Daten/letzten Stand.");
  
        }
      } catch (err) {
        console.error("Netzwerkfehler beim Laden der Live-Daten:", err);

      }
    }

    load();
    

    const interval = setInterval(load, 30000); 
    
    return () => clearInterval(interval);
  }, []);

  return aircraft;
}