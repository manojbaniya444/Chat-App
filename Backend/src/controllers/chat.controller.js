const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

//----->get all the chatlists
const getAllChatsController = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Participant Id missing" });
  }
  try {
    const chats = await Chat.find({
      participants: { $elemMatch: { $eq: id } },
    });
    res
      .status(200)
      .json({ success: true, message: "All chats fetch success", chats });
  } catch (error) {
    return res
      .status(404)
      .json({ success: false, message: "Fail fetching the chat" });
  }
  // return res.status(200).json({ success: true, message: "Fetch success" });
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

//-----> Fetch messages controller
const fetchChatController = async (req, res) => {
  const { chatId } = req.params;
  if (!chatId) {
    return res
      .status(404)
      .json({ success: false, message: "Chat id reaquired" });
  }

  // later on add the infinite scroll to fetch more messages
  const messages = await Message.find({ chatId })
    .sort({ createdAt: 1 })
    .limit(70);
  return res.status(200).json({
    success: true,
    message: "Messages of chat fetch success.",
    messages,
  });
};

module.exports = {
  getAllChatsController,
  addNewChatController,
  sendMessageController,
  fetchChatController,
};
