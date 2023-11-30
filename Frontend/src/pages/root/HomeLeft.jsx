import React from "react";
import { ChatList, Menu } from "../../ui";

const HomeLeft = () => {
  return (
    <div className="bg-gray-200 h-screen flex-[0.3] hidden md:flex flex-col border-r-2">
      <Menu />
      <ChatList />
    </div>
  );
};

export default HomeLeft;
