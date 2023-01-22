// global DOM variables
let cityInput = document.getElementById('city-input')
let searchBtn = document.getElementById('search-btn')
let searchHistory = []

// event listener when user enters city and clicks search button
searchBtn.addEventListener('click', function () {
    // grabs user input from city text field
    let city = cityInput.value

    // searchWeather function will only run if value is found in city text field
    if(city === "") {
        return
    } else {
        searchWeather(city)
        showSearchHistory(city)
        // addSearchHistory()
    }
})

// displays search history found in local storage
function showSearchHistory (search) {
    // adds latest search to search history array
    searchHistory.push(search)
    // save to local storage
    localStorage.setItem('search', JSON.stringify(searchHistory))

    // grabs previous searches from local storage
let storedHistory = JSON.parse(localStorage.getItem('search'))
if(storedHistory !== null) {
    storedHistory = searchHistory
}

// container element that includes buttons for each previous search
let searchHistoryContainer = document.getElementById('search-history')

// generate buttons for each previous search
for (let i = 0; i < searchHistory.length; i++) {
    const historyList = searchHistory[i];
    const historyBtn = document.createElement('button')
    historyBtn.setAttribute( 'class', 'btn btn primary')
    historyBtn.textContent = historyList
    searchHistoryContainer.appendChild(historyBtn)
}

}
// adds search to local storage
// function addSearchHistory () {
    // }
    
    // // function that grabs previous searches from local storage
    // function pullSearchHistory () {
        // }
        
        // function that displays current weather and forecast fetched from OpenWeather API
        function searchWeather(city) {
            let weatherApiKey = '542bb7e6d08fd71cf01b529cf638c811'
    // current weather root url, includes imperial unit query parameter
    let weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=imperial`
    fetch(weatherUrl)
    .then(function (res) {
        console.log(res)
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
        dateEl.innerText = dayjs(data.dt_txt).format('dddd, MMM D, YYYY')
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
        
        // 5-day forecast to be rendered to the container
        let futureWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=imperial`
        fetch(futureWeatherUrl)
        .then(function (res) {
            return res.json()
        })
        .then (function (data) {
            // set container for 5-day forecast
            let futureWeatherContainer = document.getElementById('five-day-forecast')
            console.log(data)
            // fetches weather data 
            for (let i = 0; i < data.list.length; i += 8) {
                const forecast = data.list[i];
                console.log(forecast)

                // iterates over future date
                let futureDateEl = document.createElement('span')
                futureDateEl.innerText = dayjs(forecast.dt_txt).format('dddd, MMM D, YYYY')
                futureWeatherContainer.appendChild(futureDateEl)

                // iterates over future weather condition icon
                let futureIconEl = document.createElement('img')
                futureIconEl.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
                futureWeatherContainer.appendChild(futureIconEl)

                // iterates over future temperature
                let futureTempEl = document.createElement('p')
                futureTempEl.innerText = 'Temperature: ' + forecast.main.temp + '°F'
                futureWeatherContainer.appendChild(futureTempEl)

                // iterates over future humidity
                let futureHumidityEl = document.createElement('p')
                futureHumidityEl.innerText = 'Humidity: ' + forecast.main.humidity + '%'
                futureWeatherContainer.appendChild(futureHumidityEl)

                // iterates over future wind speed
                let futureWindSpeedEl = document.createElement('p')
                futureWindSpeedEl.innerText = 'Wind Speed: ' + forecast.wind.speed + ' MPH'
                futureWeatherContainer.appendChild(futureWindSpeedEl)

            }
        })
    })
    // showSearchHistory()
}