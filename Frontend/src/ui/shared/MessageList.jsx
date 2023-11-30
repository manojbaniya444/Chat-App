import React, { useEffect, useState } from "react";
import { Avatar } from "../../ui";
import { useSelector } from "react-redux";

const MessageList = ({ messages, friendName }) => {
  const { authData } = useSelector((state) => state.user);

  if (messages?.length === 0) {
    return <div className="flex-1 flex justify-center items-center">
      <p className="text-sm md:text-xl">Send message</p>
    </div>
  }

  return (
    <div className="flex-1 flex gap-2 flex-col max-w-full p-2 scrollable-div scrollbar-style">
      {messages?.map((item, index) => (
        <div
          key={index}
          className={
            authData._id !== item?.sender
              ? "self-start max-w-[70%] bg-gray-200 rounded p-2"
              : "self-end max-w-[70%] bg-purple-900 text-white rounded p-2"
          }
        >
          {authData._id !== item?.sender && (
            <p className="font-semibold">{friendName}</p>
          )}

          <p className="break-all font-thin">{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
