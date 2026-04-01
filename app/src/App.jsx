import { useState } from 'react'
import './App.css'
import "maplibre-gl/dist/maplibre-gl.css"
import Map from './components/Map'
import { useAircraft } from './hooks/useAircraft'
import AircraftTable from './components/AircraftTable'
import AircraftDetails from './components/AircraftDetails'
import Header from './components/Header'

import mainBG from './assets/aviation_bg_3b.jpg';


function App() {
  const aircraft = useAircraft();
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAircraft = aircraft.filter((plane) => {
    const callsign = plane[1] ? plane[1].toLowerCase() : "";
    return callsign.includes(searchTerm.toLowerCase());
  });

  const handleSelect = (plane) => {
    if (selectedPlane && selectedPlane[0] === plane[0]) {
      setSelectedPlane(null);
    } else {
      setSelectedPlane(plane);
    }
  };

  return (
    <div 
      className="h-screen flex flex-col bg-cover overflow-hidden"
      style={{ backgroundImage: `url(${mainBG})` }}
    >
      <Header onSearch={setSearchTerm} />

      
      <div className="flex flex-1 w-full overflow-hidden p-5 gap-5">
        
       
        <div className="w-[30%] flex flex-col gap-5">
          <div className="bg-white/20 backdrop-blur-md p-6 rounded-xl shadow-xl border border-white/30">
            <h1 className="text-2xl font-bold text-gray-800 leading-tight">
              European Air Traffic Dashboard
            </h1>
            <p className="text-gray-700 mt-2 font-medium">
              Live aircraft tracked: 
              <span className="text-blue-700 ml-2 text-xl font-bold">
                {aircraft.length}
              </span>
            </p>
          </div>
          
          
        </div>

       
        <div className="w-[70%] flex flex-col gap-5 overflow-hidden">
          
          
          <div className="h-1/3 flex gap-5">
            <div className="w-1/2 bg-white/30 backdrop-blur-md rounded-xl shadow-xl border border-white/30 overflow-hidden">
              <AircraftTable 
                aircraft={filteredAircraft}
                onSelect={handleSelect}
                selectedId={selectedPlane?.[0]}
              />
            </div>
            <div className="w-1/2 bg-white/30 backdrop-blur-md rounded-xl shadow-xl border border-white/30 p-4">
              <AircraftDetails plane={selectedPlane} />
            </div>
          </div>

         
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden">
            <Map 
              aircraft={filteredAircraft}
              selectedPlane={selectedPlane} 
            />
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default App
