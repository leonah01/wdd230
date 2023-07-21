/*----------weather-----------*/
  
  
const API_KEY = "5cd47f93c01582c7cb1ad371d17b1d74";
const CITY_NAME = "Carlsbad";

// Fetch current weather data
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&units=imperial&appid=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch current weather data");
    }
    return response.json();
  })
  .then(data => {
    // Get the elements from the HTML
    const icon = document.querySelector("#icon");
    const temperature = document.querySelector("#temperature");
    const condition = document.querySelector("#condition");
    const humidity = document.querySelector("#humidity");

    // Update the HTML with the weather data
    if (icon) {
      icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    }
    if (temperature) {
      temperature.textContent = `${data.main.temp} °F`;
    }
    if (condition) {
      condition.textContent = data.weather[0].description;
    }
    if (humidity) {
      humidity.textContent = `Humidity ${data.main.humidity}%`;
    }
  })
  .catch(error => {
    console.error(error);
  });

// Fetch 3-day forecast data
fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY_NAME}&units=imperial&appid=${API_KEY}`)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to fetch forecast data");
    }
    return response.json();
  })
  .then(data => {
    // Get the elements from the HTML
    const day1Hi = document.querySelector("#day1Hi");
    const day1Lo = document.querySelector("#day1Lo");
    const day2Hi = document.querySelector("#day2Hi");
    const day2Lo = document.querySelector("#day2Lo");
    const day3Hi = document.querySelector("#day3Hi");
    const day3Lo = document.querySelector("#day3Lo");

    // Update the HTML with the forecast data
    if (day1Hi) {
      day1Hi.textContent = `${data.list[0].main.temp_max} °F`;
    }
    if (day1Lo) {
      day1Lo.textContent = `${data.list[0].main.temp_min} °F`;
    }
    if (day2Hi) {
      day2Hi.textContent = `${data.list[8].main.temp_max} °F`;
    }
    if (day2Lo) {
      day2Lo.textContent = `${data.list[8].main.temp_min} °F`;
    }
    if (day3Hi) {
      day3Hi.textContent = `${data.list[16].main.temp_max} °F`;
    }
    if (day3Lo) {
      day3Lo.textContent = `${data.list[16].main.temp_min} °F`;
    }
  })
  .catch(error => {
    console.error(error);
  });
function getWeatherIcon(icon){
	let icon_url = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    return icon_url;
};

function displayResults(data) {
    results = data;
    let condition = results.weather[0].description;
    condition = condition.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
    let icon = results.weather[0].icon;
    weatherIcon.src = getWeatherIcon(icon);
    weatherIcon.alt = condition;
    conditionId.textContent = condition;
    temp.textContent = `${Math.round(results.main.temp)}°F`;
    windSpeed.textContent = `${Math.round(results.wind.speed)} MPH`;
    windChill.textContent = calcWindChill(results.main.temp, results.wind.speed);
    humidity.textContent = `${results.main.humidity}%`;
  };

function displayForecast(data) {
    results = data;
    const extractTempData = results => {
        return results.list.reduce((acc, dataPoint) => {
          const date = new Date(dataPoint.dt * 1000);
          const day = date.getDate();
          const month = date.getMonth();
          const year = date.getFullYear();
      
          // If this is the first data point for this day,
          // initialize the temp_max and temp_min values.
          if (!acc[day]) {
            acc[day] = {
              temp_max: dataPoint.main.temp_max,
              temp_min: dataPoint.main.temp_min,
              month,
              year
            };
          } else {
            // Update the temp_max and temp_min values if necessary.
            acc[day].temp_max = Math.max(acc[day].temp_max, dataPoint.main.temp_max);
            acc[day].temp_min = Math.min(acc[day].temp_min, dataPoint.main.temp_min);
          }
      
          return acc;
        }, {});
      };
    
    const tempData = extractTempData(results);
      
    day1.textContent = new Date(results.list[1].dt * 1000).toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"});
    day2.textContent = new Date(results.list[9].dt * 1000).toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"});
    day3.textContent = new Date(results.list[17].dt * 1000).toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"});

    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const tomorrowDayOfMonth = tomorrow.getDate();
    let { temp_max, temp_min } = tempData[tomorrowDayOfMonth];
    day1Hi.textContent = `${temp_max}`;
    day1Lo.textContent = `${temp_min}`;

    const dayAfterTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2);
    const dayAfterTomorrowDayOfMonth = dayAfterTomorrow.getDate();
    ({ temp_max, temp_min } = tempData[dayAfterTomorrowDayOfMonth]);
    day2Hi.textContent = `${temp_max}`;
    day2Lo.textContent = `${temp_min}`;

    const dayAfterDayAfterTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3);
    const dayAfterDayAfterTomorrowDayOfMonth = dayAfterDayAfterTomorrow.getDate();
    ({ temp_max, temp_min } = tempData[dayAfterDayAfterTomorrowDayOfMonth]);
    day3Hi.textContent = `${temp_max}`;
    day3Lo.textContent = `${temp_min}`;
  };

function calcWindChill(t, s) {
  if (t <= 50 && s > 3){
      const wind_chill = Math.round(
          35.74 + 0.6215 * t - 35.75 * s **0.16 + 0.4275 * t * s ** 0.16);
      return `${wind_chill}°F`;
  } else {
      return "N/A";
  };
};

getWeather(urlCurrent);

getForecast(urlForecast);