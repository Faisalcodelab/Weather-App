async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '7568b528388a36cf6c6ce0faf0f4c545'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === '404') {
            document.getElementById('weatherInfo').innerHTML = 'City not found';
        } else {
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;
            const cityName = data.name;
            const country = data.sys.country;

            // Get weather icon code
            const weatherIcon = data.weather[0].icon;

            // Construct weather info HTML with icons
            const weatherInfo = `
                <div>
                    <i class="fas fa-map-marker-alt"></i> ${cityName}, ${country}
                </div>
                <div>
                    <i class="fas fa-thermometer-three-quarters"></i> Temperature: ${temperature}°C
                </div>
                <div>
                    <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="${weatherDescription}">
                    ${weatherDescription}
                </div>
            `;
            document.getElementById('weatherInfo').innerHTML = weatherInfo;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function validateInput() {
    const input = document.getElementById("cityInput");
    const value = input.value;

    // Regular expression to match only letters and spaces
    const regex = /^[a-zA-Z\s]+$/;

    // Check if the input matches the regular expression
    if (!regex.test(value)) {
        // Remove invalid characters from the input
        input.value = value.replace(/[^a-zA-Z\s]/g, '');
    }
}


