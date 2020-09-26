var i=0;
function fetchcities(){
Promise.all([
	fetch('https://api.openweathermap.org/data/2.5/weather?q=London&appid=f14977b8612b062bf492c3c5d1ff78d3'),
	fetch('https://api.openweathermap.org/data/2.5/weather?q=Paris&appid=f14977b8612b062bf492c3c5d1ff78d3'),
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Berlin&appid=f14977b8612b062bf492c3c5d1ff78d3')
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
	// You would do something with both sets of data here
  data.map(createWeatherCard);
}).then(function(){gethistory()}).catch(function (error) {
	// if there's an error, log it
	console.log(error);
});
}
function createWeatherCard(parsedata,value){
let arr=['Feels Like','Maximum Temperature','Minimum Temperature','Humidity','Pressure','Wind'];
  var searchResult=document.querySelector(".search-result");
  var popularcities=document.querySelector(".popular-cities");
  var inputcity=document.querySelector(".input-search");
  var pastsearch=document.querySelector(".past-search");
  var valinput;
  var res=["London","Paris","Berlin"];
  if(!inputcity.value&&value!="pastsearch"){
    valinput=res[i];
    i+=1;
   }else if(inputcity.value){
    var parsedata={
    city:inputcity.value,
    weather:[{
      description:parsedata.weather[0].description,
      icon:parsedata.weather[0].icon,
    }],
    main:{
      temp:parsedata.main.temp,
      feels_like:parsedata.main.feels_like,
      temp_max:parsedata.main.temp_max,
      temp_min:parsedata.main.temp_min,
      humidity:parsedata.main.humidity,
      pressure:parsedata.main.pressure,
      },
    wind:{
      deg:parsedata.wind.deg,
      speed:parsedata.wind.speed,
    },
  };
    window.localStorage.setItem(Math.random(), JSON.stringify(parsedata));
    valinput=inputcity.value;
  }else if(value=="pastsearch"){
    valinput=parsedata.city;
  }
 const weatherCard=`<div class="weather-card">
       <div class="cityname">
         ${valinput}
       </div>
       <div class="weather-info">
         <div class="weather-type"><div>${parsedata.weather[0].description}</div>
         <span>${kelvintoCelsius(parsedata.main.temp)}&#8451;</span>
         </div>
         <div class="svg-img"><img src=" http://openweathermap.org/img/wn/${parsedata.weather[0].icon}@2x.png">
         </div>
       </div>
       <div class="temp-info">
         <div class="name-temp">${arr[0]}</div>
         <div class="fig-temp">${kelvintoCelsius(parsedata.main.feels_like)}&#8451;</div>
       </div>
       <div class="temp-info">
        <img src="https://img.icons8.com/windows/30/000000/temperature-high.png"/>
         <div class="name-temp">${arr[1]}</div>
         <div class="fig-temp">${kelvintoCelsius(parsedata.main.temp_max)}&#8451;</div>
       </div>
       <div class="temp-info">
         <img src="https://img.icons8.com/windows/30/000000/temperature-low.png"/>
         <div class="name-temp">${arr[2]}</div>
         <div class="fig-temp">${kelvintoCelsius(parsedata.main.temp_min)}&#8451;</div>
       </div>
       <div class="temp-info">
         <img src="https://img.icons8.com/offices/30/000000/humidity.png"/>
         <div class="name-temp">${arr[3]}</div>
         <div class="fig-temp">${parsedata.main.humidity}%</div>
       </div>
       <div class="temp-info">
      <img src="https://img.icons8.com/windows/30/000000/atmospheric-pressure.png"/>
         <div class="name-temp">${arr[4]}</div>
         <div class="fig-temp">${parsedata.main.pressure}hPa</div>
       </div>
       <div class="temp-info">
         <img src="https://img.icons8.com/plasticine/30/000000/wind.png"/>
         <div class="name-temp">${arr[5]}</div>
         <div class="fig-temp">${parsedata.wind.deg+"DEG"+" "+parsedata.wind.speed}M/S</div>
         </div>`;  
   if(value=="searchResult"){
     document.querySelector(".wrapper").style.display="block";
    searchResult.innerHTML+=weatherCard;
 }else if(!inputcity.value&&value!="pastsearch"){
   popularcities.innerHTML+=weatherCard;
 }else if(value=="pastsearch"){
  document.querySelector(".wrapper-1").style.display="block";
   pastsearch.innerHTML+=weatherCard;
 }
 } 
async function fetchText() {
var inputsearch=document.querySelector(".input-search").value;
var url=`https://api.openweathermap.org/data/2.5/weather?q=${inputsearch}&appid=f14977b8612b062bf492c3c5d1ff78d3`;
    let response = await fetch(url);
    let data = await response.text();
    var parsedata= await JSON.parse(data);
    var domm=await createWeatherCard(parsedata,'searchResult');
 }
function gethistory(){
  for(let i=0; i<localStorage.length; i++) {
  var key = window.localStorage.key(i);
  if(key=="randid"){
      continue;
  }
  var parsedata1=JSON.parse(window.localStorage.getItem(key));
  createWeatherCard(parsedata1,"pastsearch");
  }
}
function kelvintoCelsius(temp){
    return Math.floor(temp-273.15);
}