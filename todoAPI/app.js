const express = require("express");
const app = express();
bodyparser = require("body-parser");

const db = require("./models");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("Listening on port 3000");
});

app.get("/", function (req, res) {
  res.send("Hello from the root route");
});

app.get("/api/todos", function (req, res) {
  db.Todo.find().then((data) => res.json(data));
});

app.post("/api/todos", function (req, res) {
  db.create(req.body).then((data) => res.json(data));
});

app.get("/api/todos/:todoid", function (req, res) {
  db.findById(req.params.todoid)
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.put("/api/todos/:todoid", function (req, res) {
  db.findOneAndUpdate({ _id: req.params.todoid }, req.body, { new: true })
    .then((data) => res.json(data))
    .catch((err) => res.send(err));
});

app.delete("/api/todos/:todoid", function (req, res) {
  db.deleteOne({ _id: req.params.todoid }, { new: true })
    .then((data) => res.json({ message: "deleted" }))
    .catch((err) => res.send(err));
  // console.log(req.params.todoid);
});
// deletes all from collection
// db.deleteMany({})
//   .then((a) => console.log("deleted"))
//   .catch((err) => console.log(err));
