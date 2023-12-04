import React from "react";
import { Avatar, SingleChatHeadMobile } from "../../ui";
import { useSelector } from "react-redux";

const FriendList = () => {
  const { chats } = useSelector((state) => state.chat);

  return (
    <div className="flex gap-1 p-2 overflow-x-auto bg-zinc-900 scrollbar-style2">
      {chats?.map((item) => {
        return <SingleChatHeadMobile chatData={item} key={item._id} />;
      })}
    </div>
  );
};

export default FriendList;
