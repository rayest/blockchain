import CurrentLocation from "./CurrentLocation.js";
import {
    addSpinner,
    displayError,
    updateScreenReaderConfirmation,
    displayApiError,
    setPlaceholderText,
    updateDisplay,
} from "./domFunctions.js";
import {
    setLocationObject,
    getHomeLocation,
    cleanText,
    getCoordsFromApi,
    getWeatherFromCoords,

} from "./dataFunctions.js";

const currentLocation = new CurrentLocation();

const initApp = () => {
    console.log("App initialized");

    // add listeners
    const geoButton = document.getElementById("getLocation");
    geoButton.addEventListener("click", getGeoWeather);

    const homeButton = document.getElementById("home");
    homeButton.addEventListener("click", loadWeather);
    loadWeather();

    const saveButton = document.getElementById("saveLocation");
    saveButton.addEventListener("click", saveLocation);

    const unitButton = document.getElementById("unit");
    unitButton.addEventListener("click", seUntPref);

    const refreshButton = document.getElementById("refresh");
    refreshButton.addEventListener("click", refreshWeather);

    const locationEntry = document.getElementById("searchBar__form");
    locationEntry.addEventListener("submit", submitNewLocation);

    setPlaceholderText();
};

document.addEventListener("DOMContentLoaded", initApp); // when the page is loaded, run initApp

const getGeoWeather = (event) => {
    if (event) {
        if (event.type === "click") {
            const mapIcon = document.querySelector(".fa-map-marker-alt");
            addSpinner(mapIcon); // 添加旋转动画
        }
    }

    if (!navigator.geolocation) {
        geoError();
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};

const geoError = (errorObj) => {
    const errMsg = errorObj ? errorObj.message : "Geolocation error";
    displayError(errMsg, errMsg);
};

const geoSuccess = (position) => {
    const myCoords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
        name: `Lat: ${position.coords.latitude}, Long: ${position.coords.longitude}`,
    };

    // set location data
    setLocationObject(currentLocation, myCoords);

    // update
    updateDataAndDisplay(currentLocation);
};

const loadWeather = (event) => {
    const savedLocation = getHomeLocation();
    if (!savedLocation && !event) {
        return getGeoWeather();
    }

    if (!savedLocation && event.type === "click") {
        displayError("No location saved", "Sorry. Please ....");
    } else if (savedLocation && !event) {
        displayHomeLocationWeather(savedLocation);
    } else {
        const homeIcon = document.querySelector(".fa-home");
        addSpinner(homeIcon);
        displayHomeLocationWeather(savedLocation);
    }
};

const displayHomeLocationWeather = (home) => {
    if (typeof home === "string") {
        const locationJson = JSON.parse(home);
        const myCoordsObj = {
            lat: locationJson.lat,
            lon: locationJson.lon,
            name: locationJson.name,
            unit: locationJson.unit,
        };

        setLocationObject(currentLocation, myCoordsObj);
        updateDataAndDisplay(currentLocation);
    }
};

const saveLocation = () => {
    if (currentLocation.getLat() && currentLocation.getLon()) {
        const saveIcon = document.querySelector(".fa-save");
        addSpinner(saveIcon);
        const location = {
            lat: currentLocation.getLat(),
            lon: currentLocation.getLon(),
            name: currentLocation.getName(),
            unit: currentLocation.getUnit(),
        };

        localStorage.setItem("defaultWeatherLocation", JSON.stringify(location));
        updateScreenReaderConfirmation("Location saved");
    }
};

const seUntPref = () => {
    const unitIcon = document.querySelector(".fa-chart-bar");
    addSpinner(unitIcon);
    currentLocation.toggleUnit();
    updateDataAndDisplay(currentLocation);
};

const refreshWeather = () => {
    const refreshIcon = document.querySelector(".fa-sync-alt");
    addSpinner(refreshIcon);
    updateDataAndDisplay(currentLocation);
};

const submitNewLocation = async (event) => {
    event.preventDefault();
    const text = document.getElementById("searchBar__text").value;
    const entryText = cleanText(text);
    if (!entryText.length) {
        return;
    }

    const searchIcon = document.querySelector(".fa-search");
    addSpinner(searchIcon);
    const coordsData = await getCoordsFromApi(
        entryText,
        currentLocation.getUnit()
    );
    if (coordsData) {
        console.log(coordsData);
        if (coordsData.cod === 200) {
            const myCoords = {
                lat: coordsData.coord.lat,
                lon: coordsData.coord.lon,
                name: coordsData.sys.country ? `${coordsData.name}, ${coordsData.sys.country}` : coordsData.name,
            };
            setLocationObject(currentLocation, myCoords);
            updateDataAndDisplay(currentLocation);
        } else {
            displayApiError(coordsData);
        }
    } else {
        displayError("Connection error", "Connection error");
    }
};

const updateDataAndDisplay = async (locationObj) => {
    const weatherJson = await getWeatherFromCoords(locationObj);
    if (weatherJson) {
        updateDisplay(weatherJson, locationObj);
    }
};
