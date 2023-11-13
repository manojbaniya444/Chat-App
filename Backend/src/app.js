const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const chatRoute = require("./routes/chat.route");
const { verifyAuthentication } = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

// app routes
app.use("/api/user", userRoute);
app.use("/api/chat", verifyAuthentication, chatRoute);

module.exports = app;
