import React from "react";
import { Avatar, SingleChatHeadMobile } from "../../ui";
import { useSelector } from "react-redux";

const FriendList = () => {
  const { chats } = useSelector((state) => state.chat);

  return (
    <div className="flex gap-2 p-5 overflow-x-auto">
      {chats?.map((item) => {
        return (
          <div className="flex flex-col gap-1" key={item._id}>
            <SingleChatHeadMobile chatData={item} />
          </div>
        );
      })}
    </div>
  );
};

export default FriendList;
