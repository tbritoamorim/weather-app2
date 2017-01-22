$(document).ready(function() {
  var lon;
  var lat;
  var path;
  var openWeatherMap;

  //icons
  var rain = "<a href='' data-icon='8' class='icon' id='mainIcon'></a>";

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
      switch (openWeatherMap.weather[0].icon) {
        case "01d":
            $(".main").addClass("clearSkyDay");
          break;
        case "01n":

        case "10n":
            $(".main").addClass("rain");
            $(".main").html(rain);
        default:

      }
    });
  }
  $("#start").on("click", function() {
    getLocal();
    $("#start").fadeOut();
    removeIcons();
  });

});
