const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxLength: 160,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

messageSchema.pre("remove", async function (next) {
  try {
    let user = await User.findById(this.user);
    user.messages.remove(this.id);
    await user.save();
  } catch (err) {
    return next(err);
  }
});

const Message = mongoose.model("message", messageSchema);

module.exports = Message;
