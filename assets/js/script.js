// global DOM variables
let cityInput = document.getElementById('city-input')
let searchBtn = document.getElementById('search-btn')
let searchHistoryContainer = document.getElementById('search-history')
let currentWeatherContainer = document.getElementById('current-weather')
let futureWeatherContainer = document.getElementById('five-day-forecast')
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
// event listener for search history buttons
searchHistoryContainer.addEventListener('click', function (element) {
    if (!element.target.matches('#history-btn')) {
        return
    }
    let histBtn = element.target
    let pastSearch = histBtn.getAttribute('data-search')
    searchWeather(pastSearch)
})

// displays search history found in local storage
function showSearchHistory(search) {
    
    // grabs previous searches from local storage
    let storedHistory = JSON.parse(localStorage.getItem('search'))

    // add previous searches in local storage to array before adding new searches
    if(storedHistory != null) {
        searchHistory = storedHistory
    }
        // adds latest search to search history array if it is not null and is unique
        if (search != null && !searchHistory.includes(search)) {
            searchHistory.push(search)
        }
    // save to local storage
    localStorage.setItem('search', JSON.stringify(searchHistory))


    // clears container before subsequent search to prevent duplicate buttons
    searchHistoryContainer.textContent = ""

    // generate buttons for each previous search
    for (let i = 0; i < searchHistory.length; i++) {
        if(searchHistory[i] != null) {
        const historyList = searchHistory[i];
        const historyBtn = document.createElement('button')
        // add class for style
        historyBtn.setAttribute('class', 'btn btn-secondary mb-2')
        // adds id to grab in search history button event listener
        historyBtn.setAttribute('id', 'history-btn')
        // allows city input to be grabbed in search history event listener
        historyBtn.setAttribute('data-search', searchHistory[i])
        historyBtn.textContent = historyList
        searchHistoryContainer.appendChild(historyBtn)
        }
    }
}
        
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

        // clears container before subsequent search to prevent past city's weather from showing up
        currentWeatherContainer.textContent = ""

        currentWeatherContainer.setAttribute('class', 'current-weather-container d-flex flex-column justify-content-start text-center border rounded p-3 card mt-4')


        // city information to be displayed
        let cityEl = document.createElement('h3')
        cityEl.innerText = data.name
        currentWeatherContainer.appendChild(cityEl)

        // current date to be displayed
        let dateEl = document.createElement('p')
        dateEl.innerText = dayjs(data.dt_txt).format('dddd, MMM D, YYYY')
        currentWeatherContainer.appendChild(dateEl)

        // icon representing weather condition to be displayed
        let wrapperIcon = document.createElement('div')
        wrapperIcon.setAttribute('class', 'text-center')
        let iconEl = document.createElement('img')
        iconEl.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        wrapperIcon.appendChild(iconEl)
        currentWeatherContainer.appendChild(wrapperIcon)

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
        
    // 5-day forecast to be rendered to the container
    let futureWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApiKey}&units=imperial`
    fetch(futureWeatherUrl)
    .then(function (res) {
        return res.json()
    })
    .then (function (data) {
        
        console.log(data)

        // clears container before subsequent search to prevent past city's weather from showing up
        futureWeatherContainer.textContent = ""

        // fetches weather data 
        for (let i = 5; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            console.log(forecast)
            // create wrapper for styling
            let wrapper = document.createElement('div')
            wrapper.setAttribute('class', 'future-weather-container card text-center border border-1 rounded p-4 justify-content-center')

            // iterates over future date
            let futureDateEl = document.createElement('h3')
            futureDateEl.innerText = dayjs(forecast.dt_txt).format('dddd, MMM D, YYYY')
            wrapper.appendChild(futureDateEl)

            // iterates over future weather condition icon
            let wrapperIcon = document.createElement('div')
        wrapperIcon.setAttribute('class', 'text-center')
            let futureIconEl = document.createElement('img')
            futureIconEl.src = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
            wrapperIcon.appendChild(futureIconEl)
            wrapper.appendChild(wrapperIcon)

            // iterates over future temperature
            let futureTempEl = document.createElement('p')
            futureTempEl.innerText = 'Temperature: ' + forecast.main.temp + '°F'
            wrapper.appendChild(futureTempEl)

            // iterates over future humidity
            let futureHumidityEl = document.createElement('p')
            futureHumidityEl.innerText = 'Humidity: ' + forecast.main.humidity + '%'
            wrapper.appendChild(futureHumidityEl)

            futureWeatherContainer.appendChild(wrapper)
        }
    })
}
// call function to display search history after page refresh
showSearchHistory()