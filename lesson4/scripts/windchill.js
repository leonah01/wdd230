const Url = "https://api.openweathermap.org/geo/1.0/direct?q=Zimbabwe&limit=1&appid=5cd47f93c01582c7cb1ad371d17b1d74";

async function apiFetch() {
  try {
    const response = await fetch(Url);
    if (response.ok) {
      const data = await response.json();
      let lon = data[0]["lon"];
      let lat = data[0]["lat"];
      weatherFetch(lat, lon);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.log(error);
  }
}

async function weatherFetch(lat, lon) {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5cd47f93c01582c7cb1ad371d17b1d74`;
  try {
    const response2 = await fetch(weatherUrl);
    if (response2.ok) {
      const weatherData = await response2.json();
      const temperature = weatherData.main.temp;
      const windSpeed = weatherData.wind.speed;
      const windDeg = weatherData.wind.deg;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const humidity = weatherData.main.humidity;

      document.getElementById("temperature").innerHTML = temperature.toFixed(0);
      document.getElementById("windSpeed").innerHTML = windSpeed.toFixed(1);
      document.getElementById("windChill").innerHTML = windChill(temperature, windSpeed);
      document.getElementById("condition").innerHTML = weatherDescription;
      document.getElementById("weatherIcon").setAttribute("src", `https://openweathermap.org/img/wn/${weatherIcon}.png`);
      document.getElementById("weatherIcon").setAttribute("alt", weatherDescription);
      document.getElementById("humidity").innerHTML = humidity; 
    } else {
      throw Error(await response2.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function windChill(temperature, windSpeed) {
  const windChill = 13.12 + 0.6215 * temperature - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temperature * Math.pow(windSpeed, 0.16);
  return windChill.toFixed(0);
}

apiFetch();