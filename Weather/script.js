const apiKey = '255fac9e18f6080f95c22183684cf6ac'; // Replace with your actual OpenWeatherMap API key
const city = "City_Name";  // Replace with the city you're searching for
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

document.getElementById('getWeather').addEventListener('click', async function () {
    const city = document.getElementById('city').value.trim();
    
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastApiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const weatherResponse = await fetch(weatherApiUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData); // Log the API response to check for errors

        if (weatherData.cod !== 200) {
            alert("City not found! Error: " + weatherData.message);  // Display the error message
            return;
        }

        // Display current weather
        document.getElementById('cityName').innerText = weatherData.name;
        document.getElementById('weatherCondition').innerText = weatherData.weather[0].description;
        document.getElementById('temperature').innerText = weatherData.main.temp;
        document.getElementById('humidity').innerText = weatherData.main.humidity;
        document.getElementById('windSpeed').innerText = weatherData.wind.speed;

        // Show weather details section
        document.getElementById('weatherDetails').classList.remove('hidden');

        // Get forecast data
        const forecastResponse = await fetch(forecastApiUrl);
        const forecastData = await forecastResponse.json();
        console.log(forecastData); // Log the forecast data for debugging

        // Clear previous forecast
        const forecastDiv = document.getElementById('forecastDetails');
        forecastDiv.innerHTML = '';

        // Display 5-day forecast
        forecastData.list.filter((entry, index) => index % 8 === 0).forEach(entry => {
            const date = new Date(entry.dt * 1000);
            const day = date.toLocaleDateString();

            const forecastCard = document.createElement('div');
            forecastCard.innerHTML = `
                <h4>${day}</h4>
                <p>${entry.weather[0].description}</p>
                <p>Min: ${entry.main.temp_min}°C / Max: ${entry.main.temp_max}°C</p>
            `;

            forecastDiv.appendChild(forecastCard);
        });

        // Show forecast section
        document.getElementById('forecast').classList.remove('hidden');
    } catch (error) {
        console.log(error);
        alert("An error occurred while fetching weather data. Please try again.");
    }
});
