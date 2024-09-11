
function callapi(){
    const locat = document.getElementById("location").value;

    const apiURL = `https://api.weatherapi.com/v1/current.json?key=68738517a2424003883160111240509&q=${locat}&aqi=yes`;
    const apiUrlForecast = `https://api.weatherapi.com/v1/forecast.json?key=68738517a2424003883160111240509&q=${locat}&days=3&aqi=no&alerts=no`;

    if(!locat){ 
        alert("Please enter a city, region, or country.");
        return;
    }

    fetch(apiURL)
        .then((response)=>{
            if(!response.ok){
                throw new Error("Netwerk response was not ok");
            }
            return response.json();
        })
        .then((data)=>{
            document.getElementById(
                "country"
            ).innerText = `${data.location.country}`;

            document.getElementById(
                "temperature"
            ).innerText = `Temperature: ${data.current.temp_c}°C`;
            
            document.getElementById(
                "humiditys"
            ).innerText = `Humidity: ${data.current.humidity} g/kg`;
        
            document.getElementById(
                "wind"
            ).innerText = `Wind-speed: ${data.current.wind_kph}  mph`;

            document.getElementById(
                "descriptions"
            ).innerText = `Descriptions: ${data.current.condition.text}`;

            if (data.current.condition.text=="Partly cloudy") {
                const div = document.getElementById('background-div');
                div.style.backgroundImage = `url(img/bgImg.jpg)`;
                div.style.backgroundImage.repeat = null;
            }
            else if(data.current.condition.text=="Light rain shower"){
                const div = document.getElementById('background-div');
                div.style.backgroundImage = `url(img/Lightrainshower.jpg)`;
            }
        })
        .catch((error)=>{
            console.error("There was a problem with the fetch operation:",error);
        });

    
    fetch(apiUrlForecast)
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
        })
        .then((data) => {
        // day 1
        document.getElementById(
            "day1temp"
        ).innerText = `${data.forecast.forecastday[0].day.avgtemp_c}°C`;
        document.getElementById(
            "day1con"
        ).innerText = `${data.forecast.forecastday[0].day.condition.text}`;

        // day 2
        document.getElementById(
            "day2temp"
        ).innerText = `${data.forecast.forecastday[1].day.avgtemp_c}°C`;
        document.getElementById(
            "day2con"
        ).innerText = `${data.forecast.forecastday[1].day.condition.text}`;

        // day 3

        document.getElementById(
            "day3temp"
        ).innerText = `${data.forecast.forecastday[2].day.avgtemp_c}°C`;
        document.getElementById(
            "day3con"
        ).innerText = `${data.forecast.forecastday[2].day.condition.text}`;
        })
        .catch((error) => {
        console.error(
            "There was a problem with the fetch operation:",
            error
        );
        });
        getWeather(location);

       
}

function changeBackground(imageFile) {
    document.body.style.backgroundImage = `url('${imageFile}')`;
}
