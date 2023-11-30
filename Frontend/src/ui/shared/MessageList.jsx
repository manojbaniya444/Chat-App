import React, { useEffect, useState } from "react";
import { Avatar } from "../../ui";
import { useSelector } from "react-redux";

const MessageList = ({ messages, friendName }) => {
  const { authData } = useSelector((state) => state.user);

  return (
    <div className="bg-gray-500 text-white flex flex-1 flex-col gap-2 p-2 rounded-md max-w-[100%]">
      {messages?.map((item, index) => {
        return (
          // Here the user using is blue box and the sender is green so adjust the style according to the user
          <div
            key={index}
            className={
              authData._id !== item?.sender //if true then display message as received message
                ? "flex flex-col gap-2  self-start bg-gray-100 text-black p-2 rounded-md max-w-[70%]"
                : "self-end bg-blue-900 p-2 rounded-md max-w-[70%]"
            }
          >
            {authData._id !== item?.sender && (
              <p className="font-semibold">{friendName}</p>
            )}

            <p className="font-light text-sm md:text-base w-[100%]">
              {item.message}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
