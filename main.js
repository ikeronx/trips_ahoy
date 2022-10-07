import './style.css'
import * as utilAsync from './utils/apiCalls'
import * as utilStr from './utils/formatStr'

(async () => {
  await utilAsync._renderCFMenu();
  form.addEventListener('submit', newWorkout)
})();  

  // Chrome canvas 
const canvas = document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  


// document.addEventListener('DOMContentLoaded', function() {
//   alert("Ready!");
// }, false);

// DOM ELEMENTS
const form = document.querySelector('.form');
const containerTrips = document.querySelector('.trips');
const inputTitle = document.querySelector('.form__input--title');
const inputRating = document.querySelector('.form__input--rating');
const inputStartDate = document.querySelector('.form__input--start-date');
const inputEndDate = document.querySelector('.form__input--end-date');
const inputDesc = document.querySelector('.form__input--desc');

let map 
let mapEvent
let trips = [
  {
    id:  'xoxo123',
    title: 'Majestic Views',
    startDate: 'Mar 12, 2022',
    endDate: 'June 01, 2022',
    rating: '⭐️⭐️⭐️☆☆',
    desc: 'Lago di Braies is a beautiful lake surrounded by green mountains 😍. The tiny borghi at the lakeside make',
    countryCode: 'it',
    countryFlag: '🇮🇹',
    city: 'Prague',
    weatherIcon: 'https://openweathermap.org/img/wn/02d@2x.png',
    tripImage: 'https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
  }
]

// APP
const showForm = (mapE) => {
  mapEvent = mapE // reassigned the value that it get from the leaflet map on() method event to the global mapEvent variable hence other functions that outside this fun will get access to that value
  form.classList.remove('hidden');
  inputTitle.focus();
}

const loadMap = async () => {
  try {
    const pos = await utilAsync._getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
            
    const coords = [lat, lng];

    map = L.map('map', {zoomControl: false}).setView(coords, 13)
    
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {}, // <-- the map title style is set to the OpenStreetMap style
    ).addTo(map); // <-- the map is added to the map container

    L.marker(coords)
    .addTo(map)
    .bindPopup(
            L.popup({
                    maxWidth: 400,
                    minWidth: 280,
                    autoClose: false,
                    closeOnClick: false,
                    className: `trip-popup`,
            })
    )
    .setPopupContent(`<div class='popup-box'><span>🇺🇸US</span><span>📍West Bridgewater </span><span><img src='https://openweathermap.org/img/wn/02d@2x.png' alt='city current weather icon' class='leaflet-popup-weather-icon'/>...clear sky</span></div>`)
      .openPopup().bindTooltip("my tooltip text")

    // Handling clicks on map
    map.on('click', showForm)

  } catch (err) {
    return Promise.reject(err.message)
  }
};
await loadMap();

const newWorkout = async (e) => {
  e.preventDefault()

  // Get data from form
  const id = uuid.v4()
  const title = utilStr._ctsc(inputTitle.value).trim()
  const rating = utilStr._cr(inputRating.value)
  const startDate = utilStr._fd(inputStartDate.value)
  const endDate = utilStr._fd(inputEndDate.value)
  const desc = inputDesc.value
  const { lat, lng } = mapEvent.latlng
  const countryCode = await utilAsync._getCC(lat, lng) 
  const countryFlag = await utilAsync._getCF(lat, lng) 
  const city = await utilAsync._getCiNm(lat, lng)
  const cityCurWeather = await utilAsync._getCiCurWea(lat, lng)
  const cityWeaIconPath = cityCurWeather[0] 
  const cityWeaDesc = cityCurWeather[1] 
  console.log(city);

  // Check if inputs are valid - the form already checks for valid inputs automatically
  
  // If inputs are valid create trip object
  const trip = {
    id: id,
    title: title,
    rating: rating,
    startDate: startDate,
    endDate: endDate,
    desc: desc,
    coords: [lat, lng],
    countryCode: countryCode,
    countryFlag: countryFlag,
    city: city,
    cityWeaIconPath: cityWeaIconPath,
    cityWeaDesc: cityWeaDesc,
  }

  // Then add the trip object to the trips array
  trips.push(trip)
  console.log(trips);

  // Render trip on map as a marker
  const coords = [lat, lng];
  L.marker(coords)
  .addTo(map)
  .bindPopup(
          L.popup({
                  maxWidth: 300,
                  minWidth: 30,
                  autoClose: false,
                  closeOnClick: false,
                  className: `trip-popup`,
          })
  )
  .setPopupContent(`${countryFlag}${countryCode.toUpperCase()}\xa0\xa0\xa0📍${city}\xa0\xa0\xa0☁️<i>...${cityWeaDesc}</i>`)
    .openPopup().bindTooltip("my tooltip text")
    // .openTooltip();

  // Render trip on the list/sidebar

  //Hide form & clear input fields
  form.reset();
}

// EVENT LISTENERS





