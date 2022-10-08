import * as utilStr from '/utils/formatStr'
import * as utilNum from '/utils/numericConversion'

const bookFlightMenu = document.querySelector('.book-flight-btn__select');

// GET USER CUR POSITION - FIRST CLASS FUNCTION
const getPosition = () =>
        new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
        });

// REVERSE GEO CODING LOCATION OBJECT - FIRST CLASS FUNCTION
const getGeoLocationObject = async (lat, lng) => {
    try {
        const key = '528c5dcffdab43848fa6c11bfb7a2545' 
        
        // Reverse Geocoding
        const resGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${key}`)
        if (!resGeo.ok) throw new Error(`Problem getting location data`);
        const dataGeo = await resGeo.json();

        return dataGeo.results[0] // returns an object

    } catch (err) {
        console.log(err.message);
            return ''
        }
}

// COUNTRY NAME
const getCountryName = async (lat, lng) => {
    try {
        const location = await getGeoLocationObject(lat, lng);
        
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${location.country_code}`);
        if (!res.ok) throw new Error(`Problem getting country data`);
        const data = await res.json();
        return data[0].name.common
    }
    catch (err) {
        console.log(err.message);
        return ''
    }
}

await getCountryName(48.864716, 2.349014)

// COUNTRY ABBREV
const getCountryCode = async (lat, lng) => {
    try {
        const location = await getGeoLocationObject(lat, lng)
        return location.country_code
    }
    catch (err) {
        console.log(err.message);
        return ''
    }
}

// COUNTRY FLAG
const getCountryFlag = async (lat, lng) => {
    try {
        const location = await getGeoLocationObject(lat, lng);
        
        const res = await fetch(`https://restcountries.com/v3.1/alpha/${location.country_code}`);
        if (!res.ok) throw new Error(`Problem getting country data`);
        const data = await res.json();

        return data[0].flag
    }
    catch (err) {
        console.log(err.message);
        return ''
    }
}

// CITY NAME
const getCityName = async (lat, lng) => {
    try {
        const location = await getGeoLocationObject(lat, lng)
        if (!location.city) return ''// ⛔️🎅🏽 Guard clause 
        return utilStr._fcs(location.city)
    }
    catch (err) {
        console.log(err.message);
        return ''
    }
}

// CITY CUR WEATHER
const getCityCurWeather = async (lat, lng) => {
    try {
        const location = await getGeoLocationObject(lat, lng)

        const myKey = '1db6ec5257aa7458bd25e359a7102c19'

        const resWeather = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=${location.lat}&lon=${location.lon}&appid=${myKey}`);
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

// COUNTRIES LOOKUP FLIGHT MENU
const renderCheckFlightMenu = async () => {
    try {
        const pos = await getPosition()
        const { latitude: lat, longitude: lng } = pos.coords;

        const location = await getGeoLocationObject(lat, lng) // 💡1️⃣ passes getGeoLocationObject() first class function which returns an object as a variable
        
        const resCountry = await fetch(`https://restcountries.com/v3.1/alpha/${location.country_code}`); // 💡12️⃣ get values from the getGeoLocationObject() first class function variable (location) by using dot notation
        if (!resCountry.ok) throw new Error(`Problem getting country data`);
        const dataCountry = await resCountry.json();

        const locationCountryName = dataCountry[0].name.common

        const res = await fetch(`https://restcountries.com/v3.1/all`);
        if (!res.ok) throw new Error(`Problem getting country data`);
        const data = await res.json();

        const countryNames = data.map(country => {
            return `${country.flag} ${country.name.common}`;
        }).sort()

        let output = '<option disabled selected value>LOOKUP Flights</option>';
        countryNames.forEach((country) => {
        output += `<option value="https://www.kiwi.com/en/search/tiles/${utilStr._ctkc(locationCountryName)}/${utilStr._ctkc(country.slice(5, country.length).trim().toLowerCase())}">${country}</option>`;
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

        console.log(data[rndIndex].urls.full);
        
        return imgPath 

    } catch (err) {
        console.log(err.message);
            return ''
        }
}

export { getPosition as _getPos, getCountryName as _getCNm, getCountryCode as _getCC,  getCountryFlag as _getCF, getCityName as _getCiNm, getCityCurWeather as _getCiCurWea, renderCheckFlightMenu as _renderCFMenu, getRndUnsplashImg as _getUnSplashImg};


