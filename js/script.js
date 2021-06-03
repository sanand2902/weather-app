// M.AutoInit();

const search = document.getElementById('search')
const form = document.getElementById('form')

// const _location = document.getElementById('location')

const _current = document.getElementById('current')
const _btn = document.getElementById('btn')
const _result = document.getElementById('result')
const url = 'https://weather-samaranand.herokuapp.com/'




function timeConverter(UNIX_timestamp){
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();
    const time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' IST';
    return time;
}


const dateConverter = (UNIX_timestamp) => {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const time = date + ' ' + month + ' ' + year;
    return time;
}

const formatCard = (location, current)=>{
    const _t = `<div class="col s6 offset-s3 grey-text text-darken-3">
    <div class="card small">
    <div class="card-content blue">
    <span class="flow-text">
    <b>Location:</b>
    ${location}
    </span>
    </div>
    <div class="card-tabs">
    <ul class="tabs tabs-fixed-width">
    <li class="tab"><a href="#test4">Current</a></li>
    <li class="tab"><a href="#test5">The Sun</a></li>
    <li class="tab"><a href="#test6">Environment</a></li>
    </ul>
    </div>
    <div class="card-content grey lighten-4">
    <div id="test4"><li>Date: ${dateConverter(current.dt)} </li>
    <li>Current Temperature: ${current.temp}  </li> <li> Feels Like: ${current.feels_like} </li></div>
    <div id="test5"><li>Sunrise: ${timeConverter(current.sunrise)} </li> <li> Sunset: ${timeConverter(current.sunset)} </li>
    </div>
    <div id="test6"><li>Pressure: ${current.pressure} </li> <li> Humdity: ${current.humidity} </li>
    <li>Weather: ${current.weather.description} </li></div>
    </div>
    </div>
    </div>`
    return _t;
}


// clouds: 13
// dew_point: 289.76
// dt: 1622784600
// feels_like: {day: 313.58, night: 310.74, eve: 315.63, morn: 305.67}
// humidity: 26
// moon_phase: 0.81
// moonrise: 1622749800
// moonset: 1622793480
// pop: 0
// pressure: 1004
// sunrise: 1622762891
// sunset: 1622812057
// temp: {day: 312.54, min: 300.1, max: 315.77, night: 310.05, eve: 315.52, …}
// uvi: 12.2
// weather: [{…}]
// wind_deg: 289
// wind_gust: 6.2
// wind_speed: 4.11

const getfunEl = el =>{
    const _t = `<li class="collection-item grey-text text-darken-3 valign-wrapper">
    <img class="svgicon" src="img/cloudy-day-1.svg" alt="" srcset=""> 
        ${dateConverter(el.dt)}
    
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;

        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        Temp: ${Math.ceil(el.temp.min - 273)}C to ${Math.ceil(el.temp.max - 273)}C
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        &#160;
        ${el.weather[0].description}
    </li>`
    return _t;
}

// form -> myfun -> formatcard -> timestamp 

const insertForecastUI = ()=>{
    const _t = `<ul class="collection with-header" id="forecast-collection">
    <li class="collection-header blue"><h4>Weather Forecast for 7 days</h4></li> </ul>`
    _result.innerHTML = _t;
}


const myfun = (value)=>{
    if(!value) return;
    // console.log(value)
    fetch(`${url}weather?address=${value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert('kuch gadbad hua h api me')
            } else {
                // const loct = `<h5>Location:</h5><h6>${data.location}</h6>`
                // _location.insertAdjacentHTML('beforeend',loct)
                // console.log(data.forecast.daily)
                const p = formatCard(data.location, data.forecast.current)
                _current.innerHTML=p;
                const daily = data.forecast.daily
                insertForecastUI()
                const _id = _result.firstChild.id
                const _forecast = document.getElementById(_id)

                daily.forEach(e=>{
                    const el = getfunEl(e)
                    _forecast.insertAdjacentHTML('beforeend', el)
                })
                // console.log(data.forecast.current.dt)
                // console.log(timeConverter(data.forecast.current.dt))
                // _current.insertAdjacentHTML('beforeend', p)
                M.AutoInit();
            }
        })
    })
}


form.addEventListener('submit', e=>{
    e.preventDefault();
    // return console.log(e.target)
    _btn.disabled = true
    _current.innerHTML = `
    <div class="center"><div class="preloader-wrapper big active">
    <div class="spinner-layer spinner-blue-only">
    <div class="circle-clipper left">
    <div class="circle"></div>
    </div><div class="gap-patch">
    <div class="circle"></div>
    </div><div class="circle-clipper right">
    <div class="circle"></div>
    </div>
    </div>
    </div></div>`
    console.log('hey')
    myfun(search.value)
    _btn.disabled = false
})












// material JS
document.addEventListener('DOMContentLoaded', function() {
    M.AutoInit()
});

window.onload = M.toast({html: 'Hey! Welcome to our App'})





// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('.autocomplete');
//     const options = {
//         data:{
//             "patna":null,
//             "kolkata":null,
//             "shahkund":null
//         }
//     }
//     var instances = M.Autocomplete.init(elems, options);
//   });
