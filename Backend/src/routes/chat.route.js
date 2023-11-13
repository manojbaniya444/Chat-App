const express = require("express");
const {
  getAllChatsController,
  addNewChatController,
  sendMessageController,
} = require("../controllers/chat.controller");
const router = express.Router();

router.get("/all-chats", getAllChatsController);
router.post("/new-chat", addNewChatController);
router.post("/send-message/:id", sendMessageController);

module.exports = router;
