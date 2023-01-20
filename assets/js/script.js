// global DOM variables
let cityInput = document.getElementById('city-input')
let searchBtn = document.getElementById('search-btn')

// event listener when user enters city and clicks search button
searchBtn.addEventListener('click', function () {
    // grabs user input from city text field
    let city = cityInput.value
    // searchWeather function will only run if value is found in city text field
    if(city === "") {
        return
    } else
    searchWeather(city)
})
// function that displays current weather and forecast fetched from OpenWeather API
function searchWeather(city) {
    let weatherApiKey = '542bb7e6d08fd71cf01b529cf638c811'
    // current weather root url, includes imperial unit query parameter
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`
    fetch(weatherUrl)
    .then(function (res) {
        return res.json()
    })
    .then(function (data) {
        console.log(data)
        // container element that will include all current weather info
        let currentWeatherContainer = document.getElementById('current-weather')
        // city information to be displayed
        let cityEl = document.createElement('span')
        cityEl.innerText = data.name
        currentWeatherContainer.appendChild(cityEl)
        // current date to be displayed
        let dateEl = document.createElement('span')
        dateEl.innerText = data.dt
        currentWeatherContainer.appendChild(dateEl)
        // icon representing weather condition to be displayed
        let iconEl = document.createElement('img')
        iconEl.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        currentWeatherContainer.appendChild(iconEl)
        // current temperature to be displayed
        let tempEl = document.createElement('p')
        tempEl.innerText = 'Temperature: ' + data.main.temp + '°F'
        currentWeatherContainer.appendChild(tempEl)
        // current humidity to be displayed
        let humidityEl = document.createElement('p')
        humidityEl.innerText = 'Humidity: ' + data.main.humidity + '%'
        currentWeatherContainer.appendChild(humidityEl)
        // current wind speed to be displayed
        let windSpeedEl = document.createElement('p')
        windSpeedEl.innerText = 'Wind Speed: ' + data.wind.speed + ' MPH'
        currentWeatherContainer.appendChild(windSpeedEl)
    })
}