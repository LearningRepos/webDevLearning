const express = require("express");
const app = express();

const https = require("https");
const bp = require("body-parser");

const date = require(__dirname + "/date.js");

app.use(bp.urlencoded({
  extended: true
}));
app.use(express.static("public"));

var inp = "";
var inpCollection = [];
var workItems = [];
app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log("server running on port 3000");
});

app.get("/", function(req, res) {
  let day  = date.getDate();
  res.render("index", {
    listTitle: day,
    newItems: inpCollection
  });
});

app.get("/work", function(req, res) {
  res.render("index", {
    listTitle: "Work List",
    newItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/", function(req, res) {
  inp = req.body.task;
  if (req.body.list === "Work") {
    workItems.push(inp);
    res.redirect("/work");
  } else {
    inpCollection.push(inp);
    res.redirect("/");
  }


});

app.post("/work", function(req, res) {
  inp = req.body.task;
  workItems.push(inp);
  res.redirect("/work");
});
