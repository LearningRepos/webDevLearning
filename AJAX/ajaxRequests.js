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

// using bacon ipsum and a dog pic generator with jquery ajax calls(remember your cdn)
$("#btn").click(function () {
  $.ajax({
    method: "GET",
    url: "https://baconipsum.com/api/?type=meat-and-filler",
  })
    .done(function (result) {
      let baconText = document.querySelector("#bacon");
      baconText.innerHTML = result[0];
    })
    .fail(function () {
      console.log("error");
    });

  $.get("https://dog.ceo/api/breeds/image/random")
    .done(function (data) {
      $("#dog").attr("src", data.message);
      console.log(data.message);
    })
    .fail(function () {
      console.log("ERROR!");
    });
});

// xhr, fetch, jquery, and axios(need cdn) compared all at once
var url = "https://ron-swanson-quotes.herokuapp.com/v2/quotes";

let button1 = document.querySelector("#xhr");
button1.addEventListener("click", function () {
  const XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function () {
    if (XHR.readyState === 4) {
      if (XHR.status === 200) {
        document.querySelector("#quote").innerHTML = JSON.parse(
          XHR.responseText
        );
      } else {
        console.log("error");
      }
    }
  };

  XHR.open("GET", url);
  XHR.send();
});

let button2 = document.querySelector("#fetch");
button2.addEventListener("click", function () {
  fetch(url)
    .then((result) => result.json())
    .then((data) => (document.querySelector("#quote").innerHTML = data));
});

let button3 = document.querySelector("#jquery");
button3.addEventListener("click", function () {
  $.get(url).done(function (data) {
    $("#quote").html(data);
  });
});

let button4 = document.querySelector("#axios");
button4.addEventListener("click", function () {
  axios.get(url).then(function (result) {
    document.querySelector("#quote").innerHTML = result.data[0];
  });
});
