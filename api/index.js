import * as utilStr from '/utils/formatStr'
import * as utilNum from '/utils/numericConversion'

const bookFlightMenu = document.querySelector('.book-flight-btn__select');

// GET USER CUR POSITION - FIRST CLASS FUNCTION
const getPosition = () =>
        new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
        });

// REVERSE GEO CODING LOCATION OBJECT - FIRST CLASS FUNCTION
const getGeoLocationJSON = async (lat, lng) => {
    try {
        const key = '528c5dcffdab43848fa6c11bfb7a2545';
        
        // Reverse Geocoding
        const resGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${key}`);
        if (!resGeo.ok) throw new Error(`Problem getting location data`); // ⛔️🎅🏽 Guard clause
        const dataGeo = await resGeo.json();

        // Country code
        const country_code  = dataGeo.results[0]?.country_code ?? 'Unavailable';

        // Fetch location data: country name, city, flag etc
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${country_code}`);
        if (!res.ok) throw new Error(`Problem getting country data`);
        const data = await res.json();

        const countryAbbrev = country_code
        const countryName = data[0]?.name?.common ?? 'Unavailable'
        const city  = dataGeo.results[0]?.city ?? 'Unavailable'
        const flag = data[0]?.flag ?? 'Unavailable'
        const latitude = lat 
        const longitude  = lng 

        return {countryAbbrev, countryName, city, flag, latitude, longitude}; // returns an object

    } catch (err) {
            console.log(err.message);
            return ''
        }
}

// CITY CUR WEATHER
const getCityCurWeather = async (lat, lng) => {
    try {
        const geoData = await getGeoLocationJSON(lat, lng);

        const myKey = '1db6ec5257aa7458bd25e359a7102c19'

        const resWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${geoData.latitude}&lon=${geoData.longitude}&appid=${myKey}`);
        if (!resWeather.ok) throw new Error(`Problem getting location data`);
        const dataWeather = await resWeather.json();
        if (!dataWeather) return

        return [`https://openweathermap.org/img/wn/${dataWeather.current.weather[0].icon}@2x.png`, `${dataWeather.current.weather[0].description}`]
    }
    catch (err) {
        console.log(err.message);
        return ''
    }
}

// LOOKUP FLIGHTS TO OTHER COUNTRIES BASED ON THE USER CUR POS 
const renderCheckFlightMenu = async () => {
    try {
        const pos = await getPosition()
        const { latitude: lat, longitude: lng } = pos.coords;

        const geoData = await getGeoLocationJSON(lat, lng);

        const posCountryName = geoData.countryName

        // Get all the countries names and create a selection menu then render it on the ui
        const res = await fetch(`https://restcountries.com/v3.1/all`);
        if (!res.ok) throw new Error(`Problem getting country data`);
        const data = await res.json();

        const countryNames = data.map(country => {
            return `${country.flag} ${country.name.common}`;
        }).sort()

        let output = '<option disabled selected value>book trip</option>';
        countryNames.forEach((country) => {
        output += `<option value="https://www.kiwi.com/en/search/tiles/${utilStr._ctkc(posCountryName)}/${utilStr._ctkc(country.slice(5, country.length).trim().toLowerCase())}">${country}</option>`;
        bookFlightMenu.innerHTML = output;
        });
    }
    catch (err) {
        console.log(err.message);
        return ''
    }
};

// UNSPLASH RANDOM IMAGE
const getRndUnsplashImg = async () => {
    try {
        const accessKey = '92MhZXBYZ32qrYaz6K9ZS_7x6HjAo7TrqHWgSvFNc4U' 
        
        const res = await fetch(`https://api.unsplash.com/collections/nOMRmitGW64/photos/?per_page=30&client_id=${accessKey}`)
        if (!res.ok) throw new Error(`Problem getting image data`);
        const data = await res.json();

        const rndIndex = utilNum._rndInt(0, 29)
        const imgPath = data[rndIndex].urls.full
        
        return imgPath 

    } catch (err) {
        console.log(err.message);
            return ''
        }
}

export { getPosition as _getPos, getGeoLocationJSON as _getGeoData, getCityCurWeather as _getCiCurWea, renderCheckFlightMenu as _renderCFMenu, getRndUnsplashImg as _getUnSplashImg};
