const cityCode = args[6]
if (secrets.GAO_WEATHER_API_KEY === "") {
    throw Error("No GAO_WEATHER_API_KEY is not set")
}

const API_KEY = secrets.GAO_WEATHER_API_KEY
const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${API_KEY}`;


const response = await Functions.makeHttpRequest({
    url,
})

if (response.error) {
    console.error(response.error)
    throw Error("API request failed")
}

console.log("response: ", response.data)
const temp = response.data.lives[0].temperature
return Functions.encodeInt256(Math.round(temp * 100))