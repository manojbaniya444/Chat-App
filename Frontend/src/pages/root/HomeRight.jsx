import React from "react";
import { ChatComponent, ChatMenu, FriendList } from "../../ui";

const HomeRight = () => {
  return (
    <div className="h-screen bg-gray-100 flex flex-col  flex-1 md:flex-[0.7]">
      <ChatMenu />
      {/* Chat list to be shown when in large device */}
      <div className="md:hidden">
        <FriendList />
      </div>
      {/* Main chat component here */}
      <ChatComponent />
    </div>
  );
};

export default HomeRight;
