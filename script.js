const apiKey = 'c89391a8291e6ee2ce720243ead6f85d';

const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherDisplay = document.getElementById('weatherDisplay');

searchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    console.log('City searched:', city);
    if(city) {
        fetchWeatherData(city);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    console.log('Fetch URL:', url);

    fetch(url)
        .then(response => {
            console.log('Response status:', response.status);
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            console.log('API data:', data);
            displayWeatherData(data);
        })
        .catch(error => {
            console.error('Fetch error:', error);
            weatherDisplay.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
}

function displayWeatherData(data) {
    const { name, sys, main, weather } = data;
    const { country } = sys;
    const { temp, humidity } = main;
    const { description, icon } = weather[0];

    weatherDisplay.innerHTML = `
        <h2>Weather in ${name}, ${country}</h2>
        <p><strong>Temperature:</strong> ${temp} °C</p>
        <p><strong>Condition:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}" />
    `;
}
