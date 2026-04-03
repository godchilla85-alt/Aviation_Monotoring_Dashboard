import { useState, useEffect } from 'react';

export default function AircraftDetails({ plane, aircraftDb }) {
  const [flightData, setFlightData] = useState(null);
  const [loading, setLoading] = useState(false);

console.log(flightData)
  // const staticInfo = (aircraftDb && plane) ? aircraftDb.getInfo(plane[0]) : null;

  const calculateDuration = (startTs, endTs) => {
  if (!startTs || !endTs) return "N/A";


  const diffInSeconds = endTs - startTs;

  if (diffInSeconds <= 0) return "00:00";

  const hours = Math.floor(diffInSeconds / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}h ${formattedMinutes}m`;
};

const departureTs = flightData?.dep_actual_ts;
const arrivalTs = flightData?.arr_estimated_ts;


const totalDuration = calculateDuration(departureTs, arrivalTs);


const nowTs = Math.floor(Date.now() / 1000);
const remainingTime = calculateDuration(nowTs, arrivalTs);

console.log('verbleinde zeit', remainingTime, 'total zeit', totalDuration, plane)

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
        console.error("Route Error", e);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchRoute();
    return () => { isCurrent = false; };
  }, [plane]);


  if (!plane) {
    return (
      <div className="flex items-center justify-center h-full bg-white/20 backdrop-blur-md rounded-3xl border border-white/40">
        <div className="text-center opacity-50 italic">
          <p className="text-4xl mb-2">✈️</p>
          <p>Choose a plane from the flight list</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">

      <div className="flex">
          <h2 className="text-3xl font-black text-gray-800">{plane[1] || "N/A"}</h2>
          <p className="text-3xl text-gray-400 tracking-widest ml-3">{plane[2]}</p>
      </div>

      {/* Live Flight Route Card */}
      <div className="h-full bg-linear-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-xl relative overflow-hidden">
        
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        
        <p className="text-[10px] uppercase font-bold opacity-70 mb-4 tracking-tighter">Live Flight Route</p>
        
       {flightData ? (
        <div>
  <div className="flex justify-between items-center relative z-10">
    <div className="text-center">
    <p className='font-bold'>From</p>
    
      <div className="text-3xl font-black">{flightData.dep_iata}</div>
      <div className="text-[10px] opacity-80 truncate w-24">{flightData.dep_name}</div>
      <p className='text-[10px] truncate font-bold'>{flightData.dep_city}, {flightData.dep_country}</p>
    </div>
    

    <div className="text-center">
    <p className='font-bold'>To</p>
    
      <div className="text-3xl font-black">{flightData.arr_iata}</div>
      
      <div className="text-[10px] opacity-80 truncate w-24">{flightData.arr_name}</div>
      <p className='text-[10px] truncate font-bold'>{flightData.arr_city}, {flightData.arr_country}</p>
    </div>
    
  </div>
  <div className='flex relative mt-5'>
  <div className='h-3 w-3 rounded-full bg-white absolute  top-1.75 left-2'></div>
    <div className="h-0.5 flex-1 mx-4 bg-white/30 relative overflow-hidden rounded-full mt-3">
      <div className="absolute top-0 left-0 h-full w-20 bg-linear-to-r from-transparent via-white to-transparent animate-route-flow" />
      {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xl drop-shadow-md">✈️</div> */}
    </div>

    <div className='h-3 w-3 rounded-full bg-white absolute top-1.75 right-2'></div>
    </div>

  <div className='flex justify-between mt-2'>
        <div className='flex'>
        <p className='font-bold'>{flightData.dep_actual.slice(10)}</p>
        </div>
        <div className='flex'>
        <p className='font-bold'>{totalDuration}</p>
        </div>
        <div className='flex'>
        <p className='font-bold'>{flightData.arr_estimated.slice(10)}</p>
        </div>
    </div>
    </div>
) : (
  /* Zeige an, dass die Flight Daten von AirLabs angefordert wurden */
  <div className="flex flex-col items-center py-2 opacity-60">
    <div className="w-full h-0.5 bg-white/10 mt-4 mb-2 relative overflow-hidden rounded-full">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-pulse" />
    </div>
    <div className="animate-pulse flex gap-2 items-center">
      <span className="text-[10px] uppercase font-bold tracking-widest italic">Requesting Flight Plan...</span>
    </div>
  </div>
)}
      </div>


      
  
    </div>
  );
}