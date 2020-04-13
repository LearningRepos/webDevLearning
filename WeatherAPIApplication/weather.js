const express = require("express");
const app = express();
const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}) );

app.listen(3000, function(req,res){
  console.log("port 3000 server running");
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  var l = req.body.cityName;
  const location = l;
  const appid = "73301a55115867f0c4504fca82cd9ff0";
  const unit = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + appid +  "&units=imperial";
  https.get(url, function(response){
    //console.log(response.statusCode); checks to see status of server
    response.on("data", function(data){
    const weatherData = JSON.parse(data)
    const place = weatherData.name;
    const weatherDescription = weatherData.weather[0].description;
    const weatherTemp = weatherData.main.temp;
    const weatherIcon = weatherData.weather[0].icon;
    //res.write( "<img " + "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" + ">");
    res.write( "<h1>" + "The place " + place + " temperature is " + weatherTemp + " farenheit and looks like " + weatherDescription + "</h1>");
    res.write("<img src =http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png" + ">");
    res.send();
    });
  });
});
