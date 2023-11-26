import React, { useEffect } from "react";
import { Avatar, SingleChatHead } from "../../ui";
import { useSelector, useDispatch } from "react-redux";
import { fetchChats } from "../../app/index";

const ChatList = () => {
  const { authData } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authData._id) {
      return;
    }
    dispatch(fetchChats(authData._id));
  }, [authData]);

  return (
    <div className="flex-1 bg-green-200 p-2 flex flex-col gap-2">
      {/* Here map all the previous chat list with the recent messages */}
      <h1 className="text-lg font-semibold">Recent Chats</h1>
      {chats?.map((item) => {
        return <SingleChatHead key={item._id} data={item} />;
      })}
    </div>
  );
};

export default ChatList;
