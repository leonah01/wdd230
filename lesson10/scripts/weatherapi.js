const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const city = "Fairbanks";
const units = "imperial";

const url = 'https://api.openweathermap.org/data/2.5/weather?q=Fairbanks&units=imperial&appid=5cd47f93c01582c7cb1ad371d17b1d74';

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      //console.log(data); 
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

function  displayResults(weatherData) {
    const fahrenheitTemp = weatherData.main.temp.toFixed(0);
    const celsiusTemp = ((fahrenheitTemp - 32) * 5/9).toFixed(0);
    currentTemp.innerHTML = `<strong>${fahrenheitTemp}°F (${celsiusTemp})°C</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
    const desc = weatherData.weather[0].description;
  
    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc;
}