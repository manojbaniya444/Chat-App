const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

//----->get all the chatlists
const getAllChatsController = async (req, res) => {
  const chats = await Chat.find({});
  res
    .status(200)
    .json({ success: true, message: "All chats fetch success", chats });
};

//----->create a new chat between two users or in a room
const addNewChatController = async (req, res) => {
  const { participants } = req.body;

  if (participants.length === 0 || !participants) {
    return res
      .status(400)
      .json({ success: false, message: "Chat participants require." });
  }

  // check if the chat with the participants exists or not
  const existingChat = await Chat.findOne({
    participants: { $all: participants },
  });

  if (existingChat) {
    return res
      .status(200)
      .json({ success: true, message: "Chat already exists." });
  }

  // if the chat is new then create a new chat with participants
  const newChat = new Chat({ participants });
  await newChat.save();
  res.status(201).json({
    success: true,
    message: "New chat created.",
    newChat,
  });
};

//----->send message controller
const sendMessageController = async (req, res) => {
  const { sender, receiver, message } = req.body;
  const { id } = req.params;

  // check if all the fields are available or not
  if (!sender || !receiver || !id || !message) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all the fields" });
  }

  // check if the chat id exists or not
  const chat = await Chat.findById(id);
  if (!chat) {
    return res
      .status(400)
      .json({ success: false, message: "Chat doesnot exists." });
  }

  // send message
  try {
    const newMessage = new Message({ sender, receiver, chatId: id, message });
    await newMessage.save();
    res
      .status(201)
      .json({ success: true, message: "Message sent", newMessage });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Something went wrong.", error });
  }
};

module.exports = {
  getAllChatsController,
  addNewChatController,
  sendMessageController,
};

/*
const lastMessage = await Message.findOne({
      chatId: existingChat?._id,
    }).sort({ createdAt: -1 });
    const updatedChat = await Chat.findByIdAndUpdate(
      existingChat._id,
      { $set: { lastMessage } },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Chat exists and last message modified",
    });

*/
