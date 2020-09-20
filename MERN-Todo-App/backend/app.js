const express = require("express");
const app = express();
bodyparser = require("body-parser");

const db = require("./models");

const cors = require("cors");

app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.listen(3001, function () {
  console.log("Listening on port 3001");
});

app.get("/", function (req, res) {
  res.sendFile(index.html);
});

app.get("/api/todos", function (req, res) {
  db.Todo.find().then((data) => res.json(data));
});

app.post("/api/todos", function (req, res) {
  db.Todo.create(req.body).then((data) => res.json(data));
});

app.get("/api/todos/:todoid", function (req, res) {
  db.Todo.findById(req.params.todoid)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.put("/api/todos/:todoid", function (req, res) {
  db.Todo.findOneAndUpdate({ _id: req.params.todoid }, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.delete("/api/todos/:todoid", function (req, res) {
  db.Todo.deleteOne({ _id: req.params.todoid }, { new: true })
    .then((data) => res.json({ message: "deleted" }))
    .catch((err) => res.send(err));
  // console.log(req.params.todoid);
});
// deletes all from collection
// db.deleteMany({})
//   .then((a) => console.log("deleted"))
//   .catch((err) => console.log(err));
