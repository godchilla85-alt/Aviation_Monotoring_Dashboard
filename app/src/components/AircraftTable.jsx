
import { RxHeight } from "react-icons/rx";
import { SiSpeedtest } from "react-icons/si";

export default function AircraftTable({ aircraft, onSelect, selectedId }) { 
   
  const displayData = aircraft || [];


if (displayData.length === 0) {
  return (
    <div className="p-6 text-center text-gray-500 italic">
      No aircraft found matching your search.
    </div>
  );
}
  return (
    <div className="p-6 h-full">
      <h2 className="text-xl font-bold mb-4">Live Flight list (Top 50)</h2>
      <div className="mt-6 h-full overflow-x-hidden overflow-y-auto"> 
        {displayData.slice(0, 50).map((plane) => (
          <div 
          onClick={() => onSelect(plane)} 
          key={plane[0]} 
          className={`border p-3 mb-2 rounded cursor-pointer transition-all ${
              selectedId === plane[0] 
                ? 'bg-blue-800 border-sky-500 shadow-md text-white' 
                : 'bg-white hover:bg-sky-100'
            }`}>
            <div className="flex">
            <p><b> {plane[1] || "Unknown"} </b></p> 
            <p className="ml-2 text-gray-400">{plane[2]}</p>
            </div>
            <div className="flex mt-1 gap-4">
              <div className="flex flex-row">
                <p className="pt-1 pr-2 text-gray-400"><RxHeight /></p>
                <p> {plane[7] ? `${plane[7]}m` : "Ground"}</p>
              </div>
              <div className="flex flex-row">
            <p className="pt-1 pr-2 text-gray-400"><SiSpeedtest /></p>
            <p> {plane[9] ? `${Math.round(plane[9] * 3.6)} km/h` : "N/A"}</p>
            </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

