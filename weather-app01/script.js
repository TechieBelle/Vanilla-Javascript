const apiKey = "b1106032ce8a05849147714efb9c35fa";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBtn = document.querySelector(".search-field button");
console.log(searchBtn);
const input = document.querySelector(".search-field input");
console.log(input);
const weatherImage = document.querySelector(".weather-icon-display img");
console.log(weatherImage);
async function fetchDataFromAPI(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.queryelector(".weather-info").style.display = "none";
    } else {
      const data = await response.json();
      // Display city name
      document.querySelector(".city").innerText = data.name;
      // Display Temperature
      document.querySelector(".weather-degree").innerHTML = `${Math.round(
        data.main.temp
      )}°C`;
      // Display humidity value
      document.querySelector(".humidity-value").innerText = data.main.humidity;
      // Display Wind speed value
      document.querySelector(".windspeed").innerText =
        data.wind.speed + " km/h";

      // Display weather image

      if (data.weather[0].main === "Clouds") {
        weatherImage.src = "images/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherImage.src = "images/clear.png";
      } else if (data.weather[0].main === "Rain") {
        weatherImage.src = "images/rain.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherImage.src = "images/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherImage.src = "images/mist.png";
      } else if (data.weather[0].main === "Wind") {
        weatherImage.src = "images/wind.png";
      } else if (data.weather[0].main === "Humidity") {
        weatherImage.src = "images/humidity.png";
      } else if (data.weather[0].main === "Snow") {
        weatherImage.src = "images/snow.png";
      }

      document.querySelector(".weather-info").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }

   
   
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors, e.g., display a message to the user
  }
}

searchBtn.addEventListener("click", () => {
  fetchDataFromAPI(input.value);
});
