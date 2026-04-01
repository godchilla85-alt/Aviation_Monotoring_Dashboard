export const MOCK_AIRCRAFT = [
  // --- EUROPA (ca. 50 Items) ---
  // Bereich: Lat 35 bis 70, Lon -10 bis 40
  ...Array.from({ length: 30 }, (_, i) => [
    `e${i.toString(16).padStart(5, '0')}`, // ICAO24
    `EU${100 + i} `,                       // Callsign
    "Europe/Misc",                         // Country
    1711912345, 1711912345,
    (Math.random() * 50) - 10,             // Longitude (-10 bis 40)
    (Math.random() * 35) + 35,             // Latitude (35 bis 70)
    Math.floor(Math.random() * 12000),     // Altitude
    false,
    Math.floor(Math.random() * 250),       // Velocity
    Math.floor(Math.random() * 360),       // Heading
    null, null, 10000, "SQ" + i, false, 0
  ]),

  // --- NORDAMERIKA (ca. 50 Items) ---
  // Bereich: Lat 24 bis 50, Lon -125 bis -66
  ...Array.from({ length: 30 }, (_, i) => [
    `a${i.toString(16).padStart(5, '0')}`, // ICAO24
    `US${200 + i} `,                       // Callsign
    "United States",                       // Country
    1711912345, 1711912345,
    (Math.random() * 59) - 125,            // Longitude (-125 bis -66)
    (Math.random() * 26) + 24,             // Latitude (24 bis 50)
    Math.floor(Math.random() * 12000),     // Altitude
    false,
    Math.floor(Math.random() * 260),       // Velocity
    Math.floor(Math.random() * 360),       // Heading
    null, null, 11000, "UA" + i, false, 0
  ]),

  // --- ASIEN (ca. 50 Items) ---
  // Bereich: Lat 10 bis 50, Lon 70 bis 140
  ...Array.from({ length: 30 }, (_, i) => [
    `as${i.toString(16).padStart(4, '0')}`, // ICAO24
    `AS${300 + i} `,                        // Callsign
    "Asia/Misc",                            // Country
    1711912345, 1711912345,
    (Math.random() * 70) + 70,              // Longitude (70 bis 140)
    (Math.random() * 40) + 10,              // Latitude (10 bis 50)
    Math.floor(Math.random() * 12500),      // Altitude
    false,
    Math.floor(Math.random() * 240),        // Velocity
    Math.floor(Math.random() * 360),        // Heading
    null, null, 9000, "AS" + i, false, 0
  ])
];