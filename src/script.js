"use strict";

const API = "a2896902c04fe5f377053c781f4ecc4d";

const dayAll = document.querySelector('.day');
const dates = document.querySelector('.date');
const btn = document.querySelector('.btn');
const inputBox = document.querySelector('.inputbox');
const icons = document.querySelector('.icons');



const days = [ "Sunday",
               "Monday",
               "Tuesday",
               "Wednesday",
               "Thursday",
               "Friday",
               "Saturday",
                
];

//  display the date

const day = new Date();
const dayName = days[day.getDay()];
dayAll.textContent = dayName;

//display the date

let month = day.toLocaleString("default", {month:"long"});
let date = day.getDate();
let year = day.getFullYear();
dates.textContent = date +" " +month +" "+year;


btn.addEventListener("click",(e)=>{
    e.preventDefault();

    // check a input box empty
    if(inputBox !== ""){
        const search = inputBox.value;
        inputBox.value = '';
        findLocation(search);
    }
    else {
        console.log("Please Enter City or Country Name");
    }
});



async function findLocation(name){

    icons.innerHTML = "";
try{

    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${name}&appid=${API}`;
    const data = await fetch(URL);
    const result = await data.json();
    console.log(result);
    
    if(result.cod !=="404"){
    const content = displayIconTemp(result);
     icons.insertAdjacentHTML("afterbegin",content);              

    }else{
      const message =  `<h2 class="tem text-5xl font-bold p-5 my-8">${result.cod}</h2>
       
        <h3 class="cloud m-2 font-bold">${result.message}</h3>`;
        icons.insertAdjacentHTML("afterbegin",message);              

    }
   

}catch(error) {}

}


//  display content  icon and temprature

function displayIconTemp(result){
    return  `<img src="https://openweathermap.org/img/wn/${result.list[0].weather[0].icon}@2x.png" alt="" class="m-6 p-6"/>
                        
             <h2 class="tem p-2 text-5xl font-bold">${Math.round(result.list[0].main.temp-275.15)}°C</h2>
       
             <h3 class="cloud m-2 font-bold">${result.list[0].weather[0].description}</h3>`;
}