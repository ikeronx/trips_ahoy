import './style.css'
import 'leaflet.smooth_marker_bouncing'
import * as utilAsync from './api'
import * as utilStr from './utils/formatStr'
import * as utilNum from './utils/numericConversion'

(async () => {
  try {
    await utilAsync._renderCFMenu();
  } catch (err) {
    return `${err.message}`
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
const zoomLevel = 3

// DATA
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
  {
    id: 'coki45#2!',
    title: 'Bottoms Up In Mo\'Bay',
    rating: '⭐️⭐️⭐️⭐️⭐️',
    startDate: 'Mar 12, 2022',
    endDate: 'June 01, 2022',
    desc: 'Montego Bay has duty-free shopping, vibrant nightlife, & calm waters. I can\'t wait to return!',
    coords: [18.47163118420902
      , -77.92087554931642],
    countryCode: 'JM',
    countryFlag: '🇯🇲',
    city: 'Montego Bay',
    cityWeaIconPath: 'https://openweathermap.org/img/wn/01d@2x.png',
    cityWeaDesc: 'clear sky',
    tripImg: 'https://images.unsplash.com/photo-1624483275193-33b8acc6e32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80%20%20https://images.unsplash.com/photo-1592945843838-c69fc7dacb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80%20https://images.unsplash.com/photo-1626292730004-0b3373283151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80'
},
]

// APP
const showForm = (mapE) => {
  form.classList.remove('hidden');
  inputTitle.focus();

   // mapE = MP EVENT TO GET LOCATION FROM LEAFLET MAP
   mapEvent = mapE // reassigns the value that is received from leaflet map.on() method to the global 'mapEvent' variable.. other functions will will get access to that value (latLng / coords)
}

const hideForm = () => {
  // Empty inputs
  form.reset()

  // TRICK TO PREVENT ANIMATION
  form.style.display = 'none';
  form.classList.add('hidden');
  setTimeout(() => (form.style.display = 'grid'), 1000);
}

const flyToLocation = (coords, zoomlevel) => map.flyTo(coords, zoomlevel)

const renderTripMarker = (trip) => {
  const div_circle = L.divIcon({ className: 'tealCircleIcon'})

  L.marker(trip.coords, { icon: div_circle })
  .on('click', function () {
    flyToLocation(trip.coords, 13)
    }
)
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
    // .openPopup()
    // ._icon.classList.add("hueChange");
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

    // Map Base layers
    const mapboxDrk =  L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/dark-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA",
      }
    )

    const mapboxLight =  L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/light-v10",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA",
      }
    )

    const mapboxStreet =  L.tileLayer(
      "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
      {
        maxZoom: 18,
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA",
      }
    )

    // Map overlays
    // const littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    // denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    // aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    // golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

    // const cities = L.layerGroup([littleton, denver, aurora, golden])

    // L is a global leaflet map object that has a bunch of methods and properties e.g on(), addMarker(), tileLayer() etc 
    map = L.map('map', {
      zoomControl: false,
      center: coords,
      layers: [mapboxStreet,mapboxLight, mapboxDrk],
    }).setView(coords, zoomLevel)

  
    // MAP DEFAULT MARKER
    const geoData = await utilAsync._getGeoData(coords[0], coords[1])

    const curWeather = await utilAsync._getCiCurWea(coords[0], coords[1])
    const weaDesc = curWeather[1]

    L.marker(coords, {
      icon:
      L.icon.pulse({
        // iconSize: [20, 20],
        color: 'yellow',
        fillColor: 'yellow',
      })
    }).on('click', function () {
      // this.toggleBouncing();
      flyToLocation(coords, 14)
      }
  )
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
      🧙🏽 The current weather in your area is <br> 🪄 <i>...{weaDesc}</i><br><br> 👨🏽‍🏫 Trips Ahoy! main features: <br>
      📌 Add trip(s) by clicking on the map. <br>
      📌 Find a place by using the search box. <br>
      📌 Find places near an area searched. <br>
      📌 Find a route and directions. <br>
      📌 Update trip(s) <br>
      📌 Delete trip(s) <br>
      `)
    // .openPopup()
      .bindTooltip(`👨🏽‍💻 Hey there, I'm Keron, and this is your current position.</strong><br>\xa0\xa0\xa0\xa0\xa0Click the pulse and I will perform a magic trick for you.`, {
        // permanent: true,
        interactive: true,
      })
    
  /***********************************/
  /* ESRI LEAFLET SEARCH FOR PLACES */
  /***********************************/
  const apiKey = "AAPKdec506a2a45242168858f4b1bdd8bc83U3L-BFCyxIRNCMccr-A9Ww_dzna7wRD9H-Ap3GNvX8ZF6RBh9hXKqMgBFezUMC7a";
  // create the geocoding control and add it to the map      
  const searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    placeholder: 'Find address or place...',
    useMapBounds: false,
    
    // Set the providers to arcgisOnlineProvider in order to access the       geocoding service. 
    providers:[
    L.esri.Geocoding.arcgisOnlineProvider({
    apikey: apiKey,
    nearby: {
    lat: coords[0],
    lng:  coords[1],
    }
  })
  ]  
  }).addTo(map)

  // Display the results of the search using a Marker and Popup
  // 1. Add a LayerGroup to the map to contain the geocoding results.
  const results = L.layerGroup().addTo(map)

  // 2. Create an event handler to access the data from the search results. Call the clearLayers method to remove the previous data from the LayerGroup.
  searchControl.on('results', async (data)=> {
    results.clearLayers()
    console.log(data.results[0].latlng);

    const coords = [data.results[0].latlng.lat, data.results[0].latlng.lng]
    
    const curWeather = await utilAsync._getCiCurWea(coords[0], coords[1])
    const weaDesc = curWeather[1]

    // 3. Create a loop that adds the coordinates of a selected search       results to a Marker.
    for (let i = data.results.length - 1; i >= 0; i--) {
    const marker = L.marker(data.results[i].latlng, {
    }).on('click', function () {
      this.bounce(2);
      flyToLocation(coords, 16)
      }
  )

    // 4. Add a lngLatString variable that stores the rounded search result   coordinates. Append the bindPopup method to the marker to display the     coordinates and address of the result.
    const lngLatString = `${Math.round(data.results[i].latlng.lng * 100000) / 100000}, ${
      Math.round(data.results[i].latlng.lat * 100000) / 100000
    }`;
      marker.bindPopup(`<p>${data.results[i].properties.LongLabel}<br>☁️ ...<i>${weaDesc}</i></p>
      `);
    results.addLayer(marker);
    marker.openPopup().bounce(3)._icon.classList.add("hueChangeTeal");
    }
  });
    
    // Base layers and overlay(s) objects
    const baseMaps = {
      'Street': mapboxStreet,
      'Light': mapboxLight,
      "Dark":  mapboxDrk,
    }

    // const overlayMaps = {
    //   "Cities": cities
    // }

    // MAP LAYER CONTROLS
    L.control.layers(baseMaps, null, {
      // position: 'bottomright',
    })
      .addTo(map)
    L.control.zoom({ position: 'bottomright' })
      .addTo(map);


  // Handling clicks on map
  map.on('click', showForm)

  // Load Workouts List and Markers from local storage
  // map.whenReady(getLocalStorage);
  getLocalStorage()

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
  const deleteBtns = document.querySelectorAll('.deleteBtn')
  // Add an event listener to each delete btn from the card drop down menu
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

const editTrip = (e) => {
  const editBtns = document.querySelectorAll('.editBtn')
  editBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {

    const selectedTrip = findTrip(e)
    console.log(selectedTrip);

    // CONVERT WORKOUT COORDS ARRAY TO OBJECT TO FIT MAP EVENT FORMAT
    const coords = selectedTrip.coords;
    const objCoords = {
      latlng: {
        lat: coords[0],
        lng: coords[1],
      },
    };
      
    showForm(objCoords)

    inputTitle.value = selectedTrip.title
    inputRating.value = utilNum._croe(selectedTrip.rating);
    inputStartDate.value = utilStr._fdoe(selectedTrip.startDate)
    inputEndDate.value = utilStr._fdoe(selectedTrip.endDate)
    inputDesc.value = selectedTrip.desc

    const trip = {
      countryCode: selectedTrip.countryCode,
      countryFlag: selectedTrip.countryFlag,
      cityWeaIconPath: selectedTrip.cityWeaIconPath,
      cityWeaDesc: selectedTrip.cityWeaDesc,
      tripImg: selectedTrip.tripImg,
    }
      console.log(objCoords, trip.tripImg);
      
      if (e.key === 'Enter') newWorkout(trip)
  

    })
  })
}
editTrip()

const moveToPopup = (e) => {
  const tripEl = findTrip(e)
  map.flyTo(tripEl.coords, 13)
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

    // Render trip on map as marker
    renderTripMarker(trip)

    // Render trip on list
    renderTrip(trip)

    // Hide form + clear input fields
    hideForm()

    // Set local storage to all trips
    setLocalStorage()

    // Reload page
    location.reload()

} catch (err) {
  console.error(err);
  }
}

// EVENT LISTENERS
(() => {
  form.addEventListener('submit', newWorkout);
  containerTrips.addEventListener('click', moveToPopup)
  document.createElement('canvas').getContext('2d', { willReadFrequently: true });
})()
