const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/user.route");
const chatRoute = require("./routes/chat.route");
const { verifyAuthentication } = require("./middlewares/auth.middleware");

const app = express();

// adding socket.io in conjunction with Express
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

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

// socket io events
let activeUsers = [];
io.on("connection", (socket) => {
  console.log("Connected to socket server.", socket.id);

  //-->adding new user
  socket.on("newUser", (userId) => {
    // first check if the user is already present in the list or not if not then push the user in the list with the user id and socket ID
    !activeUsers.some((user) => user.userId === userId) &&
      activeUsers.push({
        userId,
        socketId: socket.id,
      });
    io.emit("getActiveUsers", activeUsers);
  });
  // now emit the active users to the client
});

module.exports = server;
