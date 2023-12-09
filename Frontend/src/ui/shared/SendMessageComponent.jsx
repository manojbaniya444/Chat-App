import React, { useEffect, useState } from "react";
import { IconButton, TypingAnimation } from "../../ui";
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
  const { socket, friendIsTypingMessages } = useSocket();

  const chatDetails = {
    sender: senderId,
    receiver: receiverId,
    message,
    chatId,
  };

  // handle message typing
  const messageTypingChangeHandler = (e) => {
    setMessage(e.target.value);
    if (socket === null) return;
    // if the user is continuously typing then no need to send continuous socket event in that case return
    if (isTyping) return;
    setIsTyping(true);
    // this event will be received as isFriendTypingMessages will be set true in the receiver side
    socket.emit("send typing", { senderId, receiverId, chatId });
  };

  useEffect(() => {
    // if the typing is already false no need to send stop typing signal instead when the user types again then isTyping will be set true and then the change in that dependency will cause trigger this to send stop typing socket event after 2 seconds of change in onchange message handler
    if (!isTyping) return;
    let timeoutId = setTimeout(() => {
      // when this event is sent user will receive if the current chat is open and then the isFriendTypingMessages will be set to false which is used to stop showing typing animation to the receiver user
      socket.emit("send stop typing", { senderId, receiverId, chatId });
      setIsTyping(false);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isTyping]);

  // message send handler
  const messageSendHandler = async (e) => {
    // dispatch here for the message sending handler
    // to send the message we need 1-> sender id --> authData._id maa hunxa 2-> receiver id --> jun hunxa currentChat ko _id maa 3-> Message to send jun hamro local state maa ra chatId jun huncha
    e.preventDefault();
    // emit the stop message signal when sending message
    socket && socket.emit("send stop typing", { senderId, receiverId, chatId });

    await dispatch(sendMessages(chatDetails));
    setMessage("");
    // after message sent emit the socket to send new message
    if (socket === null) return;
    if (message === "") return;
    socket.emit("newMessage", {
      ...chatDetails,
      createdAt: new Date().toISOString(),
    });
    // immediately add the sent message to the sender UI and receiver will also receiver the message in real time with socket connection
    setAllMessages((prevMessages) => [
      ...prevMessages,
      { ...chatDetails, createdAt: new Date().toISOString() },
    ]);
  };

  return (
    <div>
      {friendIsTypingMessages && <TypingAnimation />}
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
    </div>
  );
};

export default SendMessageComponent;
