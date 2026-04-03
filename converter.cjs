const fs = require('fs');
const readline = require('readline');

const INPUT_FILE = 'aircraftDatabase.csv'; 
const OUTPUT_FILE = 'app/public/aircraft_db.json';

const result = {};
let count = 0;

const rl = readline.createInterface({
  input: fs.createReadStream(INPUT_FILE),
  terminal: false
});

console.log("Starte Konvertierung...");

rl.on('line', (line) => {
  // Verbesserter CSV-Regex, um Anführungszeichen sauber zu händeln
  const cols = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  
  if (!cols || cols.length < 5) return;

  const icao24 = cols[0]?.replace(/"/g, '').toLowerCase().trim();
  const manufacturer = cols[2]?.replace(/"/g, '').trim();
  const model = cols[3]?.replace(/"/g, '').trim();
  const operator = cols[4]?.replace(/"/g, '').trim();

  // Wir nehmen ALLES, was einen ICAO-Key hat, um sicherzugehen
  if (icao24 && icao24 !== 'icao24') {
    result[icao24] = {
      m: manufacturer || "",
      t: model || "",
      o: operator || ""
    };
    count++;
  }
});

rl.on('close', () => {
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result));
  console.log(`ERFOLG: ${count} Flugzeuge gespeichert.`);
  // Test-Check für deinen speziellen Flieger aus dem Screenshot:
  if (result["471f78"]) {
    console.log("Test-Check 471f78 gefunden:", result["471f78"]);
  } else {
    console.log("Test-Check 471f78 leider NICHT in der CSV gefunden.");
  }
});