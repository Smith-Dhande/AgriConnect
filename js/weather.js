const API_KEY = "d6607a2bdc45d0f149579922e28fa5ad";
    let tempElement = document.getElementById("temperature");
    let conditionElement = document.getElementById("condition");
    let feelslikeElement = document.getElementById("feelsLike");
    let humidityElement = document.getElementById("humidity");
    let windSpeedElement = document.getElementById("windSpeed");


    async function getWeather(city){

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

            document.getElementById("temperature").textContent =`${Math.round(data.main.temp)}°C`;
            document.getElementById("condition").textContent =data.weather[0].main;
            document.getElementById("feelsLike").textContent =`Feels Like: ${Math.round(data.main.feels_like)}°C`;
            document.getElementById("humidity").textContent =`${data.main.humidity}%`;
            document.getElementById("windSpeed").textContent =`${data.wind.speed} km/h`;
            document.getElementById("cityName").textContent =`${city} `;

    }
    let searchbtn = document.getElementById("searchBtn")
    searchbtn.addEventListener("click", () => {

        const city = document.getElementById("searchCity").value;

        getWeather(city);
    });
    window.addEventListener("DOMContentLoaded", () => {
        getWeather("Amravati");
    });