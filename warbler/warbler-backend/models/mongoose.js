const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("debug", true);
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL + "", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
