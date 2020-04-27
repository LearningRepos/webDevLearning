//jshint esversion:6
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const encrypt = require("mongoose-encryption");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

const secret = "Thisisourlittlesecret";
userSchema.plugin(encrypt,{secret:secret, encryptedFields:["password"] });

const User = new mongoose.model("User", userSchema);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen("3000", function() {
  console.log("Server started on port 3000")
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

  User.findOne({
    email: username
  }, function(err, found) {
    if (err) {
      console.log(err);
    } else {
      if (found) {
        if (found.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/register", function(req, res) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password
  });
  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
    }
  });
});
