const express = require("express");
const app = express();
const ejs = require("ejs");

//makes website use ejs as view engine
app.set("view engine", "ejs");

//makes website use the public folder in ejs
app.use(express.static(__dirname + "/public"));

//uses on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port 3000");
});

// Home Page
app.get("/", function (request, response) {
  response.render("home.ejs");
});
