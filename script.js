
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        api_url = "http://api.openweathermap.org/data/2.5/weather?lat=" + Math.floor(position.coords.latitude) + "&lon=" + Math.floor(position.coords.longitude); 
        console.log(api_url);  
        $.ajax({
          url: api_url,
          jsonp: "callback",
          dataType: "jsonp",
          data: {
              id: "2172797",
              APPID: "35000cdad97645316c048563e4183021"
          },
          success: function( response ) {
			var responseDataJSON = response; 
			var imgUrl = "http://openweathermap.org/img/w/" + responseDataJSON["weather"][0]["icon"] + ".png"; 
			var loc =  responseDataJSON["name"] + " , "  + responseDataJSON["sys"]["country"]; 
			var describe = responseDataJSON["weather"][0]["description"]; 
			var temp_cel = precisionRound(responseDataJSON["main"]["temp"] - 273.15,1); 
			var temp_fahr = precisionRound(1.8 * temp_cel + 32,1); 
			var humidity = responseDataJSON["main"]["humidity"]; 
			var wind = responseDataJSON["wind"]["speed"] + "m/s at " + precisionRound(responseDataJSON["wind"]["deg"],1) + "&deg;";  
			$(document).ready(function() {
			  $("#icon_image").attr("src", imgUrl); 
			  $("#location").html(loc); 
			  $("#description").html(describe); 
			  $("#temp").html(temp_cel + "<sup>&#x2103;<sup>"); 
			  $("#humid").html("Humidity: " + humidity +  "%"); 
			  $("#wind").html("Wind Speed: " + wind); 

			  $('#fahr').click(function(event) {
			  	  $("#temp").html(temp_fahr + "<sup>&#x2109;<sup>"); 
			  });

			  $("#cel").click(function(event) {

			  	$("#temp").html(temp_cel + "<sup>&#x2103;<sup>")
			  });

			});
          }
      });

    });
}


function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}


