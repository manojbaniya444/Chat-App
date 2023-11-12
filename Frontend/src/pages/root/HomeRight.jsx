import React from "react";
import { ChatComponent, ChatMenu } from "../../ui";

const HomeRight = () => {
  return (
    <div className="h-screen bg-gray-100  flex-1 md:flex-[0.7]">
      <ChatMenu />
      <ChatComponent />
    </div>
  );
};

export default HomeRight;
