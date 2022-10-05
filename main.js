import './style.css'

// DOM ELEMENTS
let bookFlightMenu = document.querySelector('.countries-menu');
let map = document.querySelector('#map');

// ASYNC HELPER FUNCTIONS
const getPosition = () =>
        new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
        });

const loadMap = async () => {
  try {
    // GeoLocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
            
    const coords = [lat, lng];

    map = L.map('map', {zoomControl: false}).setView(coords, 12)
    
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    // L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {}, 
    // ).addTo(map);

  } catch (err) {
    console.error(`${err} 💥 💥 💥`);
    // renderError(`💥 ${err.message}`);
  }
};
await loadMap();

const getCountriesName = async () => {
  try {
      const res = await fetch(`https://restcountries.com/v3.1/all`);
      if (!res.ok) throw new Error(`Problem getting country data`);
      const data = await res.json();

      const countryNames = data.map(country => {
          return `${country.flag} ${country.name.common}`;
      }).sort()

      let output = '<option disabled selected value>Reserve Flight</option>';
    countryNames.forEach((country) => {
      console.log( country.slice(5, country.length).trim().toLowerCase())
      // https://www.kiwi.com/en/search/tiles/spain/anywhere
      // output += `<option value="">${country.slice(5, -1)} ${country}</option>`;
      output += `<option value="https://www.kiwi.com/en/search/tiles/${country.slice(5, country.length).trim().toLowerCase()}/anywhere">${country}</option>`;
      bookFlightMenu.innerHTML = output;
      
    });
    
  }
  catch (err) {
      console.error(`${err} 💥 💥 💥`);
      // renderError(`💥 ${err.message}`);
  }
};
getCountriesName();


