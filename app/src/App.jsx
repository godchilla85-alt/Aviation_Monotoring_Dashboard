import { useState } from 'react'
import './App.css'
import "maplibre-gl/dist/maplibre-gl.css"
import Map from './components/Map'
import { useAircraft } from './hooks/useAircraft'
import AircraftTable from './components/AircraftTable'
import AircraftDetails from './components/AircraftDetails'
import SearchFieldItem from './components/SearchFiled'
import Test from './components/Test'
import mainBG from './assets/aviation_bg_3b.jpg';


function App() {
  const aircraft = useAircraft()

  const [selectedPlane, setSelectedPlane] = useState(null)

  const handleSelect = (plane) => {
  if (selectedPlane && selectedPlane[0] === plane[0]) {
    setSelectedPlane(null); // Abwählen
  } else {
    setSelectedPlane(plane); // Neu auswählen
  }
};

 return (
    <div className="h-screen bg-linear-to-t from-grey-500 to-stone-200 bg-cover"
    style={{ backgroundImage: `url(${mainBG})` }}>

      <div className="w-full h-full flex gap-5">
        <div className="left-column w-1/3 h-full p-5">
            <h1 className="text-2xl font-bold mb-4 mr-5">
        European Air Traffic Dashboard
        <span className='block'>Live aircraft tracked: {aircraft.length}</span>
      </h1>
      <SearchFieldItem></SearchFieldItem>
        </div>
        <div className="right-column w-2/3 h-full flex flex-col p-5 gap-5">
            <div className="h-1/3 w-full flex gap-5">
                <div className="w-1/2 h-full border rounded-xl bg-white/30 overflow-hidden pb-10 backdrop-blur-md shadow-xl">
                    <AircraftTable 
          aircraft={aircraft}
          onSelect={handleSelect}
          selectedId={selectedPlane?.[0]}></AircraftTable>
                </div>
                <div className="w-1/2 h-full  border rounded-xl bg-white/30 backdrop-blur-md shadow-xl">
                    <AircraftDetails plane={selectedPlane}></AircraftDetails>
                </div>
            </div>
            <div className="h-2/3 w-full backdrop-blur-md shadow-xl">
                <Map 
        aircraft={aircraft}
        selectedPlane={selectedPlane} />
            </div>
        </div>
           </div>  
        </div>
  )
}

export default App
