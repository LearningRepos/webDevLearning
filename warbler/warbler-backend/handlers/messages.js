const db = require("../models/mongoose");

exports.createMessage = async function (req, res, next) {
  try {
    console.log(db.User);
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id,
    });
    let foundUser = await db.User.findById(req.params.id);
    console.log("foundUser Before Array", foundUser.message);
    console.log("message Id", message.id);
    // foundUser.message.push(message.id);
    await foundUser.save();
    let foundMessage = db.Message.findById(message._id).populate("user", {
      username: true,
      imgUrl: true,
    });
    return res.status(200).json(foundMessage);
  } catch (err) {
    return next(err);
  }
};

exports.getMessage = async function (req, res, next) {
  try {
  } catch (err) {}
};

exports.deleteMessage = async function (req, res, next) {
  try {
  } catch (err) {}
};
