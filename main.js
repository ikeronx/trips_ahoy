import './style.css'
import * as utilAsync from './utils/apiCalls'
import * as utilStr from './utils/formatStr'
import * as utilUiID from './utils/uniqueId'

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
    coords: [43.12237361329194, 12.412278112024072],
    country: 'Italy',
    countryAbbrev: 'IT',
    countryFlag: '🇮🇹',
    city: 'Prague',
    weatherIcon: 'https://openweathermap.org/img/wn/02d@2x.png',
    tripImage: 'https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
  }
]

// APP
const loadMap = async () => {
  try {
    const pos = await utilAsync._getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
            
    const coords = [lat, lng];

    map = L.map('map', {zoomControl: false}).setView(coords, 12)
    
    L.control.zoom({ position: 'bottomright' }).addTo(map);
    
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);
    
    // Handling clicks on map
    map.on('click', showForm)

  } catch (err) {
    // renderError(`💥 ${err.message}`);
    return Promise.reject(`${err} 💥 💥 💥`)
  }
};

const showForm = (mapE) => {
  mapEvent = mapE // reassigned the value that it get from the leaflet map on() method event to the global mapEvent variable hence other functions that outside this fun will get access to that value
  form.classList.remove('hidden');
  inputTitle.focus();
}

const newWorkout = async (e) => {
  e.preventDefault()

  // Get data from form
  const id = uuid.v4()
  const title = utilStr._ctsc(inputTitle.value)
  const rating = utilStr._cr(inputRating.value)
  const startDate = utilStr._fd(inputStartDate.value)
  const endDate = utilStr._fd(inputEndDate.value)
  const desc = inputDesc.value
  const { lat, lng } = mapEvent.latlng
  //💡💡 add async function on the variables here and use the lat, lng for the coords fn parameter above before adding it to the variables trip object below 
  // e.g const weatherIcon = await getCityCurWeather(lat, lng)
  console.log(title, rating, startDate, endDate, desc, lat, lng, id);

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
  }

  // Then add the trip object to the trips array
  trips.push(trip)

  // Render trip on map as a marker
  const coords = [lat, lng];
  L.marker(coords)
  .addTo(map)
  .bindPopup(
          L.popup({
                  maxWidth: 250,
                  minWidth: 100,
                  autoClose: false,
                  closeOnClick: false,
                  className: `trip-popup`,
          })
  )
  .setPopupContent(`🇯🇲 ${startDate}`)
    .openPopup().bindTooltip("my tooltip text")
    // .openTooltip();

  // Render trip on the list/sidebar

  //Hide form & clear input fields
  // inputTitle.value = inputRating.value = inputStartDate.value = inputEndDate.value = inputDesc.value = ''
  form.reset();
}

// EVENT LISTENERS
(async () => {
  await loadMap();
  await utilAsync._renderCFMenu();
  form.addEventListener('submit', newWorkout)
})();



