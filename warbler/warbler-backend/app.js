require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const errorHandler = require("./handlers/error");
const signRoutes = require("./routes/signRoutes");
const messagesRoutes = require("./routes/messageRoutes");
const { loginRequired, ensureCorrectUser } = require("./middleware/auth");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", signRoutes);
app.use(
  "/api/users/:id/messages",
  // loginRequired
  // ensureCorrectUser,
  messagesRoutes
);

// app.get("/api/messages", loginRequired)

app.use(function (req, res, next) {
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(3001, function () {
  console.log("Listening on port 3001");
});
