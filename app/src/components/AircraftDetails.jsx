import { useState, useEffect } from 'react';

export default function AircraftDetails({ plane }) {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!plane) {
      setFlightData(null);
      return;
    }

    const fetchRoute = async () => {
      setLoading(true);
      setError(null);
      
      const callsign = plane[1]?.trim();
      if (!callsign) return;
      const apiKey = import.meta.env.VITE_AIRLABS_KEY;

      try {
        const response = await fetch(
          `https://airlabs.co/api/v9/flight?flight_icao=${callsign}&api_key=${apiKey}`
        );
        const data = await response.json();

        if (data.response) {
          setFlightData(data.response);
        } else {
          setError("Keine Routen-Informationen gefunden.");
        }
      } catch (err) {
        setError("Fehler beim Laden der Zusatzdaten.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [plane]);

  if (!plane) return (
    <div className="p-4 text-gray-500 italic bg-white/20 rounded-xl">
      Chose a plane from the flight list.
    </div>
  );

  return (
    <div className="relative h-full flex flex-col p-4">

      {loading && (
        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex items-center justify-center rounded-xl z-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      <header className="mb-4">
        <h2 className="text-2xl font-black text-gray-800 tracking-tight">
          {plane[1] || "N/A"}
        </h2>
        <p className="text-sm text-blue-600 font-semibold">{plane[0].toUpperCase()}</p>
      </header>

      <div className="space-y-4 flex-1 overflow-y-auto">

        <div className="bg-white/50 p-4 rounded-xl border border-white/50 shadow-sm">
          <p className="text-xs font-bold uppercase text-gray-400 mb-2">Route</p>
          {flightData ? (
            <div className="flex items-center justify-between">
              <div className="text-center">
                <span className="text-2xl font-bold">{flightData.dep_iata}</span>
                <p className="text-[10px] text-gray-500">{flightData.dep_name}</p>
              </div>
              <div className="text-blue-400">✈️</div>
              <div className="text-center">
                <span className="text-2xl font-bold">{flightData.arr_iata}</span>
                <p className="text-[10px] text-gray-500">{flightData.arr_name}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500 italic">{error || "Suche Route..."}</p>
          )}
        </div>


        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/40 p-3 rounded-lg border border-white/40">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Type</p>
            <p className="font-bold text-gray-700">{flightData?.aircraft_icao || "Unbekannt"}</p>
          </div>
          <div className="bg-white/40 p-3 rounded-lg border border-white/40">
            <p className="text-[10px] font-bold text-gray-400 uppercase">Airline</p>
            <p className="font-bold text-gray-700 truncate">{flightData?.airline_name || plane[2]}</p>
          </div>
        </div>


        <div className="bg-gray-800/80 text-white p-4 rounded-xl shadow-lg">
           <p className="text-xs font-bold text-gray-400 uppercase mb-2">Live Telemetrie</p>
           <div className="flex justify-between text-sm">
              <span>Height: {Math.round(plane[7])}m</span>
              <span>Speed: {Math.round(plane[9] * 3.6)} km/h</span>
           </div>
        </div>
      </div>
    </div>
  );
}