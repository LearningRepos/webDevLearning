//jshint esversion:6

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useUnifiedTopology: true, useNewUrlParser: true });

const fruitSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, "add a name"]
  },
  rating: {
    type:Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);


const apple = new Fruit({
  name:"Apple",
  rating: 7,
  review: "solid"
});

const banana = new Fruit({
  name:"Banana",
  rating: 4,
  review:"its very mushy"
});

const orange = new Fruit({
  name:"Orange",
  rating: 7,
  review:"like the tanginess"
});

//inserts fruits into database
/*
Fruit.insertMany([apple,kiwi,banana,orange], function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Success");
  }
});*/

const humanSchema = new mongoose.Schema({
  name:String,
  age:Number,
  gender: String,
  favoriteFruit: fruitSchema
});

const pineapple = new Fruit({
  name:"Pineapple",
  rating: 8,
  review:"I like it on pizza"
});

const blueberry = new Fruit({
  name : "Blueberry",
  rating: 7,
  review:"Tasty but a bit dry"
});

//blueberry.save();

const Human = mongoose.model("Human", humanSchema);
const hooman = new Human({
  name:"Bob",
  age:12,
  gender: "Female",
  favoriteFruit:pineapple
});

//hooman.save();

//inserts humans into database
/*Human.insertMany([hooman], function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("Success");
  }
});*/

//finds all the fruits and records their names
/*
Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }
  else{
    mongoose.connection.close();
    for(var i =0; i < fruits.length; i++){
      console.log(fruits[i].name);
    }
  }
});*/

//updates a human w/ a fruit
/*
Human.updateOne({_id:"5e9ed420e5a87533447e1284"}, {favoriteFruit: blueberry}, function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("updated document");
  }
});*/

//deletes a fruit called Kiwi
/*
Fruit.deleteOne({name:"Kiwi"}, function(err){
  if(err){
    console.log(error);
  }
  else{
    console.log("Deleted");
  }
});*/

//deletes all the humans named Mihir
/*
Human.deleteMany({name:"Mihir"}, function(err){
  if(err){
    console.log(err)
  }
  else{
    console.log("Deleted");
  }
});*/
