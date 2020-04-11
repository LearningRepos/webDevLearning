const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}) );

app.listen(3000, function(){
  console.log("server started on port 3000");
} );

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
} );

app.get("/bmicalculator", function(req,res){
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/", function(req, res){
  var one = Number(req.body.num1);
  var two = Number(req.body.num2);
  var result = one + two;
  res.send("The result of this calculation is " + result);
} );

app.post("/bmicalculator", function(req,res){
  var height = Number(req.body.height);
  var weight = Number(req.body.weight);
  var bmi =  703 * (weight/ (height * height));
  res.send("Your calculated bmi is " + bmi);
} );
