let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let classes = ["today forecast-item", "forecast-item special-item", "forecast-item"]
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



async function search(city) {
    let result = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    let data = await result.json();
    displayCurrent(data.location, data.current);
    displayNextDays(data.forecast.forecastday);
    console.log(data.forecast.forecastday);
}


document.getElementById("search").addEventListener("keyup", e => {
    search(e.target.value)
});


function displayCurrent(loc, curr) {
    if (null != curr) {
        var e = new Date(curr.last_updated.replace(" ", "T"));
        let temp = `<div class="col-lg-4 col-md-6 text-center item item1 overflow-hidden my-md-2 my-sm-2">
        <div class="today forecast-item ">
          <div class="forecast-start d-flex justify-content-between text-center py-2 px-4" id="today">
              <div class="day">${days[e.getDay()]}</div>
              <div class=" date">${e.getDate() + monthNames[e.getMonth()]}</div>
          </div> 
          <div class="forecast-content p-3" id="current">
              <div class="location fs-3">${loc.name}</div>
              <div class="degre d-flex justify-content-center align-items-center">
                  <div class="num">${curr.temp_c}<sup>o</sup>C</div>

                  <div class="forecast-icon">
                      <img src="https:${curr.condition.icon}" alt="" width="90">
                  </div>

              </div>
              <div class="w-desc">${curr.condition.text}</div>
              <span><img src="imgs/icon-umberella.png" alt="">20%</span>
              <span><img src="imgs/icon-wind.png" alt="">18km/h</span>
              <span><img src="imgs/icon-compass.png" alt="">East</span>
          </div>
      </div>
    </div>`


        document.getElementById("forecast").innerHTML = temp;
    }
}

function displayNextDays(arr) {
    let container = ``
    
    for (let i = 1; i < arr.length; i++) 
    container += `<div class="col-lg-4 col-md-6 text-center item item2 overflow-hidden my-md-2 my-sm-2">
    <div class="forecast-start text-center py-2">
      <div class="day">${days[new Date(arr[i].date.replace(" ", "T")).getDay()]}</div>
    </div>
     <div class="forecast-content mt-5 p-3">
        <div>
            <div class="forecast-icon">
                <img src="https:${arr[i].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degre">${arr[i].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${arr[i].day.mintemp_c}<sup>o</sup></small>
            <div class="w-desc">${arr[i].day.condition.text}</div>
        </div>
    </div>
    
  </div>`


    document.getElementById("forecast").innerHTML += container;
}
search("cairo");

