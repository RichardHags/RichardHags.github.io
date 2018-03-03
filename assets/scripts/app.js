/****************** vädret ******************/

const KEY = '417faddb3e3fe4a061678bb3c66a6d55';
const API_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=nynashamn&lang=se&APPID=' + KEY;

function HttpGet(url) {
  this.url = url;
  this.ajax = new XMLHttpRequest();
}

function fetch(url) {
  return new HttpGet(url);
}

HttpGet.prototype.proceed = function(callback) {
    this.ajax.onreadystatechange = function() {
        if(this.readyState === 4 && this.status === 200){
            callback(this.response);
        }
    }
     this.ajax.open('GET', this.url, true);
     this.ajax.send();
}

var tbody = document.getElementById("weather-table");

fetch(API_URL).proceed(response => {
    var weatherData = JSON.parse(response);
    console.log(weatherData);
    var weatherList = weatherData.list;
    
    for(var i = 0; i < 5; i++){
        var time = weatherList[i].dt_txt;
        var hour = new Date(time).getHours() + ":00";
        var type = weatherData.list[i].weather[0].description;
        var temp = (weatherData.list[i].main.temp - 273.15).toFixed(1) + "°C";
        var wind = weatherList[i].wind.speed.toFixed(0) + " m/s";
        
        var timestamp = ` 
            <tr>
                <td>${hour} </td>
                <td>${type} </td>
                <td>${temp} </td>
                <td>${wind} </td>
            </tr>`
            
        tbody.innerHTML += timestamp;  
    }
});

/****************** tåg ******************/

var trainInfo = {
    Nr: [42, 42, 42],
    Avgår: ['09:25', '10:25', '11:25'],
    Ankommer: ['10:45', '11:35', '12:55']
}

var searchButton = document.getElementById("search-button");

if (searchButton){
    searchButton.addEventListener("click", function(event){
        
        var dest = document.getElementById("from-dest");
        var going = document.getElementById("go-from");
        going.innerHTML = "Åker från " + dest.value;
        
        var tbody = document.getElementById("train-table");
        
        if (tbody.childElementCount != 0){
            tbody.innerHTML = "";
        }
        
        for (let index = 0; index < 3; index++) {
            var row = tbody.insertRow(index);
            var c1 = row.insertCell(0);
            var c2 = row.insertCell(1);
            var c3 = row.insertCell(2);
            
            c1.innerHTML = trainInfo.Nr[index];
            c2.innerHTML = trainInfo.Avgår[index];
            c3.innerHTML = trainInfo.Ankommer[index];
        }
        event.preventDefault();
     });
    
}