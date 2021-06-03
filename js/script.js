
const search = document.getElementById('search')
const form = document.getElementById('form')
// const _location = document.getElementById('location')
const _current = document.getElementById('current')

form.addEventListener('submit', e=>{
    e.preventDefault();
    myfun(search.value)
})

M.AutoInit();

const url = `https://weather-samaranand.herokuapp.com/`

const d= new Date();
console.log(d)

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec + ' IST';
    return time;
}


const formatCard = (location, current)=>{
    const t = `<div class="col s6 offset-s3 grey-text text-darken-3">
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
                <div id="test4"><li>Date: ${timeConverter(current.dt)} </li>
                    <li>Current Temperature: ${current.temp}  </li> <li> Feels Like: ${current.feels_like} </li></div>
                <div id="test5"><li>Sunrise: ${timeConverter(current.sunrise)} </li> <li> Sunset: ${timeConverter(current.sunset)} </li>
                </div>
                <div id="test6"><li>Pressure: ${current.pressure} </li> <li> Humdity: ${current.humidity} </li>
                    <li>Weather: ${current.weather.description} </li></div>
                </div>
            </div>
        </div>`
    return t;
}



const myfun = (value)=>{
    if(!value) return;
    // console.log(value)
    _current.innerHTML='';
    fetch(`${url}weather?address=${value}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                alert('kuch gadbad hua h api me')
            } else {
                // const loct = `<h5>Location:</h5><h6>${data.location}</h6>`
                // _location.insertAdjacentHTML('beforeend',loct)
                // console.log(data)
                const p = formatCard(data.location, data.forecast.current)
                // console.log(data.forecast.current.dt)
                // console.log(timeConverter(data.forecast.current.dt))
                _current.insertAdjacentHTML('beforeend', p)
                M.AutoInit();
            }
        })
    })
}

window.onload = M.toast({html: 'Hey! Welcome to our App'})