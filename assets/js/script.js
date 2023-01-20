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
