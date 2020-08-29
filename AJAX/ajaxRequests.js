// remember to use in html/css/js files

//xml http request with simple github api
const XHR = new XMLHttpRequest();

XHR.onreadystatechange = function () {
  if (XHR.readyState === 4) {
    if (XHR.status === 200) {
      console.log(XHR.responseText);
    } else {
      console.log("error");
    }
  }
};

XHR.open("GET", "https://api.github.com/zen");

XHR.send();

// random dog pictures using xml http requests
let button = document.getElementById("btn");

button.addEventListener("click", function () {
  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState == 4) {
      if (XHR.status == 200) {
        dogURL = JSON.parse(XHR.responseText);
        console.log(dogURL);
        document.getElementById("photo").src = dogURL.message;
      } else {
        console.log("There was a problem!");
      }
    }
  };

  XHR.open("GET", "https://dog.ceo/api/breeds/image/random");
  XHR.send();
});

// Getting bitcoin rate with fetch api
let button = document.querySelector("button");

button.addEventListener("click", function () {
  fetch("https://api.coindesk.com/v1/bpi/currentprice.json")
    .then(function (res) {
      if (!res.ok) {
        console.log("error");
      }
      return res;
    })
    .then((result) => result.json())
    .then(
      (data) => (document.querySelector("#price").innerHTML = data.bpi.USD.rate)
    );
});

// random user profile api search
let button = document.querySelector("#btn");
button.addEventListener("click", function () {
  fetch("https://randomuser.me/api/")
    .then((result) => result.json())
    .then(function (data) {
      document.querySelector("#avatar").src = data.results[0].picture.thumbnail;
      document.querySelector("#fullname").innerHTML =
        data.results[0].name.title +
        " " +
        data.results[0].name.first +
        " " +
        data.results[0].name.last +
        " ";
      document.querySelector("#username").innerHTML =
        data.results[0].login.username;
      document.querySelector("#email").innerHTML = data.results[0].email;
      document.querySelector("#city").innerHTML = data.results[0].location.city;
    });
});
