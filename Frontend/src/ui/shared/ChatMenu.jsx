import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrNotification } from "react-icons/gr";
import { Avatar, IconButton, MobileMenu } from "../../ui";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/index";
import { currentChatWith } from "../../app/chat/chatSlice";

const ChatMenu = () => {
  const [mobileView, setMobileView] = useState(false);

  const { authData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="flex gap-2 p-2 bg-zinc-900 text-white items-center h-[70px] ">
      {mobileView && <MobileMenu setMobileView={setMobileView} />}
      {/* Menu Button Hidden on large devices and visible on small */}
      <div className="block md:hidden">
        <IconButton onClick={() => setMobileView(true)}>
          <AiOutlineMenu className="text-2xl text-black" />
        </IconButton>
      </div>
      <input type="search" className="bg-gray-300" placeholder="search here" />
      <IconButton>
        <GrNotification className="text-2xl" />
      </IconButton>
      <div
        onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          dispatch(
            currentChatWith({ receiverUserDetails: null, chatId: null })
          );
          dispatch(logout());
          navigate("/login");
        }}
      >
        <Avatar src={authData.url} />
      </div>
    </div>
  );
};

export default ChatMenu;
