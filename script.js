window.addEventListener('load', function() {
  fetchWeatherData();

  setInterval(fetchWeatherData, 3600000);
});

function fetchWeatherData() {
  const cityElement = document.getElementById('city');
  const descriptionElement = document.getElementById('description');
  const temperatureElement = document.getElementById('temperature');
  const windSpeedElement = document.getElementById('wind-speed');
  const humidityElement = document.getElementById('humidity');

  const city = loadCityFromConfig();

  const apiKey = 'a61938d695c3f167a7cf95837082f742';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const weatherDescription = data.weather[0].description;
      const temperature = Math.round(data.main.temp - 273.15);
      const windSpeed = Math.round(data.wind.speed * 3.6);

      const humidity = data.main.humidity;

      cityElement.textContent = `Meteo a ${city}`;
      descriptionElement.textContent = `Description: ${weatherDescription}`;
      temperatureElement.textContent = `Temperature: ${temperature}°C`;
      windSpeedElement.textContent = `Vitesse du vent: ${windSpeed} km/h`;
      humidityElement.textContent = `Taux d'humidite: ${humidity}%`;
    })
    .catch(error => {
      console.log('Une erreur s\'est produite :', error);
    });
}

function loadCityFromConfig() {
  const config = {
    city: 'Persan'
  };

  return config.city;
}
