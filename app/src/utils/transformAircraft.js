export function transformAircraft(states) {

  if (!states) return {
    type: "FeatureCollection",
    features: []
  }

  const features = states
    .filter(plane => plane[5] !== null && plane[6] !== null)
    .slice(0, 200) // LIMIT für Performance
    .map(plane => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [plane[5], plane[6]]
      },
      properties: {
        callsign: plane[1],
        altitude: plane[7],
        velocity: plane[9],
        heading: plane[10]
      }
    }))

  return {
    type: "FeatureCollection",
    features
  }
}