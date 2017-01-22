$(document).ready(function() {
  $(".btn-group").hide()
  var lon;
  var lat;
  var path;
  var openWeatherMap;
  //icons
  var sunny = "<a href='' data-icon='1' class='icon' id=''></a>";
  var clearNight = "<a href='' data-icon='2' class='icon' id=''></a>";
  var cloudyDay = "<a href='' data-icon='3' class='icon' id=''></a>";
  var cloudyNight = "<a href='' data-icon='4' class='icon' id=''></a>";
  var cloudy = "<a href='' data-icon='Y' class='icon' id=''></a>";
  var rain = "<a href='' data-icon='8' class='icon' id=''></a>";
  var thunderstorm = "<a href='' data-icon='Z' class='icon' id=''></a>";
  var snow = "<a href='' data-icon='$' class='icon' id=''></a>";
  var mistDay = "<a href='' data-icon='J' class='icon' id=''></a>";
  var mistNight = "<a href='' data-icon='K' class='icon' id=''></a>";
  var calendar = "<span class='glyphicon glyphicon-calendar'></span> ";
  var mapMarker = "<span class='glyphicon glyphicon-map-marker'></span> ";
  var tempMarker = '<a href="" data-icon="\'" class="icon"></a>';

  function removeIcons() {
    $("#sun").fadeOut();
    $("#cloud").fadeOut();
  }

  function getLocal() {
    $.getJSON('http://www.geoplugin.net/json.gp?jsoncallback=?', function(JSON) {
      lat = JSON.geoplugin_latitude;
      lon = JSON.geoplugin_longitude;
      path = 	"http://api.openweathermap.org/data/2.5/weather?lat=" +
            lat +
            "&lon=" +
            lon +
            "&APPID=ea9046db7b6ccbaac534bd241aa256e1";
    getWeather();
    });
  }

  function getWeather() {
    $.getJSON(path, function(data) {
      openWeatherMap = data;
      console.log(openWeatherMap.name);
      console.log(openWeatherMap.weather[0].icon);
      var location = openWeatherMap.name;
      var date = new Date();
      var month;
      switch (date.getMonth()) {
        case 0: month = "January"; break;
        case 1: month = "February"; break;
        case 2: month = "March"; break;
        case 3: month = "April"; break;
        case 4: month = "May"; break;
        case 5: month = "June"; break;
        case 6: month = "July"; break;
        case 7: month = "August"; break;
        case 8: month = "September"; break;
        case 9: month = "October"; break;
        case 10: month = "November"; break;
        case 11: month = "December"; break;
      }
      var day = date.getDate() + " " + month + ", " + date.getFullYear();
      var time = date.getHours() + ":" + date.getMinutes();
      var temperatureInCelsius = Math.floor(openWeatherMap.main.temp - 273);
      var temperatureInFahrenheit = Math.floor((openWeatherMap.main.temp - 273.15) * 1.8 + 32);
      $(".date").html(calendar + day);
      $(".location").html(mapMarker + " " + location + ", " + time);

      function toFahrenheit() {
          $(".temperature").html(tempMarker + temperatureInFahrenheit + " &deg;F ");
          $(".celsius").removeClass("active");
          $(".fahrenheit").addClass("active");
      }

      function toCelsius() {
          $(".temperature").html(tempMarker + temperatureInCelsius + " &deg;C ");
          $(".fahrenheit").removeClass("active");
          $(".celsius").addClass("active");
        }
      $(".fahrenheit").on("click", function() {
          toFahrenheit()
      });
      $(".celsius").on("click", function() {
          toCelsius();
      });
      switch (openWeatherMap.weather[0].icon) {
        case "01d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(sunny);
          break;
        case "01n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(clearNight);
            break;
        case "02d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(cloudyDay);
            break;
        case "02n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(cloudyNight);
            break;
        case "03d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(cloudy);
            break;
        case "03n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(cloudy);
            break;
        case "04d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(cloudy);
            break;
        case "04n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(cloudy);
            break;
        case "09d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(rain);
            break;
        case "09n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(rain);
        break;
        case "10d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(rain);
            break;
        case "10n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(rain);
            break;
        case "11d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(thunderstorm);
            break;
        case "11n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(thunderstorm);
            break;
        case "13d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(snow);
            break;
        case "13n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(snow);
            break;
        case "50d":
            $(".main").addClass("skyDay");
            $(".mainIcon").html(mistDay);
            break;
        case "50n":
            $(".main").addClass("skyNight");
            $(".mainIcon").html(mistNight);
            break;
      }
      toFahrenheit();
    });
  }
  $("#start").on("click", function() {
    getLocal();
    $("#start").fadeOut();
    removeIcons();
    $(".btn-group").show();
  });
});
