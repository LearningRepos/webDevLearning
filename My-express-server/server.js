//jshint esversion:6

const express = require("express");

const app = express();

app.get("/", function(request, response) {
  response.send("<a href = 'https://github.com' >Link</a>");
} );

app.get("/contact", function(request,response) {
  response.send("contact me");
} );

app.get("/about", function(request, response){
  response.send("I am this");
} );

app.get("/hobby" ,function(request, response){
  response.send("I have many hobbies");
} );

app.listen(3000, function() {
  console.log("server started on port 3000");
});
