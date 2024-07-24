"use strict";

const API = "a2896902c04fe5f377053c781f4ecc4d";

const dayAll = document.querySelector('.day');
const dates = document.querySelector('.date');
const btn = document.querySelector('.btn');
const inputBox = document.querySelector('.inputbox');
const icons = document.querySelector('.icons');
const dayInfo = document.querySelector(".day-info");
const weatherCards = document.querySelector('.weather-cards')
const currentLocationBtn = document.getElementById('current-location-btn');
const cityDropdown = document.getElementById('city-dropdown');

const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];



//  display the date
const day = new Date();
const dayName = days[day.getDay()];
dayAll.textContent = dayName;



//display the date
let month = day.toLocaleString("default", {month:"long"});
let date = day.getDate();
let year = day.getFullYear();
dates.textContent = date +" " +month +" "+year;



// Load cities from local storage and populate the drop-down
document.addEventListener('DOMContentLoaded', () => {
    loadCitiesFromLocalStorage();
});




btn.addEventListener("click",(e)=>{
    e.preventDefault();
    // check a input box empty
    const search = inputBox.value.trim();
    if(search === ''){
        alert("Please Enter a City Name.");
    } else {
        inputBox.value = '';
        saveCityToLocalStorage(search);
        findLocation(search);
    }
});



// fetch current location button 

currentLocationBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
         findLocationByCoords(lat, lon);
        }, (error) => {
            alert("Error getting the current location: ", error);
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
});



cityDropdown.addEventListener("change", (e) => {
    const city = e.target.value;
    if (city) {
        findLocation(city);
    }
});


function saveCityToLocalStorage(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
        loadCitiesFromLocalStorage();
    }
}

function loadCitiesFromLocalStorage() {
    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cityDropdown.innerHTML = `<option value="">Select a city</option>`;
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        cityDropdown.appendChild(option);
    });
}


 async function findLocation(name){
     icons.innerHTML = "";
     dayInfo.innerHTML = "";
     weatherCards.innerHTML = "";

try{

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API}`;
    const data = await fetch(URL);
    const result = await data.json();
    console.log(result);
    
    if(result.cod !=="404"){
    const content = displayIconTemp(result);
    const showCurrentData = currentData(result);
    displayForecast(result.coord.lat,result.coord.lon);

    icons.insertAdjacentHTML("afterbegin",content);             
    dayInfo.insertAdjacentHTML("afterbegin",showCurrentData);             

    }else{
      const message =  `<h2 class="tem text-5xl font-bold p-5 my-8">${result.cod}</h2>
       
        <h3 class="cloud m-2 font-bold">${result.message}</h3>`;
        icons.insertAdjacentHTML("afterbegin",message);              
    }
}catch(error) {
    alert("An error occurred while fetching the weather forecast!");
}
}

// function to show current location weather

async function findLocationByCoords(lat, lon) {
    icons.innerHTML = "";
    dayInfo.innerHTML = "";
    weatherCards.innerHTML = "";

    try {
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API}`;
        const data = await fetch(URL);
        const result = await data.json();
        
        if (result.cod !== "404") {
            const content = displayIconTemp(result);
            const showCurrentData = currentData(result);
            displayForecast(lat, lon);
        
         icons.insertAdjacentHTML("afterbegin", content);             
         dayInfo.insertAdjacentHTML("afterbegin", showCurrentData);             
    
        } else {
            const message = `<h2 class="tem text-5xl font-bold p-5 my-8">${result.cod}</h2>
                             <h3 class="cloud m-2 font-bold">${result.message}</h3>`;
            icons.insertAdjacentHTML("afterbegin", message);              
        }
    } catch (error) {
        alert("An error occurred while fetching the weather forecast!");
    }
}





//  display content  icon and temprature

function displayIconTemp(result){
    return  `<img src="https://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png" alt="" class="m-6 p-6"/>
                        
             <h2 class="tem p-2 text-5xl font-bold">${Math.round(result.main.temp-275.15)}°C</h2>
       
             <h3 class="cloud m-2 font-bold">${result.weather[0].description}</h3>`;
}


// city current temp humidity wind speed

function currentData(result){
    return `  <div class="content flex justify-between">
              <p class="title">Name:</p>
              <span class="value">${result.name}</span>
              </div>
              
              <div class="content flex justify-between ">
              <p class="title">Temp:</p>
              <span class="value">${Math.round(result.main.temp-275.15)}°C</span>
              </div>
               
              <div class="content flex justify-between ">
              <p class="title">Humidity:</p>
              <span class="value">${result.main.humidity}%</span>
              </div>

              <div class="content flex justify-between">
              <p class="title">Wind Speed:</p>
              <span class="value">${result.wind.speed}M/S</span>
              </div>`;
}

 async function displayForecast(lat,long){
    const ForeCast_API = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API} `;
    const data = await fetch(ForeCast_API);
    const result = await data.json();
    const today = new Date();


    // 5 days data cards
    const foreCastDays = [];
     const foreCastDayData = result.list.filter((forecast)=>{
     const forecastDate = new Date(forecast.dt_txt);
     console.log(forecastDate);
     
    
     if (forecastDate > today && foreCastDays.length < 5 && !foreCastDays.includes(forecastDate.getDate())) {
     
                foreCastDays.push(forecastDate.getDate());
                return true;
                
    } 
    return false;
   
    }).sort((a, b) => new Date(a.dt_txt) - new Date(b.dt_txt)); 
      console.log(foreCastDayData);
      
      foreCastDayData.forEach(content => {
     
            weatherCards.insertAdjacentHTML("beforeend",foreCast(content));
     
      });
 }
 function foreCast(forContent){
    const day = new Date(forContent.dt_txt);
    let month = day.toLocaleString("default", {month:"long"});
    let date = day.getDate() + 1;
    let year = day.getFullYear();
    let dateData = date +" " +month +" "+year;

    return `  <li class="card p-1 text-xs bg-black border rounded-md leading-6">
              <h3>${dateData}</h3>
              <img src=" https://openweathermap.org/img/wn/${forContent.weather[0].icon}@2x.png">
              <h6>Temp:  ${Math.round(forContent.main.temp-275.15)}°C</h6>
              <h6>Wind:  ${forContent.wind.speed}M/S</h6>
              <h6>Humidity:  ${forContent.main.humidity}%</h6>
              </li>`;
 }