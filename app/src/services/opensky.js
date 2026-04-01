
export async function fetchAircraft() {
    const username = 'godchilla85@gmail.com';
  const password = 'kYj3mV#c*5usG.R';

  const auth = btoa(`${username}:${password}`);

const proxyUrl = "https://corsproxy.io/?";
  const targetUrl = "https://opensky-network.org/api/states/all?lamin=45&lomin=5&lamax=55&lomax=15";

  try {
    const res = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`
      }
    });

    if (!res.ok) {
      console.error("HTTP Fehler:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Netzwerkfehler im Fetch:", error);
    return null;
  }
}