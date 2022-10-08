import './style.css'
import * as utilAsync from './utils/apiCalls'
import * as utilStr from './utils/formatStr'
import * as utilNum from './utils/numericConversion'

(async () => {
  try {
    await utilAsync._renderCFMenu();
    form.addEventListener('submit', newWorkout);
    // Chrome canvas 
    document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  } catch (err) {
    console.log(`${err.message}`);
  }
})();  


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
    id: 'thgj79845#2!',
    title: 'Majestic Views',
    rating: '⭐️⭐️⭐️☆☆',
    startDate: 'Jan 22, 2023',
    endDate: 'Feb 01, 2023',
    desc: 'Lago di Braies is a beautiful lake surrounded by green mountains 😍. I had an amazing time.',
    coords: [46.694721, 12.084444],
    countryCode: 'IT',
    countryFlag: '🇮🇹',
    city: 'Pragser Wildsee',
    cityWeaIconPath: 'https://openweathermap.org/img/wn/02d@2x.png',
    cityWeaDesc: 'few clouds',
    tripImg: 'https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80'
  },
  {
    id: 'coki45#2!',
    title: 'Bottoms Up In Mo\'Bay',
    rating: '⭐️⭐️⭐️⭐️⭐️',
    startDate: 'Mar 12, 2022',
    endDate: 'June 01, 2022',
    desc: 'Montego Bay has duty-free shopping, vibrant nightlife, & calm waters. I can\'t wait to return! 💃🏻',
    coords: [18.476223, -77.893890],
    countryCode: 'JM',
    countryFlag: '🇯🇲',
    city: 'Montego Bay',
    cityWeaIconPath: 'https://openweathermap.org/img/wn/01d@2x.png',
    cityWeaDesc: 'clear sky',
    tripImg: 'https://images.unsplash.com/photo-1655471290295-68ab70e1942b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8OXxuT01SbWl0R1c2NHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
  },
  {
    id: '658#@#45#2!',
    title: 'Bon Voyage 🛩',
    rating: '⭐️⭐️⭐️⭐️☆',
    startDate: 'Oct 23, 2027',
    endDate: 'Dec 14, 2029',
    desc: 'From modern skyscrapers to neon lights, palaces, Seoul is a fascinating mix of old and new.',
    coords: [37.532600, 127.024612],
    countryCode: 'SK',
    countryFlag: '🇰🇷',
    city: 'Seoul',
    cityWeaIconPath: 'http://openweathermap.org/img/wn/11d@2x.png',
    cityWeaDesc: 'light rain',
    tripImg: 'https://images.unsplash.com/photo-1641463594370-68593b56552c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
  },

]

// APP
const showForm = (mapE) => {
  form.classList.remove('hidden');
  inputTitle.focus();

   // mapE = EVENT TO GET LOCATION FROM LEAFLET MAP
   mapEvent = mapE // reassigned the value that is received from leaflet map.on() method that assigned to the global 'mapEvent' variable.. hence other functions will will get access to that value (latLng / coords)
}

const hideForm = () => {
  // Empty inputs
  form.reset()

  // TRICK TO PREVENT ANIMATION
  form.style.display = 'none';
  form.classList.add('hidden');
  setTimeout(() => (form.style.display = 'grid'), 1000);
}

const loadMap = async () => {
  try {
    const pos = await utilAsync._getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
            
    const coords = [lat, lng];

    map = L.map('map', {
      zoomControl: false,
      center: coords,
      doubleClickZoom: false,
    }).setView(coords, 13)

    L.control.zoom({ position: 'bottomright'}).addTo(map);
    
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {}).addTo(map);

    // GEO LOCATION MARKER
    /*const curCountry = await utilAsync._getCNm(lat, lng)
    const curCity = await utilAsync._getCiNm(lat, lng)
    const curWeather = await utilAsync._getCiCurWea(lat, lng)
    const weaDesc = curWeather[1]
    console.log(curCity);


    L.marker(coords)
    .addTo(map)
    .bindPopup(
            L.popup({
                    maxWidth: 300,
                    minWidth: 20,
                    autoClose: false,
                    closeOnClick: false,
                    className: `trip-popup`,
            })
    )
      .setPopupContent(`👋 Hey, you can add a trip simply by clicking on the map. <br><br>
    
      📍Your location.. <br>
      🇺🇸 ${curCountry} <br>
      🌆 ${curCity} <br>
       ☁️ ...${weaDesc} <br><br>

      🧙‍♂️ click me and I will vanish 

      `)
    .openPopup()
    // .bindTooltip(``)
    */

    // Handling clicks on map
    map.on('click', showForm)

  } catch (err) {
    return Promise.reject(err.message)
  }
};
await loadMap();

const renderTripMarker = (trip) => {
  L.marker(trip.coords)
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
    .setPopupContent(`${trip.countryFlag}${trip.countryCode.toUpperCase()}\xa0\xa0\xa0📍${trip.city}\xa0\xa0\xa0☁️<i>...${trip.cityWeaDesc}</i>`)
    .openPopup().bindTooltip("my tooltip text")
    .openTooltip();
}

const renderTrip = (trip) => {
  let html = `
  <li class="card card-box" data-id='${trip.id}'>
  <aside class="card__aside">
      <figure class="card__figure">
          <img class="card__image" src='${trip.tripImg}' alt="picture of a hand holding a beer outstretched towards a lake" />
      </figure>
  </aside>
  <header class="card__header card-textbox">
      <div class="card-textbox__location-box">
          <div class="card-textbox__country">
              <p class="card__flag">${trip.countryFlag}</p>
              <p class="card__country">${trip.countryCode}</p>  
              <p class="card__map-marker">📍</p>
              <div class="card__weather-icon-div card__country">${trip.city}
                  <img class="card__weather-icon" src='${trip.cityWeaIconPath}'/>
              </div>
          </div>
          <div>
              <ion-icon class="card__drop-down--icon" data-bs-toggle="dropdown" type="div" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" name="ellipsis-horizontal"></ion-icon>
              <div class="card__dropdown-menu--styling  dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <div class="dropdown-item card__dropdown-item--styling" onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#editTripForm" ><ion-icon name="create-outline"></ion-icon>Edit</div>
                  <div class="dropdown-item card__dropdown-item--styling" onClick= "deleteTask(this);createTasks()" ><ion-icon name="trash-outline"></ion-icon>Delete</div>
              </div>
          </div>
      </div>
      <h2 class="card__title">${trip.title}</h2>
      <div class="card__body">
          <div class = 'card__date-rating-box'>
              <p class="card__date">${trip.startDate} - ${trip.endDate}</p>
              <p  class="card__rating">${trip.rating}</p>
          </div>
          <p class="card__description">${trip.desc}</p>
      </div>
  </header>
</li>
`
form.insertAdjacentHTML('afterend', html);
}

const newWorkout = async (e) => {
  try {
    e.preventDefault()

    // Get data from form
    const id = uuid.v4()
    const titleInput = inputTitle.value.trim()
    const title = utilStr._ctsc(titleInput)
    const rating = utilNum._cr(inputRating.value)
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
    const tripImg = await utilAsync._getUnSplashImg()

    // Check if data is valid - the form already checks for valid inputs automatically
    
    // If data is valid create trip object
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
      tripImg: tripImg,
    }

    // Add new trip object to trips array
    trips.push(trip)

    // Render trip on map as marker
    renderTripMarker(trip)

    // Render trip on list
    renderTrip(trip)

    // Hide form + clear input fields
    hideForm()

    // Set local storage to all trips

} catch (err) {
  console.error(err);
}

}
// EVENT LISTENERS





