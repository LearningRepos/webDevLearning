const db = require("../models/mongoose");
const jwt = require("jsonwebtoken");

exports.signin = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      email: req.body.email,
    });
    let { id, username, imgUrl } = user;
    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign(
        {
          id,
          username,
          imgUrl,
        },
        process.env.SECRET_KEY
      );
      return res.status(200).json({
        id,
        username,
        imgUrl,
        token,
      });
    } else {
      return next({
        status: 400,
        message: "Invalid email/password",
      });
    }
  } catch (err) {
    return next({
      message: err.message,
    });
  }
};

exports.signup = async function (req, res, next) {
  try {
    let user = await db.User.create(req.body);
    let { id, username, imgUrl } = user;
    let token = jwt.sign(
      {
        id,
        username,
        imgUrl,
      },
      process.env.SECRET_KEY
    );

    return res.status(200).json({
      id,
      username,
      imgUrl,
      token,
    });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Username and email is taken";
    }
    return next({
      status: 400,
      message: err.message,
    });
  }
};
