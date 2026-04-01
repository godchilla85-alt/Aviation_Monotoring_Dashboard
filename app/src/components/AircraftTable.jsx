
export default function AircraftTable({ aircraft, onSelect, selectedId }) { 
  
  
  const displayData = aircraft || [];

  const handleClick = (plane) => {

    const callsign = plane[1] || "Unknown";
    const icao24 = plane[0];
    
    console.log(`Flug ausgewählt: ${callsign} (ICAO: ${icao24})`);

  };

  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-bold mb-4">Live Flugliste (Top 30)</h2>
      <div className="mt-6 h-full overflow-x-hidden overflow-y-auto"> 
        {displayData.slice(0, 30).map((plane) => (
          <div 
          onClick={() => onSelect(plane)} 
          key={plane[0]} 
          className={`border p-3 mb-2 rounded cursor-pointer transition-all ${
              selectedId === plane[0] 
                ? 'bg-green-100 border-green-500 shadow-md' // Markierung in der Liste
                : 'bg-white hover:bg-gray-100'
            }`}>
            <p><b>Flight:</b> {plane[1] || "Unknown"}</p> 
            <p><b>Country:</b> {plane[2]}</p>
            <p><b>Altitude:</b> {plane[7] ? `${plane[7]}m` : "Ground"}</p>
            <p><b>Velocity:</b> {plane[9] ? `${Math.round(plane[9] * 3.6)} km/h` : "N/A"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}