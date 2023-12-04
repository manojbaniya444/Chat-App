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
  const [isTyping, setIsTyping] = useState(false);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  const chatDetails = {
    sender: senderId,
    receiver: receiverId,
    message,
    chatId,
  };

  // handle message typing
  const messageTypingChangeHandler = (e) => {
    setMessage(e.target.value);
    setIsTyping(true);
  };

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setIsTyping(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [message]);

  // for emitting the typing event
  useEffect(() => {
    if (!isTyping) return;
    if (socket === null) return;
    socket.emit("sendTyping", {
      senderId,
      receiverId,
      chatId,
    });
  }, [isTyping]);

  // message send handler
  const messageSendHandler = async (e) => {
    // dispatch here for the message sending handler
    // to send the message we need 1-> sender id --> authData._id maa hunxa 2-> receiver id --> jun hunxa currentChat ko _id maa 3-> Message to send jun hamro local state maa ra chatId jun huncha
    e.preventDefault();
    setIsTyping(false);
    const response = await dispatch(sendMessages(chatDetails));
    setMessage("");
    // after message sent emit the socket to send new message
    if (socket === null) return;
    if (message === "") return;
    socket.emit("newMessage", {
      ...chatDetails,
      createdAt: new Date().toISOString(),
    });
    setAllMessages((prevMessages) => [
      ...prevMessages,
      { ...chatDetails, createdAt: new Date().toISOString() },
    ]);
  };

  return (
    <form
      onSubmit={messageSendHandler}
      className="text-xs md:text-base p-2 rounded-md flex gap-2 items-center text-black"
    >
      <input
        name=""
        id=""
        cols="3"
        className="flex-1 outline-none text-sm md:text-basea  rounded-sm p-1 bg-gray-300 h-7 md:h-9"
        value={message}
        placeholder="type message..."
        onChange={messageTypingChangeHandler}
      ></input>
      <IconButton type={"submit"}>
        <AiOutlineSend className="text-black" />
      </IconButton>
    </form>
  );
};

export default SendMessageComponent;
