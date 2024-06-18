export const setPlaceholderText = () => {
    const input = document.getElementById("searchBar__text");
    window.innerWidth < 400
        ? (input.placeholder = "City, State, Country")
        : (input.placeholder = "City, State, Country or Zip Code");
};

export const addSpinner = (element) => {
    animateButton(element);
    setTimeout(animateButton, 1000, element);
};

const animateButton = (element) => {
    element.classList.toggle("none");
    element.nextElementSibling.classList.toggle("block");
    element.nextElementSibling.classList.toggle("none");
};

export const displayError = (headerMsg, err) => {
    updateWeatherLocationHeader(headerMsg);
    updateScreenReaderConfirmation(err);
};

export const displayApiError = (statusCode) => {
    const properMsg = toProperCase(statusCode.message);
    updateWeatherLocationHeader(properMsg);
    updateScreenReaderConfirmation(`${properMsg}. Please try again.`);
};

const toProperCase = (text) => {
    const words = text.split(" ");
    const properWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return properWords.join(" ");
};

const updateWeatherLocationHeader = (message) => {
    const weatherLocation = document.getElementById("currentForecast__location");
    weatherLocation.textContent = message;
};

export const updateScreenReaderConfirmation = (message) => {
    const location = (document.getElementById("confirmation").textContent =
        message);
};

export const updateDisplay = async (weatherJson, locationObj) => {
    console.log(weatherJson.list);
    facadeDisplay();
    clearDisplay();
    const weatherClass = getWeatherClass(weatherJson.list[0]);

    facadeDisplay();
}

const facadeDisplay = () => {
    console.log("Facade Display");
    const cc = document.getElementById("currentForecast");
    cc.classList.toggle("zero-vis");
    cc.classList.toggle("fade-in");

    const sixDay = document.getElementById("dailyForecast");
    sixDay.classList.toggle("zero-vis");
    sixDay.classList.toggle("fade-in");
}

const clearDisplay = () => {

    const cc = document.getElementById("currentForecast__conditions");
    deleteContents(cc);

    const sixDay = document.getElementById("dailyForecast__contents");
    deleteContents(sixDay);
}

const deleteContents = (element) => {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

const getWeatherClass = (weatherJson) => {
    const weather = weatherJson.weather[0].main;
    const weatherClass = weather.toLowerCase();
    return weatherClass;
}