const mongoose = require("mongoose");

// allows you to see what is happening to data in terminal
mongoose.set("debug", true);

// created a new database called todo-api
mongoose.connect("mongodb://localhost/todo-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// allows you to show results as promises
mongoose.Promise = Promise;

// schema with only a name required
var todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Must include name",
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// creating a model and exporting it as Todo
let Todo = mongoose.model("Todo", todoSchema);

// refer to it as Todo and refer to the Model todo
module.exports.Todo = Todo;
