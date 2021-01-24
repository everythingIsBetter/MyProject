const weatherHd = document.querySelector(".js-weatherHd");
const weather = document.querySelector(".js-weather");

const API_KEY = "757c691fb959b415d3beadf769d943ab";
const COORDS = "coords";

function getWeather (lat, lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&unit=metric`
    ).then(function (response) {
    return response.json()
        console.log(response.json())
    }).then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weatherHd.innerHTML = "Weather now: "
        weather.innerHTML = `${temperature} @ ${place}`
    })
}

function saveCoords (coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSuccess (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError () {
    console.log("can't access!")
}

function askForCoords () {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords () {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init()
