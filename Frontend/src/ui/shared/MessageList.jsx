import React, { useEffect, useState } from "react";
import { Avatar } from "../../ui";
import { useSelector } from "react-redux";

const MessageList = ({ messages, friendName }) => {
  const { authData } = useSelector((state) => state.user);

  return (
    <div className="flex-1 bg-blue-900 flex gap-2 flex-col max-w-full p-3 scrollable-div scrollbar-style">
      {messages?.map((item, index) => (
        <div
          key={index}
          className={
            authData._id !== item?.sender
              ? "self-start max-w-[70%] bg-blue-500 rounded p-2"
              : "self-end max-w-[70%] bg-green-500 rounded p-2"
          }
        >
          {/* {authData._id !== item?.sender && (
            <p className="font-semibold">{friendName}</p>
          )} */}

          <p className="break-all">{item.message}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
