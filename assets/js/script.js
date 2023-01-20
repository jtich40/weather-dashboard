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
    })
}