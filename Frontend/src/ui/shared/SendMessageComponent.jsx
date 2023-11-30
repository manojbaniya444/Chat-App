import React, { useState } from "react";
import { IconButton } from "../../ui";
import { AiOutlineSend } from "react-icons/ai";
import { sendMessages } from "../../app/index";
import { useDispatch } from "react-redux";

const SendMessageComponent = ({ receiverId, senderId, chatId }) => {
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const messageSendHandler = async () => {
    // dispatch here for the message sending handler
    // to send the message we need 1-> sender id --> authData._id maa hunxa 2-> receiver id --> jun hunxa currentChat ko _id maa 3-> Message to send jun hamro local state maa ra chatId jun huncha

    const chatDetails = {
      sender: senderId,
      receiver: receiverId,
      message,
      chatId,
    };
    await dispatch(sendMessages(chatDetails));
    setMessage("");
  };

  return (
    <div className=" p-2 rounded-md flex gap-2 items-center">
      <input
        name=""
        id=""
        cols="3"
        className="flex-1 outline-none font-thina rounded-sm p-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      ></input>
      <IconButton onClick={messageSendHandler}>
        <AiOutlineSend />
      </IconButton>
    </div>
  );
};

export default SendMessageComponent;
