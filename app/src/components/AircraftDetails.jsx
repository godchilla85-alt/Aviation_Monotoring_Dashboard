export default function AircraftDetails({ plane }) {
  if (!plane) return (
    <div className="text-gray-500 italic p-10">Wähle ein Flugzeug aus der Liste aus.</div>
  );

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold text-green-600 mb-2">{plane[1] || "Unknown"}</h2>
      <div className="space-y-2 text-sm">
        <p><b>ICAO24:</b> {plane[0]}</p>
        <p><b>Origin:</b> {plane[2]}</p>
        <p><b>Altitude:</b> {plane[7]}m</p>
        <p><b>Speed:</b> {Math.round(plane[9] * 3.6)} km/h</p>
        <hr className="my-4" />
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="text-blue-800 font-semibold italic">Route Info (API coming soon...)</p>
          <p className="text-xs text-blue-600">Start: ??? → Ziel: ???</p>
        </div>
      </div>
    </div>
  );
}