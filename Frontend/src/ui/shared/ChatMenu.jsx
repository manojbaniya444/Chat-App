import React, { useState } from "react";
import { GrNotification } from "react-icons/gr";
import { Avatar, IconButton, MobileMenu } from "../../ui";
import { AiOutlineMenu } from "react-icons/ai";

const ChatMenu = () => {
  const [mobileView, setMobileView] = useState(false);
  return (
    <>
      {mobileView && <MobileMenu setMobileView={setMobileView} />}
      <div className="flex gap-2 p-3 bg-gray-300 items-center">
        {/* Menu Button Hidden on large devices and visible on small */}
        <div className="block md:hidden">
          <IconButton onClick={() => setMobileView(true)}>
            <AiOutlineMenu className="text-2xl" />
          </IconButton>
        </div>
        <input type="search" placeholder="search here" />
        <IconButton>
          <GrNotification className="text-2xl" />
        </IconButton>
        <Avatar />
      </div>
    </>
  );
};

export default ChatMenu;
