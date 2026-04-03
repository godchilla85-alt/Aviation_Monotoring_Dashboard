export function transformAircraft(states) {
  if (!states) return {
    type: "FeatureCollection",
    features: []
  }

  const features = states
    .filter(plane => plane[5] !== null && plane[6] !== null)
    .slice(0, 200) 
    .map(plane => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [plane[5], plane[6]]
      },
      properties: {
        icao: plane[0],           
        callsign: plane[1]?.trim(),
        altitude: plane[7],
        velocity: plane[9],
        true_track: plane[10] || 0 
      }
    }))

  return {
    type: "FeatureCollection",
    features
  }
}