const API_KEY = "d6607a2bdc45d0f149579922e28fa5ad";

const locationInput = document.getElementById("locationInput");
const tempElement = document.getElementById("temperature");
const conditionElement = document.getElementById("condition");
const feelslikeElement = document.getElementById("feelsLike");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("windSpeed");
const locationElement = document.getElementById("location");
const cityNameElement = document.getElementById("cityName");
const searchInput = document.getElementById("searchCity");
const searchBtn = document.getElementById("searchBtn");

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found!");
            return;
        }

        tempElement.textContent =
            `${Math.round(data.main.temp)}°C`;

        conditionElement.textContent =
            data.weather[0].main;

        feelslikeElement.textContent =
            `Feels Like: ${Math.round(data.main.feels_like)}°C`;

        humidityElement.textContent =
            `${data.main.humidity}%`;

        windSpeedElement.textContent =
            `${data.wind.speed} km/h`;

        locationElement.textContent =
            data.name;

        cityNameElement.textContent =
            data.name;

    }
    catch (error) {

        console.error(error);

        alert(
            "Unable to fetch weather data. Please try again."
        );

    }
}

/* Search Button */

searchBtn.addEventListener("click", () => {

    const city = searchInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    getWeather(city);

    searchInput.value = "";

});

/* Enter Key Support */


locationInput.addEventListener("keydown", (event) => {

    if(event.key === "Enter"){

        const city =
            locationInput.value.trim();

        if(city !== ""){
            getWeather(city);
        }

        locationInput.style.display = "none";

        locationElement.style.display = "block";
    }

});

// on clicking outside
locationInput.addEventListener("blur", () => {

    const city =
        locationInput.value.trim();

    if(city !== ""){
        getWeather(city);
    }

    locationInput.style.display = "none";

    locationElement.style.display = "block";

});



//

locationElement.addEventListener("click", () => {

    locationInput.value = locationElement.textContent;

    locationElement.style.display = "none";

    locationInput.style.display = "block";

    locationInput.focus();

});

/* Default Weather On Page Load */

window.addEventListener("DOMContentLoaded", () => {

    getWeather("Amravati");

});