const express = require("express");
const bodyParser = require("body-parser");
const mongoTest = require("./models/models.js");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));

app.get("/dogs", mongoTest.Get);

app.post("/dogs", mongoTest.Create);

app.get("/dragons", function (req, res) {
  mongoTest.Dragon.find().then((data) => res.json(data));
});

app.post("/dragons", function (req, res) {
  mongoTest.Dragon.create({
    name: req.body.name,
    age: req.body.age,
  }).then((data) => res.json(data));
});

app.listen(3001, function () {
  console.log("Listening on port 3001");
});
