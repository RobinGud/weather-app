const getCurrentPosition = () => {
  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //     var latitude = position.coords.latitude;
  //     var longitude = position.coords.longitude;
  //     alert(latitude + " " + longitude);
  //   });
  // } else {
  //   alert("Geolocation API не поддерживается в вашем браузере");
  // }

  navigator.geolocation.getCurrentPosition(success, error, {
    // высокая точность
    enableHighAccuracy: true
  })
  
  function success({ coords }) {
    // получаем широту и долготу
    const { latitude, longitude } = coords
    const position = [latitude, longitude]
    console.log(position) // [широта, долгота]


    // Rapid API
    // const data = null;

    // const xhr = new XMLHttpRequest();
    // xhr.withCredentials = false;
    
    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    // });
    
    // xhr.open("GET", `https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}&callback=test`);
    // xhr.setRequestHeader("x-rapidapi-key", "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1");
    // xhr.setRequestHeader("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com");
    
    // xhr.send(data);

    fetch(`https://community-open-weather-map.p.rapidapi.com/weather?lat=${latitude}&lon=${longitude}&callback=test`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "cadf04a247msh09c8c1c6bee7505p1a566ajsn5c1a379faca1",
		"x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "DELETE, PUT, GET, POST",
    "Access-Control-Allow-Headers": "*"
	},
  //"mode": "cors"
})
.then(resp => {return resp.text()})
.then(resBody => {console.log(resBody)})
.catch(err => {
	console.error(err);
});

}

  const test = () => {
    console("test")
  }
  
  function error({ message }) {
    console.log(message) // при отказе в доступе получаем PositionError: User denied Geolocation
  }
}