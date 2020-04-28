//jshint esversion:6
require("dotenv").config();
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(session({
  secret:"Our little secret.",
  resave: false,
  saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.listen("3000", function() {
  console.log("Server started on port 3000");
});

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/login", function(req, res) {
  res.render("login");
});

app.post("/login", function(req, res) {
  const username = req.body.username;
  const password = req.body.password;


});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {


});
