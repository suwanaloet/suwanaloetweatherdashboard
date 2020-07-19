
var scity = $("#search-input");

var date = $("#currentDate");
var date = moment().format("LLLL");
$("#currentDate").append(date + "");

//store search history in array
var searchArray = JSON.parse(localStorage.getItem("cities")) || [];
 //append history
 showHistory();
 function showHistory() {
     var searchArray = JSON.parse(localStorage.getItem("cities")) || [];
     $("#search-history").empty();
     for (var i = 0; i < searchArray.length; i++) {
         document.getElementById("search-history").innerHTML += "<button>" + searchArray[i] + "</button>";
     }
 }


var m = moment();

//API key
var apiKEY = "3fcdee0643223691614d37569351e986";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";

//only way that circumvented reload on button press since preventdefault error'd





$("#weatherSearch").on("click", function (event) {
    event.preventDefault();

    var city = $("#search-input").val().trim();



    // add to local storage
    localStorage.setItem("cities", JSON.stringify(searchArray));


    //give city info to five day forcast cards as well
    //fiveDay(city);

    // search for the city
    searchCity(city);
    searchForecast(city);
    


    function searchCity(city) {
        $("#cityName").empty();
        $("#momentTemp").empty();
        $("#momenthumidity").empty();
        $("#momentWindSpeed").empty();
        $("#UV-Index").empty();

        var searchInput = queryURL + city + "&appid=" + apiKEY;
        console.log(searchInput);

        fetch(searchInput).then(function (response) {
            return response.json();
        }).then(function (data) {
            //one day current data
            var cityData = data
            var cityName = cityData.name;
            console.log(cityName);
            var weatherIcon = cityData.weather[0].icon;
            var weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherUrl);

            var weatherImg = $("<img>").attr("src", weatherUrl);
            $("#cityName").append(cityName + "");
            $("#mainImg").empty();
            $("#mainImg").append(weatherImg);

            var momentTempDataK = cityData.main.temp;
            var momentTempDataFp = Math.round(((momentTempDataK - 273.15) * 1.8 + 32) * 100 / 100) + " °F"
            $("#momentTemp").empty();
            $("#momentTemp").append(momentTempDataFp);

            var momentHumidity = cityData.main.humidity + "%";
            $("#momentHumidity").empty();
            $("#momentHumidity").append(momentHumidity);

            var momentWindSpeed = cityData.wind.speed + " MPH";
            $("#momentWindSpeed").empty();
            $("#momentWindSpeed").append(momentWindSpeed);

            // extra fetch to parse city lat/lon for api lookup UV index
            var cityLat = cityData.coord.lat;
            var cityLon = cityData.coord.lon;
            var UVSearch = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKEY;
            fetch(UVSearch).then(function (response) {
                return response.json();
            }).then(function (data) {
                var uvData = data
                var momentUV = uvData.value;
                console.log(UVSearch);
                console.log(uvData.value);
                $("#UV-Index").empty();
                $("#UV-Index").append(momentUV);
                if (momentUV < 3) {
                    document.getElementById("UV-Index").style.backgroundColor = "green";;
                } else if (momentUV < 8) {
                    document.getElementById("UV-Index").style.backgroundColor = "orange";
                } else {
                    document.getElementById("UV-Index").style.backgroundColor = "red";
                }
            })
        });
    };
   
   
    function searchForecast(city) {
        var forecastInput = forecastURL + city + "&appid=" + apiKEY;

        fetch(forecastInput).then(function (response) {
            return response.json();
        }).then(function (data) {
            
            //five day data
            var forecastData = data
            var forecastOne = forecastData.list[0];
            var forecastTwo = forecastData.list[1];
            var forecastThree = forecastData.list[2];
            var forecastFour = forecastData.list[3];
            var forecastFive = forecastData.list[4];

            //day 1
            var weatherIcon = forecastOne.weather[0].icon;
            var weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherUrl);

            $("#dateOne").empty();
            var weatherImg = $("<img>").attr("src", weatherUrl);
            var dateOne = moment().add(1, "d").format("MMMM Do YYYY");
            $("#dateOne").append(dateOne);

            $("#iconOne").empty();
            $("#iconOne").append(weatherImg);

            $("#tempOne").empty();
            var momentTempDataK = forecastOne.main.temp;
            var momentTempDataFp = Math.round(((momentTempDataK - 273.15) * 1.8 + 32) * 100 / 100) + " °F"
            $("#tempOne").append("Temperature: " + momentTempDataFp);

            $("#humOne").empty();
            var momentHumidity = forecastOne.main.humidity + "%";
            $("#humOne").append("Humidity: " + momentHumidity);

            //day 2
            var weatherIcon = forecastTwo.weather[0].icon;
            var weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherUrl);

            $("#dateTwo").empty();
            var weatherImg = $("<img>").attr("src", weatherUrl);
            var dateTwo = moment().add(1, "d").format("MMMM Do YYYY");
            $("#dateTwo").append(dateTwo);

            $("#iconTwo").empty();
            $("#iconTwo").append(weatherImg);

            $("#tempTwo").empty();
            var momentTempDataK = forecastTwo.main.temp;
            var momentTempDataFp = Math.round(((momentTempDataK - 273.15) * 1.8 + 32) * 100 / 100) + " °F"
            $("#tempTwo").append("Temperature: " + momentTempDataFp);

            $("#humTwo").empty();
            var momentHumidity = forecastTwo.main.humidity + "%";
            $("#humTwo").append("Humidity: " + momentHumidity);
            //day 3
            var weatherIcon = forecastThree.weather[0].icon;
            var weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherUrl);

            $("#dateThree").empty();
            var weatherImg = $("<img>").attr("src", weatherUrl);
            var dateThree = moment().add(1, "d").format("MMMM Do YYYY");
            $("#dateThree").append(dateThree);

            $("#iconThree").empty();
            $("#iconThree").append(weatherImg);

            $("#tempThree").empty();
            var momentTempDataK = forecastThree.main.temp;
            var momentTempDataFp = Math.round(((momentTempDataK - 273.15) * 1.8 + 32) * 100 / 100) + " °F"
            $("#tempThree").append("Temperature: " + momentTempDataFp);

            $("#humThree").empty();
            var momentHumidity = forecastThree.main.humidity + "%";
            $("#humThree").append("Humidity: " + momentHumidity);

            //day 4
            var weatherIcon = forecastFour.weather[0].icon;
            var weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherUrl);

            $("#dateFour").empty();
            var weatherImg = $("<img>").attr("src", weatherUrl);
            var dateFour = moment().add(1, "d").format("MMMM Do YYYY");
            $("#dateFour").append(dateFour);

            $("#iconFour").empty();
            $("#iconFour").append(weatherImg);

            $("#tempFour").empty();
            var momentTempDataK = forecastFour.main.temp;
            var momentTempDataFp = Math.round(((momentTempDataK - 273.15) * 1.8 + 32) * 100 / 100) + " °F"
            $("#tempFour").append("Temperature: " + momentTempDataFp);

            $("#humFour").empty();
            var momentHumidity = forecastFour.main.humidity + "%";
            $("#humFour").append("Humidity: " + momentHumidity);

            //day 5
            var weatherIcon = forecastFive.weather[0].icon;
            var weatherUrl = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
            console.log(weatherUrl);

            $("#dateFive").empty();
            var weatherImg = $("<img>").attr("src", weatherUrl);
            var dateFive = moment().add(1, "d").format("MMMM Do YYYY");
            $("#dateFive").append(dateFive);

            $("#iconFive").empty();
            $("#iconFive").append(weatherImg);

            $("#tempFive").empty();
            var momentTempDataK = forecastFive.main.temp;
            var momentTempDataFp = Math.round(((momentTempDataK - 273.15) * 1.8 + 32) * 100 / 100) + " °F"
            $("#tempFive").append("Temperature: " + momentTempDataFp);

            $("#humFive").empty();
            var momentHumidity = forecastFive.main.humidity + "%";
            $("#humFive").append("Humidity: " + momentHumidity);

        })
    };
});