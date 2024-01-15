document.addEventListener('DOMContentLoaded', function() {

let day = new Date().getDay();
const weekend = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
const CurrentDay = weekend[day];


const Month = ['January', 'Feburary' ,'March','April', 'May', 'June', 'July', 'August','September', 'October'
, 'November', 'December']
let MonthIndex = new Date().getMonth();
const CurrentMonth = Month[MonthIndex];


const CurrentDate = new Date().getDate();

const CurrentYear = new Date().getFullYear();

let Hours = new Date().getHours();

let Minutes = new Date().getMinutes();

Minutes = Minutes<10? `0${Minutes}` : Minutes;


let Greetings = document.querySelector('.greeting');

if (Hours >= 12 && Hours < 17) {
    // Good Afternoon
    Greetings.innerHTML = 'Good Afternoon!';
} else if (Hours >= 17 && Hours < 24) {
    // Good Evening
    Greetings.innerHTML = 'Good Evening!';
} else {
    // Good Morning
    Greetings.innerHTML = 'Good Morning!';
}


let Time = Hours>=12? `${Hours-12}:${Minutes} PM` : `${Hours}:${Minutes} AM`

if(Hours<10){
    Hours = `0${Hours}`
    // Time = "0"+ Time;
}


const FullDate = `${CurrentDay}, ${CurrentDate} ${CurrentMonth} ${CurrentYear} | ${Time}`
document.getElementById('time-date').innerHTML = FullDate;

    const button = document.getElementById('search-icon');
    const Input = document.getElementById('search-bar');
    var currentTime = new Date().toLocaleString({timeZone: 'Sydney/Australia'});
console.log(currentTime); // Displays the current time of New York City
  
    button.addEventListener('click', async(event) => {
        event.preventDefault();
      let cityname = Input.value ;
      Input.value = "";
    try{
        const response = await fetch(`http://localhost:5000/weather?q=${cityname}`, {
            method: 'GET', // You can specify other HTTP methods if needed
            headers: {
                'Content-Type': 'application/json',
                // Add any other headers you need
            },
            credentials: 'include', // This includes credentials (like cookies) in the request
        });

        const responseData = await response.json();
        const data = [responseData];

        // Process the received data as needed
    //   console.log(console.log(.forecast.forecastday[0].astro.sunrise))
      data.forEach((item)=>{
        document.querySelector('.content').innerHTML = `
        <div class="area-details">
            <h3 class="location">${item.location.name}</h3>
            <img id="weather-img" src="./Images/thunder.png" width="160px" height="150px" alt="">
            <h2 class="temp">${item.current.temp_c} &#8451</h2>
            <span class="condition">${item.current.condition.text}</span>
        </div>
        <div class="info">
            <p class="leftIcons"><img src="./Images/humidity-svgrepo-com.svg" class="icons"
                    alt="jpg">Humidity: ${item.current.humidity}</p>
            <p class="leftIcons"><img src="./Images/wind-svgrepo-com.svg" class="icons" alt=""> Wind: ${item.current.wind_kph}km/h</p>
            <p class="leftIcons"><img src="./Images/temperature-low-svgrepo-com.svg" class="icons"
                    alt="">Felt like: ${item.current.feelslike_c}</p>
        </div>
    </div>`

    document.querySelector('.hourly-details').innerHTML = `<div class="hourly-details">
    <div class="time-slot active">
        <p class="time-p">${Hours>=12? (Hours-12)+3+'PM' : Hours+3+'AM'}</p>
        <h3 class="time-h">${item.forecast.forecastday[0].hour[Hours-1].temp_c} &#8451</h3>
        <span>${item.forecast.forecastday[0].hour[6].condition.text}</span>
    </div>
    <div class="time-slot">
        <p class="time-p">${Hours>=12? (Hours-12)+6+'PM' : Hours+6+'AM'}</p>
        <h3 class="time-h">${item.forecast.forecastday[0].hour[6].temp_c} &#8451</h3>
        <span>${item.forecast.forecastday[0].hour[6].condition.text}</span>
    </div>
    <div class="time-slot">
        <p class="time-p">${Hours>=12? (Hours-12)+9+'PM' : Hours+9+'AM'}</p>
        <h3 class="time-h">${item.forecast.forecastday[0].hour[11].temp_c} &#8451</h3>
        <span>${item.forecast.forecastday[0].hour[11].condition.text}</span>
    </div>
    <div class="time-slot">
        <p class="time-p">${Hours>=12? (Hours-12)+12+'PM' : Hours+12+'AM'}</p>
        <h3 class="time-h">${item.forecast.forecastday[0].hour[14].temp_c} &#8451</h3>
        <span>${item.forecast.forecastday[0].hour[14].condition.text}</span>
    </div>
    <div class="time-slot">
        <p class="time-p">${Hours>=12? (Hours-12)+15+'PM' : Hours+15+'AM'}</p>
        <h3 class="time-h">${item.forecast.forecastday[0].hour[17].temp_c} &#8451</h3>
        <span>${item.forecast.forecastday[0].hour[17].condition.text}</span>
    </div>
</div>`

document.querySelector('.forecast').innerHTML = `
<!-- <div class="temperature"><span class="big-temp">20 &#8451</span> <span>Feels like 19 &deg</span></div> -->
<div class="other-details"><span><img src="./Images/sun.png" class="imgcast" width="25px" height="25px"
            alt="">Rise ${item.forecast.forecastday[0].astro.sunrise} | </span> <span><img src="./Images/time.png" class="imgcast" width="25px"
            height="25px" alt="">Set ${item.forecast.forecastday[0].astro.sunset}</span></div>
<div class="next-forecast">
    <div class="day1"><span  class="prediction">${weekend[day]}</span>
    <span class="temp-pre">${item.current.temp_c} &deg</span><span class="condition-pre">${item.current.condition.text}</span></div>
    <div class="day2"><span class="prediction">${weekend[day + 1]}</span>
    <span class="temp-pre">${item.forecast.forecastday[1].day.avgtemp_c} &deg</span><span class="condition-pre">${item.forecast.forecastday[1].day.condition.text}</span></div>
    <div class="day3"><span class="prediction">${weekend[day + 2]}</span>
    <span class="temp-pre">${item.forecast.forecastday[2].day.avgtemp_c} &deg</span><span class="condition-pre">${item.forecast.forecastday[2].day.condition.text}</span></div>
</div>`
const ImageSrc = document.getElementById('weather-img')
if(item.current.condition.text == 'Thunder'){
     ImageSrc.src = "./Images/thunder.png";
}
else if(item.current.condition.text == 'Sunny' ){
    ImageSrc.src = "./Images/sunny.png";
}
else if (item.current.condition.text == 'Rain'){
    ImageSrc.src = "./Images/rain.png";
}
else {
    ImageSrc.width = '220'
    ImageSrc.src = "./Images/cloudy.png";
    
}
      })
    }
    catch(error){
     console.log('Error Fetching the data',error)
    }
   });
   
});

