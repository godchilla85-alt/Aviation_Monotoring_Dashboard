export default function Test(){
    return(
        <div className="w-full h-full flex gap-5">
        <div className="left-column w-1/3 h-full bg-amber-300 p-5">
            <h1 className="text-2xl font-bold mb-4 mr-5">
        European Air Traffic Dashboard
        <span className='block'>Live aircraft tracked: {aircraft.length}</span>
      </h1>
      <SearchFieldItem></SearchFieldItem>
        </div>
        <div className="right-column w-2/3 h-full flex flex-col bg-blue-400 p-5">
            <div className="h-1/2 w-full flex bg-cyan-300 gap-5">
                <div className="w-1/2 h-full bg-emerald-500">
                    <AircraftTable 
          aircraft={aircraft}
          onSelect={handleSelect}
          selectedId={selectedPlane?.[0]}></AircraftTable>
                </div>
                <div className="w-1/2 h-full bg-emerald-700">
                    <AircraftDetails plane={selectedPlane}></AircraftDetails>
                </div>
            </div>
            <div className="h-1/2 w-full bg-cyan-700">
                <Map 
        aircraft={aircraft}
        selectedPlane={selectedPlane} />
            </div>
        </div>
             
        </div>
    )
}