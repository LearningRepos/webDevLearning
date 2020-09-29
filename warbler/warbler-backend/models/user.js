const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imgUrl: {
    type: String,
  },
  message: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "message",
    },
  ],
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async function (regularPassword, next) {
  try {
    let isMatch = await bcrypt.compare(regularPassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = new mongoose.model("user", userSchema);

module.exports = User;
