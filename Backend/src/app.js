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
    if (userId === null) return;
    !activeUsers.some((user) => user.userId === userId) &&
      activeUsers.push({
        userId,
        socketId: socket.id,
      });
    // emitting the active Users to the client
    io.emit("getActiveUsers", activeUsers);
  });

  //--> New message event
  socket.on("newMessage", (messageDetails) => {
    const receiverUser = activeUsers.find(
      (user) => user.userId === messageDetails.receiver
    );
    if (!receiverUser) return;
    // if there us user online then emit the message to the receiver user
    io.to(receiverUser.socketId).emit("getMessage", messageDetails);
  });

  // on disconnecting event
  socket.on("disconnect", () => {
    // remove the user from the activeUsers list with the current socketId
    const onlineUsersAfterDisconnect = activeUsers.filter(
      (user) => user.socketId !== socket.id
    );
    activeUsers = onlineUsersAfterDisconnect;
    // emitting the active users after userdisconnects
    io.emit("getActiveUsers", onlineUsersAfterDisconnect);
    console.log("User with socketid: " + socket.id + " Disconnects");
  });
});

module.exports = server;
