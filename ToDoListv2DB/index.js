const express = require("express");
const app = express();

const https = require("https");
const bp = require("body-parser");

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/todolistDB', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });

const _ = require("lodash");

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
        listTitle: "Today",
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
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });

  if(listName === "Today"){
    item.save();
    res.redirect("/");
  }else{
    List.findOne({name:listName}, function(err,found){
      found.items.push(item);
      found.save();
      res.redirect("/" + listName);
    });
  }

});

app.post("/delete", function(req, res) {
  const checked = req.body.checkbox;
  const listName = req.body.listName;

  if(listName === "Today"){
    Item.findByIdAndRemove(checked, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("deleted");
        res.redirect("/");
      }
    });
  }
  else{
    List.findOneAndUpdate({name:listName}, {$pull:{items:{_id:checked } }}, function(err,found){
      if(err){
        console.log(err)
      }
      else{
        res.redirect("/" + listName);
      }
    });
  }


});

app.get("/:topic", function(req, res) {
  const customName = _.capitalize(req.params.topic);

  List.findOne({name:customName}, function(err, found) {
    if (!err) {
      if (!found) {
        const list = new List({
        name: customName,
        items: defa
          });
        list.save();
        res.redirect("/" + customName);
      }
      else {
        res.render("index",{listTitle: found.name, newItems: found.items} );
      }
    }
  });
});
