//jshint esversion: 6

const express = require("express");
const app = express();
const https = require("https");
const request = require("request");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}) );

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function(){
  console.log("port 3000 server running");
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const f = req.body.fName;
  const l = req.body.lName;
  const ema = req.body.emails;

  const data = {
    members:[
      {
        email_address: ema,
        status: "subscribed",
        merge_fields:{
          FNAME: f,
          LNAME: l
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "https://us19.api.mailchimp.com/3.0/lists/0d50217cc3";
  const options = {
    method: "POST",
    auth: "mihir1:baa3fbe97a127bbd8b53c31bec2b8a2a-us19"
  };

  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname + "/success.html");
    }
    else{
      res.sendFile(__dirname + "/fail.html");
    }
    response.on("data", function(data){
      //console.log(JSON.parse(data));
    });
  });
    request.write(jsonData);
    request.end();

});


// api key
//baa3fbe97a127bbd8b53c31bec2b8a2a-us19

//audience id
//0d50217cc3
