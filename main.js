/* eslint-disable no-undef */
import './style.css';
import 'leaflet.smooth_marker_bouncing';
import * as utilAsync from './api';
import * as utilStr from './utils/formatStr';
import * as utilNum from './utils/numericConversion';

(async () => {
        try {
                await utilAsync._renderCFMenu();
        } catch (err) {
                return `${err.message}`;
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

let map;
let mapEvent;
const zoomLevel = 3;

// DATA
let trips = [
        {
                id: 'coki45#2!',
                title: "Bottoms Up In Mo'Bay",
                rating: '⭐️⭐️⭐️⭐️⭐️',
                startDate: 'Mar 12, 2022',
                endDate: 'June 01, 2022',
                desc: "Montego Bay has duty-free shopping, vibrant nightlife, & calm waters. I can't wait to return!",
                coords: [18.47163118420902, -77.92087554931642],
                countryCode: 'JM',
                countryFlag: '🇯🇲',
                city: 'Montego Bay',
                cityWeaIconPath: 'https://openweathermap.org/img/wn/01d@2x.png',
                cityWeaDesc: 'clear sky',
                tripImg: 'https://images.unsplash.com/photo-1624483275193-33b8acc6e32f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80%20%20https://images.unsplash.com/photo-1592945843838-c69fc7dacb08?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80%20https://images.unsplash.com/photo-1626292730004-0b3373283151?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2864&q=80',
        },
        {
                id: '658#@#45#2!',
                title: 'Bon Voyage 🛩',
                rating: '⭐️⭐️⭐️⭐️☆',
                startDate: 'Oct 23, 2027',
                endDate: 'Dec 14, 2029',
                desc: 'From modern skyscrapers to neon lights, palaces, Seoul is a fascinating mix of old and new.',
                coords: [37.5326, 127.024612],
                countryCode: 'SK',
                countryFlag: '🇰🇷',
                city: 'Seoul',
                cityWeaIconPath: 'http://openweathermap.org/img/wn/11d@2x.png',
                cityWeaDesc: 'light rain',
                tripImg: 'https://images.unsplash.com/photo-1641463594370-68593b56552c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
        },
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
                tripImg: 'https://images.unsplash.com/photo-1536323760109-ca8c07450053?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=930&q=80',
        },
];

// APP
const showForm = (mapE) => {
        form.classList.remove('hidden');
        inputTitle.focus();

        mapEvent = mapE; // reassigns the value that is received from leaflet map.on() method to the global 'mapEvent' variable.. other functions will will get access to that value (latLng / coords)
};

const hideForm = () => {
        // Empty inputs
        form.reset();

        // Trick to prevent animation
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => (form.style.display = 'grid'), 1000);
};

const flyToLocation = (coords, zoomlevel) => map.flyTo(coords, zoomlevel);

const renderTripMarker = (trip) => {
        const divCircle = L.divIcon({ className: 'tealCircleIcon' });

        L.marker(trip.coords, { icon: divCircle })
                .on('click', () => {
                        flyToLocation(trip.coords, 13);
                })
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
                .setPopupContent(`${trip.countryFlag}${trip.countryCode.toUpperCase()}\xa0\xa0\xa0📍${trip.city}`)
                .openPopup();
};

const renderTrip = (trip) => {
        const html = `
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
`;
        form.insertAdjacentHTML('afterend', html);
};

const getLocalStorage = () => {
        const data = JSON.parse(localStorage.getItem('trips'));

        if (!data) return;

        trips = data;

        trips.forEach((trip) => {
                renderTrip(trip);
                renderTripMarker(trip);
        });
};

const loadMap = async () => {
        try {
                const pos = await utilAsync._getPos();
                const { latitude: lat, longitude: lng } = pos.coords;

                const coords = [lat, lng];

                // MAP BASE LAYERS
                const mapboxDrk = L.tileLayer(
                        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                        {
                                maxZoom: 18,
                                id: 'mapbox/dark-v10',
                                tileSize: 512,
                                zoomOffset: -1,
                                accessToken:
                                        'pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA',
                        }
                );

                const mapboxNavigation = L.tileLayer(
                        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                        {
                                maxZoom: 18,
                                id: 'mapbox/navigation-night-v1',
                                tileSize: 512,
                                zoomOffset: -1,
                                accessToken:
                                        'pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA',
                        }
                );

                const mapboxStreet = L.tileLayer(
                        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
                        {
                                maxZoom: 18,
                                id: 'mapbox/streets-v11',
                                tileSize: 512,
                                zoomOffset: -1,
                                accessToken:
                                        'pk.eyJ1IjoiYmxhY2tib3gxMSIsImEiOiJjbDF3OGxkYWIwMzcwM2pwOHQwMXQ2OGM0In0.6KQYul7J6Vbh4edRpmgIaA',
                        }
                );

                // CREATE MAP
                map = L.map('map', {
                        zoomControl: false,
                        center: coords,
                        layers: [mapboxStreet, mapboxNavigation, mapboxDrk],
                }).setView(coords, zoomLevel);

                // CREATE MAP'S DEFAULT MARKER @ USER POSITION
                L.marker(coords, {
                        icon: L.icon.pulse({
                                iconUrl: 'https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png',
                                color: '#D68C45',
                                fillColor: '#D68C45',
                        }),
                })
                        .on('click', () => flyToLocation(coords, 14))
                        .addTo(map)
                        .bindPopup(
                                L.popup({
                                        maxWidth: 300,
                                        minWidth: 20,
                                        autoClose: true,
                                        closeOnClick: true,
                                        className: `search-popup`,
                                })
                        )
                        .setPopupContent(
                                `
                                👨🏽‍💻 Hi! I'm Keron, and this is your<br> \xa0\xa0\xa0\xa0\xa0current position.<br><br> ⚙️ Trips Ahoy! key features are: <br>
                                📌 Find a place by using the search box. <br>
                                📌 Get current weather for place searched. <br>
                                📌 Find places near an area searched. <br>
                                📌 Find a route and directions. <br>
                                📌 Add a trip by clicking on the map. <br>
                                📌 Rate trip <br>
                                📌 Update trip <br>
                                📌 Delete trip <br>
                                📌 Change map style. <br>
                                `
                        )
                        .bindTooltip(` Click to learn more about Trips Ahoy!`, {
                                // permanent: true,
                                direction: 'right',
                                interactive: true,
                        })
                        .toggleTooltip(this);

                /** ******************************** */
                /* ESRI LEAFLET SEARCH FOR PLACES */
                /** ******************************** */
                const apiKey =
                        'AAPKdec506a2a45242168858f4b1bdd8bc83U3L-BFCyxIRNCMccr-A9Ww_dzna7wRD9H-Ap3GNvX8ZF6RBh9hXKqMgBFezUMC7a';

                // create the geocoding control and add it to the map
                const searchControl = L.esri.Geocoding.geosearch({
                        position: 'topright',
                        placeholder: 'Find address or place...',
                        useMapBounds: false,

                        // Set the providers to arcgisOnlineProvider in order to access the geocoding service.
                        providers: [
                                L.esri.Geocoding.arcgisOnlineProvider({
                                        apikey: apiKey,
                                        nearby: {
                                                lat: coords[0],
                                                lng: coords[1],
                                        },
                                }),
                        ],
                });

                // Display the results of the search using a Marker and Popup
                // 1. Add a LayerGroup to the map to contain the geocoding results.
                const results = L.layerGroup().addTo(map);

                // 2. Create an event handler to access the data from the search results. Call the clearLayers method to remove the previous data from the LayerGroup.
                searchControl.on('results', async (data) => {
                        results.clearLayers();

                        const resultCoords = [data.results[0].latlng.lat, data.results[0].latlng.lng];

                        const resultCurWeather = await utilAsync._getCiCurWea(resultCoords[0], resultCoords[1]);

                        // 3. Create a loop that adds the coordinates of a selected search       results to a Marker.
                        for (let i = data.results.length - 1; i >= 0; i--) {
                                const markerIcon = {
                                        icon: L.icon({
                                                iconSize: [25, 41],
                                                iconAnchor: [12, 41],
                                                popupAnchor: [1, -34],
                                                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
                                        }),
                                };

                                const animatedCircleIcon = {
                                        icon: L.divIcon({
                                                className: 'css-icon',
                                                html: '<div class="gps_ring"></div>',
                                                iconSize: [18, 22],
                                        }),
                                };

                                const marker = L.marker(data.results[i].latlng, markerIcon).on('click', function () {
                                        this.bounce(1);
                                        flyToLocation(resultCoords, 15);
                                });

                                const pulseMarker = L.marker(data.results[i].latlng, animatedCircleIcon);

                                // 4. Add a lngLatString variable that stores the rounded search result   coordinates. Append the bindPopup method to the marker to display the     coordinates and address of the result.
                                const lngLatString = `${Math.round(data.results[i].latlng.lng * 100000) / 100000}, ${
                                        Math.round(data.results[i].latlng.lat * 100000) / 100000
                                }`;
                                marker.bindPopup(
                                        L.popup({
                                                autoClose: false,
                                                closeOnClick: false,
                                                className: `search-popup`,
                                        })
                                ).setPopupContent(
                                        `<p><strong>${data.results[i].properties.LongLabel}</strong><br>☁️ ${resultCurWeather[2]}<i> ${resultCurWeather[1]}</i></p>`
                                );
                                results.addLayer(pulseMarker);
                                results.addLayer(marker);
                                marker.openPopup().bounce(3)._icon.classList.add('hueChangeOrange');
                        }
                });

                // MAP BASE LAYERS OBJECT
                const baseMaps = {
                        Street: mapboxStreet,
                        Navigation: mapboxNavigation,
                        Dark: mapboxDrk,
                };

                // MAP CONTROLS
                searchControl.addTo(map);
                L.control.zoom({ position: 'bottomright' }).addTo(map);

                map.addControl(new L.Control.Fullscreen({ position: 'bottomright' }));

                L.control.layers(baseMaps, null, { position: 'bottomright' }).addTo(map);

                L.Control.PlacesSelect = L.Control.extend({
                        onAdd(map) {
                                const placeCategories = [
                                        ['', 'Find places nearby...'],
                                        ['Travel and Transport', 'Travel and Transport'],
                                        ['Airport', 'Airport'],
                                        ['Train station', 'Train station'],
                                        ['Hotel', 'Hotel'],
                                        ['Food', 'Food'],
                                        ['Coffee shop', 'Coffee shop'],
                                        ['Shops and Service', 'Shops and Service'],
                                        ['Arts and Entertainment', 'Arts and Entertainment'],
                                        ['Parks and Outdoors', 'Parks and Outdoors'],
                                        ['Gas station', 'Gas station'],
                                        ['Hospital', 'Hospital'],
                                        ['Nightlife Spot', 'Nightlife Spot'],
                                ];

                                const select = L.DomUtil.create('select', '');
                                select.setAttribute('id', 'optionsSelect');
                                select.setAttribute('style', 'padding:16px 0px;text-align:center;max-width: 150px;');

                                placeCategories.forEach((category) => {
                                        const option = L.DomUtil.create('option');
                                        option.value = category[0];
                                        option.innerHTML = category[1];
                                        select.appendChild(option);
                                });
                                return select;
                        },

                        onRemove(map) {
                                // Nothing to do here
                        },
                });

                L.control.placesSelect = function (opts) {
                        return new L.Control.PlacesSelect(opts);
                };

                L.control
                        .placesSelect({
                                position: 'topright',
                        })
                        .addTo(map);

                const layerGroup = L.layerGroup().addTo(map);

                const showPlaces = function (category) {
                        L.esri.Geocoding.geocode({
                                apikey: apiKey,
                        })
                                .category(category)
                                .nearby(map.getCenter(), 10)
                                .run((error, response) => {
                                        if (error) {
                                                return;
                                        }
                                        layerGroup.clearLayers();

                                        response.results.forEach((searchResult) => {
                                                L.marker(searchResult.latlng, {
                                                        bounceOnAdd: true,
                                                })
                                                        .on('click', function () {
                                                                this.bounce(1);
                                                        })
                                                        .addTo(layerGroup)
                                                        .bindPopup(
                                                                L.popup({
                                                                        maxWidth: 300,
                                                                        minWidth: 30,
                                                                        autoClose: true,
                                                                        closeOnClick: false,
                                                                        className: 'trip-popup',
                                                                })
                                                        )
                                                        .setPopupContent(
                                                                `<strong class='places'>${searchResult.properties.PlaceName}</strong></br>${searchResult.properties.Place_addr}`
                                                        )
                                                        .openPopup()
                                                        .bounce(3)
                                                        ._icon.classList.add('hueChangeTeal');
                                        });
                                });
                };

                const select = document.getElementById('optionsSelect');
                select.addEventListener('change', () => {
                        if (select.value !== '') {
                                showPlaces(select.value);
                        }
                });

                // Disables the first option from the find places select dropdown menu
                document.querySelector('#optionsSelect option').disabled = true;

                // Stops event from bubbling up to the parent element (#map) which triggers its click event causing the select menu to close
                select.addEventListener('click', (e) => {
                        e.stopPropagation();
                });

                /** *********************** */
                /* LEAFLET ROUTING */
                /** *********************** */
                L.Routing.control({
                        position: 'topright',
                        show: false,
                        waypoints: [
                                null,
                                // L.latLng(42.3606316223, -71.071416656),
                                // L.latLng(42.350451, -71.0795),
                        ],
                        showAlternatives: true,
                        lineOptions: {
                                styles: [{ color: '#319795', opacity: 1, weight: 3 }],
                        },
                        altLineOptions: {
                                styles: [
                                        { color: '#D68C45', opacity: 0.15, weight: 9 },
                                        { color: 'white', opacity: 0, weight: 3 },
                                        { color: '#D68C45', opacity: 1, weight: 3 },
                                ],
                        },
                        createMarker: (i, wp) => {
                                if (i === 0) {
                                        return L.marker(wp.latLng, {
                                                icon: L.icon.pulse({
                                                        iconUrl: 'https://unpkg.com/leaflet@1.9.2/dist/images/marker-icon-2x.png',
                                                        color: '#319795',
                                                        fillColor: '#319795',
                                                }),
                                                draggable: true,
                                                bounceOnAdd: false,
                                                bounceOnAddOptions: {
                                                        duration: 1000,
                                                        height: 800,
                                                },
                                        });
                                }
                                return L.marker(wp.latLng, {
                                        icon: L.icon({
                                                iconSize: [25, 41],
                                                iconAnchor: [12, 41],
                                                popupAnchor: [1, -34],
                                                iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                                                className: 'hueChangeTeal',
                                        }),
                                        draggable: true,
                                        bounceOnAdd: false,
                                        bounceOnAddOptions: {
                                                duration: 1000,
                                                height: 800,
                                        },
                                });
                        },
                        routeWhileDragging: true,
                        geocoder: L.Control.Geocoder.nominatim(),
                }).addTo(map);

                // HANDLING CLICKS ON MAP
                map.on('click', showForm);

                getLocalStorage();
        } catch (err) {
                return Promise.reject(err.message);
        }
};
await loadMap();

const findTrip = (e) => {
        if (!map) return;

        // DOM TRAVERSING
        const tripEl = e.target.closest('.trip');

        if (!tripEl) return; // ⛔️🎅🏽 Guard clause

        return trips.find((trip) => trip.id === tripEl.dataset.id); // returns a trip object
};

const deleteTrip = () => {
        const deleteBtns = document.querySelectorAll('.deleteBtn');
        // Add an event listener to each delete btn from the card drop down menu
        deleteBtns.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                        // find the trip to delete
                        const deleteSelectedTrip = findTrip(e);

                        // return the the trips arr with all the trips that does not match the delete trip id
                        trips = trips.filter((trip) => trip.id !== deleteSelectedTrip.id);

                        // set local storage
                        setLocalStorage();

                        // refresh / reload the page
                        location.reload();
                });
        });
};
deleteTrip();

const editTrip = () => {
        const editBtns = document.querySelectorAll('.editBtn');
        editBtns.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                        const selectedTrip = findTrip(e);
                        // delete trip you want to edit
                        trips = trips.filter((trip) => trip.id !== selectedTrip.id);

                        // set local storage
                        setLocalStorage();

                        // create a new trip with the old trip (deleted trip) values

                        // CONVERT WORKOUT COORDS ARRAY TO OBJECT TO FIT MAP EVENT FORMAT
                        const { coords } = selectedTrip;
                        const objCoords = {
                                latlng: {
                                        lat: coords[0],
                                        lng: coords[1],
                                },
                        };

                        showForm(objCoords);

                        inputTitle.value = selectedTrip.title;
                        inputRating.value = utilNum._croe(selectedTrip.rating);
                        inputStartDate.value = utilStr._fdoe(selectedTrip.startDate);
                        inputEndDate.value = utilStr._fdoe(selectedTrip.endDate);
                        inputDesc.value = selectedTrip.desc;

                        const trip = {
                                countryCode: selectedTrip.countryCode,
                                countryFlag: selectedTrip.countryFlag,
                                cityWeaIconPath: selectedTrip.cityWeaIconPath,
                                cityWeaDesc: selectedTrip.cityWeaDesc,
                                tripImg: selectedTrip.tripImg,
                        };
                        console.log(objCoords, trip.tripImg);

                        if (e.key === 'Enter') newWorkout(trip);
                });
        });
};
editTrip();

const moveToPopup = (e) => {
        const tripEl = findTrip(e);
        // if(!e.target.coords) return BUG return error 'tripsEl.coords is undefined' when the sidebar container is clicked
        map.flyTo(tripEl.coords, 13);
};

const setLocalStorage = () => localStorage.setItem('trips', JSON.stringify(trips));

const newWorkout = async (e) => {
        try {
                e.preventDefault();

                // Get data from form
                const id = uuid.v4();
                const titleValue = utilStr._trimStr(inputTitle.value);
                const title = utilStr._ctsc(titleValue);
                const rating = utilNum._cr(inputRating.value);
                const startDate = utilStr._fd(inputStartDate.value);
                const endDate = utilStr._fd(inputEndDate.value);
                const desc = inputDesc.value;
                const { lat, lng } = mapEvent.latlng;
                const geoData = await utilAsync._getGeoData(lat, lng);
                const countryCode = geoData.countryAbbrev;
                const countryFlag = geoData.flag;
                const city = utilStr._fcs(geoData.city);
                const cityCurWeather = await utilAsync._getCiCurWea(lat, lng);
                const cityWeaIconPath = cityCurWeather[0];
                const cityWeaDesc = cityCurWeather[1];
                const tripImgPath = await utilAsync._getUnSplashImg();
                const tripImg = tripImgPath;

                // Check if data is valid - the form already checks for valid inputs automatically

                // If data is valid create trip object
                const trip = {
                        id,
                        title,
                        rating,
                        startDate,
                        endDate,
                        desc,
                        coords: [lat, lng],
                        countryCode,
                        countryFlag,
                        city,
                        cityWeaIconPath,
                        cityWeaDesc,
                        tripImg,
                };

                // Add new trip object to trips array
                trips.push(trip);

                // Render trip on map as marker
                renderTripMarker(trip);

                // Render trip on list
                renderTrip(trip);

                // Hide form + clear input fields
                hideForm();

                // Set local storage to all trips
                setLocalStorage();

                // Reload page
                location.reload();
        } catch (err) {
                console.error(err);
        }
};

// EVENT LISTENERS
(() => {
        form.addEventListener('submit', newWorkout);
        document.querySelector('.form__btn').addEventListener('click', (e) => e.stopPropagation());
        containerTrips.addEventListener('click', moveToPopup);
        document.createElement('canvas').getContext('2d', { willReadFrequently: true });
        document.querySelector('.year').textContent = new Date().getFullYear();
})();
