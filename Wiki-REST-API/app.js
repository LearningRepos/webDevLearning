//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/wikiDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Server started on port 3000");
});

const wikiSchema = {
  title: String,
  content:String
};

const Wiki = mongoose.model("Article", wikiSchema);

app.route("/articles").get(function(req,res){
  Wiki.find(function(err,found){
    if(err){
      res.send(err);
    }
    else{
      res.send(found);
    }
  });
})

app.route("route").get(function(req,res){})

.post(function(req,res){
  const newWiki = new Wiki({
    title : req.body.title,
    content: req.body.content
  });

  newWiki.save(function(err){
    if(err){
      res.send(err)
    }
    else{
      res.send("Success")
    }
  });
})

.delete(function(req,res){
  Wiki.deleteMany(function(err){
    if(!err){
      res.send("Success deleting")
    }
    else{
      res.send(err);
    }
  });
});
