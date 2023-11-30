import React from "react";
import { ChatList, Menu } from "../../ui";

const HomeLeft = () => {
  return (
    <div className="bg-gray-200 h-screen width-[30%] hidden md:flex flex-col">
      <Menu />
      <ChatList />
    </div>
  );
};

export default HomeLeft;
