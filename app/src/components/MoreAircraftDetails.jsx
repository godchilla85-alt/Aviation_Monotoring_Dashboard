import { useState, useEffect } from 'react';
import { TbListDetails, TbEngine, TbCalendarStats, TbRadio, TbTrendingUp, TbTrendingDown } from "react-icons/tb";

export function MoreAircraftDetails({ plane, aircraftDb }) {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ziehe Daten aus der lokalen Datenbank
  const staticInfo = (aircraftDb && plane) ? aircraftDb.getInfo(plane[0]) : null;

  // Fetch AirLabs API
  useEffect(() => {
    if (!plane) return;
    
    setFlightData(null);
    setLoading(true);
    let isCurrent = true;

    const fetchRoute = async () => {
      const callsign = plane[1]?.trim();
      if (!callsign) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://airlabs.co/api/v9/flight?flight_icao=${callsign}&api_key=${import.meta.env.VITE_AIRLABS_KEY}`);
        const data = await res.json();
        if (isCurrent && data.response) setFlightData(data.response);
      } catch (e) {
        console.error("AirLabs Fetch Error", e);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchRoute();
    return () => { isCurrent = false; };
  }, [plane]);

  if (!plane) {
    return (
      <div className="flex items-center justify-center h-full bg-white/20 backdrop-blur-md rounded-3xl border border-white/40 min-h-75">
        <div className="text-center opacity-40 italic">
          <p className="text-5xl flex justify-center mb-3"><TbListDetails /></p>
          <p className="text-sm font-medium">Select a flight for technical specs</p>
        </div>
      </div>
    );
  }

  // Details berechnen
  const verticalRate = plane[9] ? Math.round(plane[9] * 196.85) : 0; 
  const aircraftAge = staticInfo?.built ? new Date().getFullYear() - staticInfo.built : null;

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 gap-6">
        <h2 class="text-3xl font-black text-gray-800">Plane Details </h2>
      {/* Type & Airline Details*/}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/40 border border-white/50 p-4 rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase font-black text-blue-500/60 mb-1 flex items-center gap-1">
            <TbEngine /> Aircraft Type
          </p>
          <p className="font-bold text-gray-800 leading-tight">
            {staticInfo?.model || flightData?.aircraft_icao || "Standard Jet"} 
          </p>
          <p className="text-[10px] text-gray-500 mt-1 font-mono">{plane[0].toUpperCase()}</p>
        </div>

        <div className="bg-white/40 backdrop-blur-sm border border-white/50 p-4 rounded-2xl shadow-sm">
          <p className="text-[10px] uppercase font-black text-blue-500/60 mb-1">Airline / Owner</p>
          <p className="font-bold text-gray-800 truncate leading-tight">
            {flightData?.airline_name || staticInfo?.owner || "Private Operator"}
          </p>
          <p className="text-[10px] text-gray-500 mt-1">Reg: {staticInfo?.registration || "N/A"}</p>
        </div>
      </div>

      {/* Technical Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-3 bg-white/40 border border-white/50 p-4 rounded-2xl shadow-sm">
          <div className="p-2 bg-blue-500 rounded-xl text-white text-lg"><TbCalendarStats /></div>
          <div>
            <p className="text-[9px] uppercase font-bold text-gray-400">Age</p>
            <p className="text-sm font-bold text-gray-700">{aircraftAge ? `${aircraftAge} Years` : 'Unknown'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-white/40 border border-white/50 p-4 rounded-2xl shadow-sm">
          <div className="p-2 bg-amber-500 rounded-xl text-white text-lg"><TbRadio /></div>
          <div>
            <p className="text-[9px] uppercase font-bold text-gray-400">Squawk</p>
            <p className="text-sm font-mono font-bold text-gray-700">{plane[14] || '7000'}</p>
          </div>
        </div>
      </div>

      {/* Live Performance Details */}
      <div className="flex justify-between items-center bg-white/40 border border-white/50 p-4 rounded-2xl shadow-sm mt-2">
        <div className="text-center px-2">
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Altitude</p>
          <p className="text-sm font-mono font-bold text-gray-700">{Math.round(plane[7])} m</p>
        </div>

        <div className="h-8 w-px bg-gray-300/50" />

        <div className="text-center px-2">
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">V-Speed</p>
          <p className={`text-sm font-mono font-bold flex items-center gap-1 ${verticalRate > 0 ? 'text-green-600' : verticalRate < 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {verticalRate > 0 ? <TbTrendingUp /> : verticalRate < 0 ? <TbTrendingDown /> : ''}
            {Math.abs(verticalRate)} <span className="text-[9px]">ft/m</span>
          </p>
        </div>

        <div className="h-8 w-px bg-gray-300/50" />

        <div className="text-center px-2">
          <p className="text-[9px] uppercase font-bold text-gray-400 mb-1">Speed</p>
          <p className="text-sm font-mono font-bold text-gray-700">{Math.round(plane[9] * 3.6)} <span className="text-[9px]">km/h</span></p>
        </div>
      </div> 
    </div>
  )
}