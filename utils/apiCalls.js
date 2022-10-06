import {_ctkc} from '/utils/formatStr'

const bookFlightMenu = document.querySelector('.book-flight-btn__select');

// GET GEOLOCATION
const getPosition = () =>
        new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
        });

const getGeoLocationData = async (lat, lng) => {
    try {
        const key = '528c5dcffdab43848fa6c11bfb7a2545' 
        
        // Reverse Geocoding
        const resGeo = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${key}`)
        if (!resGeo.ok) throw new Error(`Problem getting location data`);
        const dataGeo = await resGeo.json();
        
        return dataGeo.results[0]

        } catch (err) {
            return Promise.reject(err.message); 
        }
}

const renderCheckFlightMenu = async () => {
    try {
        const pos = await getPosition()
        const { latitude: lat, longitude: lng } = pos.coords;

        const locationData = await getGeoLocationData(lat, lng)
        
        const countryCode = await fetch(`https://restcountries.com/v3.1/alpha/${locationData.country_code}`);
        if (!countryCode.ok) throw new Error(`Problem getting country data`);
        const countryData = await countryCode.json();

        const resCountryName = countryData[0].name.common

        const res = await fetch(`https://restcountries.com/v3.1/all`);
        if (!res.ok) throw new Error(`Problem getting country data`);
        const data = await res.json();

        const countryNames = data.map(country => {
            return `${country.flag} ${country.name.common}`;
        }).sort()

        let output = '<option disabled selected value>Book Flight</option>';
        countryNames.forEach((country) => {
        output += `<option value="https://www.kiwi.com/en/search/tiles/${_ctkc(resCountryName)}/${_ctkc(country.slice(5, country.length).trim().toLowerCase())}">${country}</option>`;
        bookFlightMenu.innerHTML = output;
        });
    }
    catch (err) {
        return Promise.reject(err.message); 
    }
};

export { getPosition as _getPos, renderCheckFlightMenu as _renderCFMenu };
