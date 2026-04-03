import { useState } from "react";
import "./App.css";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "./components/Map";
import Header from "./components/Header";
import { useAircraft } from "./hooks/useAircraft";
import AircraftTable from "./components/AircraftTable";
import AircraftDetails from "./components/AircraftDetails";
import { useAircraftDatabase } from "./hooks/useAircraftDatabase";
import { MoreAircraftDetails } from "./components/MoreAircraftDetails";


import { RxHeight } from "react-icons/rx";
import { SiSpeedtest } from "react-icons/si";

import planeIcon from './assets/plane-cutout.png';




function App() {
  const aircraft = useAircraft();
  const [selectedPlane, setSelectedPlane] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const aircraftDb = useAircraftDatabase();

  // Filter-Logik für die Suche
  const filteredAircraft = aircraft.filter((plane) => {
    const callsign = plane[1] ? plane[1].toLowerCase() : "";
    const icao = plane[0] ? plane[0].toLowerCase() : "";
    return (
      callsign.includes(searchTerm.toLowerCase()) ||
      icao.includes(searchTerm.toLowerCase())
    );
  });

  const stats =
    aircraft.length > 0
      ? {
          avgAltitude: Math.round(
            aircraft.reduce((sum, plane) => sum + (plane[7] || 0), 0) /
              aircraft.length,
          ),
          avgVelocity: Math.round(
            (aircraft.reduce((sum, plane) => sum + (plane[9] || 0), 0) /
              aircraft.length) *
              3.6, // Umrechnung m/s in km/h
          ),
          onGroundCount: aircraft.filter((plane) => plane[8]).length,
        }
      : { avgAltitude: 0, avgVelocity: 0, onGroundCount: 0 };

  // Diese Funktion steuert nun die Auswahl von Tabelle UND Karte
  const handleSelect = (plane) => {
    if (selectedPlane && selectedPlane[0] === plane[0]) {
      setSelectedPlane(null); // Deselect
    } else {
      setSelectedPlane(plane); // Select
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-cover bg-linear-to-tl from-stone-100 to-blue-50">
      <Header onSearch={setSearchTerm} />

      <div className="flex flex-1 w-full overflow-hidden p-5 gap-5">
        {/* Linke Spalte (Statistiken) */}
        <div className="w-[30%] flex flex-col gap-5">
          <div className="h-1/5 bg-linear-to-tl from-blue-200 to-blue-800 p-6 rounded-xl shadow-lg border border-white/30 text-white flex flex-col justify-end  relative">
            <img src={planeIcon} alt="Plane" className="absolute w-60 -top-5 -right-4.5"/>
            <p>
              Live aircraft tracked:
              <span className="text-[3em] font-bold block relative bottom-3">
                {aircraft.length}
              </span>
            </p>
            <div className="flex justify-between mt-3">
              <div>
                <p>Avg. Altitude</p>
                <div className="flex flex-row">
                <p className="pt-1 pr-2"><RxHeight /></p>
                <p className="font-bold">{stats.avgAltitude} m</p>
                </div>
              </div>
              <div>
                <p>Avg. Speed</p>
                <div className="flex flex-row">
                <p className="pt-1 pr-2"><SiSpeedtest /></p>
                <p className="font-bold">{stats.avgVelocity} km/h</p>
                </div>
              </div>
              <div>
                <p>Planes on ground</p>
                <p className="font-bold">{stats.onGroundCount}</p>
              </div>
            </div>
            {searchTerm && (
              <p className="text-xs text-gray-500 mt-1 italic">
                Filtering {filteredAircraft.length} results for "{searchTerm}"
              </p>
            )}
          </div>

          <div className="h-4/5 w-full bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/30 overflow-hidden">
            <AircraftTable
              aircraft={filteredAircraft}
              onSelect={handleSelect}
              selectedId={selectedPlane?.[0]}
            />
          </div>
        </div>

        {/* Rechte Spalte (Tabelle, Details & Map) */}
        <div className="w-[70%] flex flex-col gap-5 overflow-hidden">
          <div className="h-1/3 flex gap-5">
            {/* Tabelle */}

            {/* Detail-Ansicht */}
            <div className="w-1/2 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/30 p-4">
              <AircraftDetails plane={selectedPlane} aircraftDb={aircraftDb} />
            </div>

            <div className="w-1/2 bg-white/30 backdrop-blur-md rounded-xl shadow-lg border border-white/30 p-4">
              <MoreAircraftDetails
                plane={selectedPlane}
                aircraftDb={aircraftDb}
              />
            </div>
          </div>

          {/* Die Karte - Jetzt voll interaktiv verbunden */}
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 overflow-hidden">
            <Map
              aircraft={filteredAircraft} // Nur gefilterte Flieger anzeigen
              selectedPlane={selectedPlane}
              onSelectPlane={handleSelect} // Die wichtige Verknüpfung für den Klick!
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
