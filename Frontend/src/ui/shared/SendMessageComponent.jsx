import React, { useEffect, useState } from "react";
import { IconButton } from "../../ui";
import { AiOutlineSend } from "react-icons/ai";
import { sendMessages } from "../../app/index";
import { useDispatch } from "react-redux";
import { useSocket } from "../../socketContext/Context";

const SendMessageComponent = ({
  receiverId,
  senderId,
  chatId,
  setAllMessages,
}) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const chatDetails = {
    sender: senderId,
    receiver: receiverId,
    message,
    chatId,
  };

  const messageSendHandler = async () => {
    // dispatch here for the message sending handler
    // to send the message we need 1-> sender id --> authData._id maa hunxa 2-> receiver id --> jun hunxa currentChat ko _id maa 3-> Message to send jun hamro local state maa ra chatId jun huncha

    const response = await dispatch(sendMessages(chatDetails));
    setMessage("");
    // after message sent emit the socket to send new message
    if (socket === null) return;
    socket.emit("newMessage", chatDetails);
    setAllMessages((prevMessages) => [...prevMessages, chatDetails]);
  };

  // socket to emit new message
  // useEffect(() => {

  // }, [messageResponse]);

  return (
    <div className=" p-2 rounded-md flex gap-2 items-center text-black">
      <input
        name=""
        id=""
        cols="3"
        className="flex-1 outline-none font-thina rounded-sm p-1 bg-gray-300"
        value={message}
        placeholder="type message..."
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <IconButton onClick={messageSendHandler}>
        <AiOutlineSend className="text-black" />
      </IconButton>
    </div>
  );
};

export default SendMessageComponent;
