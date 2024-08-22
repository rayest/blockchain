// 高德的 weather API key
const API_KEY = "Your GAO weather API key"

async function main() {
    // 杭州的编码
    const cityCode= "330100"

    // get current weather
    const url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
}


main()