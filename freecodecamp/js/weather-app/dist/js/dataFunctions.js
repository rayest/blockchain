const WEATHER_API_KEY = "8f13bdb8bfcb7cd5e8aeb367ac53bae0"

export const setLocationObject = (locationObj, coordsObj) => {
    const { lat, lon, name, unit } = coordsObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
}

export const getHomeLocation = () => {
    return localStorage.getItem('defaultWeatherLocation');
}

export const cleanText = (text) => {
    console.log(text);
    const regex = / {2,}/g; // Remove extra spaces
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
}

export const getCoordsFromApi = async (entryText, units) => {
    const regrex = /^\d+$/g; // Check if entry is a zip code
    const flag = regrex.test(entryText) ? 'zip' : 'q';
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&appid=${WEATHER_API_KEY}&units=${units}`;
    const encodedUrl = encodeURI(url);

    try {
        const response = await fetch(encodedUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return response.status;
        }
    } catch (err) {
        console.error(err.stack);

    }

}

export const getWeatherFromCoords = async (locationObj) => { 
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const unit = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${unit}`;
    const encodedUrl = encodeURI(url);
    try {
        const response = await fetch(encodedUrl);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return response.status;
        }
    } catch (err) {
        console.error(err.stack);
    }
}