const express = require("express");
const app = express();

const https = require("https");
const bp = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/listDB", {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

app.use(bp.urlencoded({
  extended: true
}));
app.use(express.static("public"));

const itemSchema = new mongoose.Schema({
  name: String
});

const Item = mongoose.model("Item", itemSchema);

const eat = new Item({
  name: "Eat your food"
});

const wash = new Item({
  name: "Wash the dishes"
});

const play = new Item({
  name: "Play your board games"
});

const defa = [eat, wash, play];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

//inserts array of items into database
/*
Item.insertMany(defa, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("inserted");
  }
});*/

app.set('view engine', 'ejs');

app.listen(3000, function() {
  console.log("server running on port 3000");
});

app.get("/", function(req, res) {
  Item.find(function(err, items) {
    if (items.length === 0) {
      Item.insertMany(defa, function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("inserted");
        }
      });
    } else {
      res.render("index", {
        listTitle: "Today's List",
        newItems: items
      });
    }

  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.post("/", function(req, res) {
  const itemName = req.body.task;
  const item = new Item({
    name: itemName
  });

  item.save();
  res.redirect("/");
});

app.post("/delete", function(req, res) {
  const checked = req.body.checkbox;

  Item.findByIdAndRemove(checked, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("deleted");
      res.redirect("/");
    }
  });
});

app.get("/:topic", function(req, res) {
  const customName = req.params.topic;

  List.findOne({name:customName}, function(err, found) {
    if (!err) {
      if (found) {
        res.render("index",{listTitle: found.name, newItems: found.items} );
      }
      else {
          const list = new List({
          name: customName,
          items: [defa]
            });
          list.save();
      }
    }
  });
});
