const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = Promise;

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

let Todo = mongoose.model("Todo", todoSchema);

module.exports.Todo = Todo;
