const express = require("express");
const cors = require("cors");
const userRoute = require("./src/routes/user.route");
const chatRoute = require("./src/routes/chat.route");
const { verifyAuthentication } = require("./src/middlewares/auth.middleware");
const path = require("path");

const app = express();

// adding socket.io in conjunction with Express
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "https://kurakaani.onrender.com",
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

// deployment code
const __directoryName = path.resolve();
app.use(express.static(path.join(__directoryName, "../Frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__directoryName, "../Frontend/dist/index.html"))
);

// socket io events
let activeUsers = [];
io.on("connection", (socket) => {
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
    // also emitting the notification to the user when other user with different chatId sends message
    try {
      const timestamp = new Date().toISOString();
      io.to(receiverUser.socketId).emit("notification", {
        senderId: messageDetails.sender,
        receiverId: messageDetails.receiver,
        message: messageDetails.message,
        chatId: messageDetails.chatId,
        isRead: false,
        date: timestamp,
      });
    } catch (error) {
      console.log("Error emmitting notification: ", error);
    }
  });

  // typing event
  socket.on("send typing", (typingDetails) => {
    const receiverUser = activeUsers?.find(
      (user) => user.userId === typingDetails.receiverId
    );
    if (!receiverUser) return;

    io.to(receiverUser.socketId).emit("get typing", typingDetails);
  });
  socket.on("send stop typing", (typingDetails) => {
    const receiverUser = activeUsers?.find(
      (user) => user.userId === typingDetails.receiverId
    );
    if (!receiverUser) return;

    io.to(receiverUser.socketId).emit("get stop typing", typingDetails);
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
  });
});

module.exports = server;
