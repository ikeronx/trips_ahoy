import './style.css'
import * as utilAsync from './api'
import * as utilStr from './utils/formatStr'
import * as utilNum from './utils/numericConversion'

(async () => {
  try {
    await utilAsync._renderCFMenu();
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
const zoomLevel = 13
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
    desc: 'Montego Bay has duty-free shopping, vibrant nightlife, & calm waters. I can\'t wait to return💃🏻',
    coords: [18.476223, -77.893890],
    countryCode: 'JM',
    countryFlag: '🇯🇲',
    city: 'Montego Bay',
    cityWeaIconPath: 'https://openweathermap.org/img/wn/01d@2x.png',
    cityWeaDesc: 'clear sky',
    tripImg: 'https://images.unsplash.com/photo-1624483275193-33b8acc6e32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80%20%20https://images.unsplash.com/photo-1592945843838-c69fc7dacb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80%20https://images.unsplash.com/photo-1626292730004-0b3373283151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80'
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
    .openPopup()
    ._icon.classList.add("hueChange");

}

const renderTrip = (trip) => {
  let html = `
  <li class="trip card card-box" data-id='${trip.id}'>
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
                  <div class="dropdown-item card__dropdown-item--styling editBtn"><ion-icon name="create-outline"></ion-icon>Edit</div>
                  <div class="dropdown-item card__dropdown-item--styling deleteBtn"><ion-icon name="trash-outline"></ion-icon>Delete</div>
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

const getLocalStorage = ()=> {
  const data = JSON.parse(localStorage.getItem('trips'))

  if (!data) return

  trips = data

  trips.forEach((trip) => {
    renderTrip(trip)
    renderTripMarker(trip)
  })
}

const loadMap = async () => {
  try {
    const pos = await utilAsync._getPos();
    const { latitude: lat, longitude: lng } = pos.coords;
            
    const coords = [lat, lng];

    map = L.map('map', {
      zoomControl: false,
      center: coords,
    }).setView(coords, zoomLevel)

    L.control.zoom({ position: 'bottomright'}).addTo(map);
    
    L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    }).addTo(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {}).addTo(map);

    L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/dark-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA",
      }
    ).addTo(map);

    // GEO LOCATION MARKER
    const geoData = await utilAsync._getGeoData(coords[0], coords[1])

    const curWeather = await utilAsync._getCiCurWea(coords[0], coords[1])
    const weaDesc = curWeather[1]

    // Map's default marker
    L.marker(coords, {
      icon:
      L.icon.pulse({
      iconUrl: 'https://unpkg.com/leaflet@1.0.3/dist/images/marker-icon.png',
        // className: 'hueChange'
        iconSize: [20, 20],
        color: '#319795',
        fillColor: '#319795',
      })
    })
    .addTo(map)
    .bindPopup(
            L.popup({
                    maxWidth: 300,
                    minWidth: 20,
                    autoClose: true,
                    closeOnClick: true,
                    className: `trip-popup`,
            })
    )
      .setPopupContent(`
      🧙🏻‍♂️ The current weather in your area is <br> 🪄 <i>...{weaDesc}</i> ☁️ <br><br> 👩🏼‍🏫 Hi, I'm Ms. Frizzle. You can add a trip by  \xa0\xa0\xa0\xa0\xa0clicking on the map.

      `)
    // .openPopup()
      .bindTooltip(`🧙🏻‍♂️ Hey there, I'm Dumbledore, and this is your current position.</strong><br>\xa0\xa0\xa0\xa0\xa0Click me, and I will perform a different magic trick for you.`, {
        // permanent: true,
        interactive: true,
      })

    // Handling clicks on map
    map.on('click', showForm)

     // Loading Workouts List and Markers from localstorage
    map.whenReady(getLocalStorage);

  } catch (err) {
    return Promise.reject(err.message)
  }
};
await loadMap();

const findTrip = (e) => {
  if (!map) return;

  // DOM TRAVERSING
  const tripEl = e.target.closest('.trip')

  if (!tripEl) return; // ⛔️🎅🏽 Guard clause

  return trips.find((trip) => trip.id === tripEl.dataset.id) // returns a trip object
}

const deleteTrip = (e) => {
  // Add an event listener to each delete btn from the card drop down menu
  const deleteBtns = document.querySelectorAll('.deleteBtn')
  deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {

      // find the trip to delete
      const deleteTrip = findTrip(e)

      // return the the trips arr with all the trips that does not match the delete trip id
      trips = trips.filter((trip) => trip.id !== deleteTrip.id)

      // set local storage
      setLocalStorage()
      
      //refresh / reload the page
      location.reload()
    })
  })
}
deleteTrip()

const moveToPopup = (e) => {
  const tripEl = findTrip(e)
  map.flyTo(tripEl.coords, zoomLevel)
}



const setLocalStorage = () => {
  localStorage.setItem('trips', JSON.stringify(trips))
}

const newWorkout = async (e) => {
  try {
    e.preventDefault()

    // Get data from form
    const id = uuid.v4()
    const titleValue = utilStr._trimStr(inputTitle.value)
    const title = utilStr._ctsc(titleValue)
    const rating = utilNum._cr(inputRating.value)
    const startDate = utilStr._fd(inputStartDate.value)
    const endDate = utilStr._fd(inputEndDate.value)
    const desc = inputDesc.value
    const { lat, lng } = mapEvent.latlng
    const geoData = await utilAsync._getGeoData(lat, lng)
    const countryCode = geoData.countryAbbrev
    const countryFlag = geoData.flag
    const city = utilStr._fcs(geoData.city)
    const cityCurWeather = await utilAsync._getCiCurWea(lat, lng)
    const cityWeaIconPath = cityCurWeather[0] 
    const cityWeaDesc = cityCurWeather[1]
    const tripImgPath = await utilAsync._getUnSplashImg()
    const tripImg =  tripImgPath

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
    console.log(trips);

    // Render trip on map as marker
    renderTripMarker(trip)

    // Render trip on list
    renderTrip(trip)

    // Hide form + clear input fields
    hideForm()

    // Set local storage to all trips
    setLocalStorage()

} catch (err) {
  console.error(err);
  }
}

// EVENT LISTENERS
(() => {
  form.addEventListener('submit', newWorkout);
  document.createElement('canvas').getContext('2d', { willReadFrequently: true });
  containerTrips.addEventListener('click', moveToPopup)
})()






