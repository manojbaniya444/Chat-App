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

  // logout handler
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(currentChatWith({ receiverUserDetails: null, chatId: null }));
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex gap-1 p-2 bg-zinc-950 md:bg-zinc-900 text-white items-center md:h-[70px] ">
      {mobileView && <MobileMenu setMobileView={setMobileView} />}
      {/* Menu Button Hidden on large devices and visible on small */}
      <div className="block md:hidden">
        <IconButton onClick={() => setMobileView(true)}>
          <AiOutlineMenu className="text-2xl text-black" />
        </IconButton>
      </div>
      <input
        type="search"
        className="bg-gray-300 text-black h-[30px] md:h-[40px]"
        placeholder="search here"
      />
      <IconButton>
        <GrNotification className="text-2xl" />
      </IconButton>
      <img
        onClick={logoutHandler}
        src={authData.url}
        alt="profileimg"
        className="h-7 w-7 rounded-full object-cover"
      />
    </div>
  );
};

export default ChatMenu;
