import { useState, useEffect } from 'react';

export function useAircraftDatabase() {
  const [db, setDb] = useState(null);

  useEffect(() => {
    fetch('/aircraft_db.json')
      .then(res => res.json())
      .then(data => {
        console.log("DB erfolgreich geladen! Einträge:", Object.keys(data).length);
        // Trick für die Konsole:
        window.myAircraftDb = data; 
        setDb(data);
      })
      .catch(err => console.error("Fehler beim Laden der lokalen JSON:", err));
  }, []);

  const getInfo = (hex) => {
  if (!db) return null;
  const cleanHex = hex?.toString().trim().toLowerCase();
  const res = db[cleanHex];
  
  if (!res) return null;

  return {
    model: res.t || "N/A",        
    manufacturer: res.m || "N/A", 
    owner: res.o || "N/A"         
  };
};

  return { getInfo, isLoaded: !!db };
}