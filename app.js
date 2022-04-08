//setting API object from the weathermap website
const api = {
    key: 'b33de91983aa052d8e105258de20f3a5',
    base: "https://api.openweathermap.org/data/2.5/"
}

//setting variable from class in the DOM
const searchbox = document.querySelector('.search-box');
//adding an event listener to the searchbox variable
searchbox.addEventListener('keypress', setQuery);

//function to take in the keypress event, then send the value to getResults function
function setQuery(event){
    //keycode 13 is 'enter'
    if (event.keyCode === 13){
        getResults(searchbox.value);
    }
}

function getResults(query){
    if (!query) return;
    //fetch requests

    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let highlow = document.querySelector('.high-low');
    highlow.innerText = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C `;

}

function dateBuilder(d){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
