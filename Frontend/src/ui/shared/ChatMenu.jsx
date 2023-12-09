import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GrNotification } from "react-icons/gr";
import { Avatar, IconButton, MobileMenu, NotificationModal } from "../../ui";
import { AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { logout } from "../../app/index";
import { currentChatWith } from "../../app/chat/chatSlice";
import { useSocket } from "../../socketContext/Context";
import { getUnreadNotifications } from "../../utils/getUnreadNotifications";

const ChatMenu = () => {
  const [mobileView, setMobileView] = useState(false);
  const [newNotifications, setNewNotifications] = useState([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const { notifications, setNotifications } = useSocket();
  const { authData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get Unread notifications
  useEffect(() => {
    setNewNotifications(getUnreadNotifications(notifications));
  }, [notifications]);

  // logout handler
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(currentChatWith({ receiverUserDetails: null, chatId: null }));
    dispatch(logout());
    navigate("/login");
  };

  // display Notification Handler
  const displayNotificationHandler = () => {
    setShowNotificationModal(!showNotificationModal);
    // later on only change the selected notification to read: true
    const readNotifications = newNotifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    // update the notifications in the context
    // setNotifications(getUnreadNotifications(readNotifications));
  };

  return (
    <div className="flex gap-1 p-2 bg-zinc-950 md:bg-zinc-900 text-white items-center md:h-[70px] relative">
      {/* Notification modal if notificationModal is open */}
      {showNotificationModal && (
        <NotificationModal
          notifications={newNotifications}
          setNotifications={setNotifications}
          setShowNotificationModal={setShowNotificationModal}
        />
      )}
      {/* Displaying menu modal on small screen */}
      {mobileView && <MobileMenu setMobileView={setMobileView} />}
      {/* Menu Button Hidden on large devices and visible on small */}
      <div className="block md:hidden">
        <IconButton onClick={() => setMobileView(true)}>
          <AiOutlineMenu className="text-2xl text-black" />
        </IconButton>
      </div>
      {/* to search chatlist */}
      <input
        type="search"
        className="bg-gray-300 text-sm text-black h-[30px] md:h-[40px]"
        placeholder="sajaawat ko laagi : ("
      />
      {/* notifications */}
      <div className="relative">
        <IconButton onClick={displayNotificationHandler}>
          <GrNotification className="text-2xl" />
        </IconButton>
        {newNotifications.length > 0 && (
          <p className="absolute -top-2 bg-red-500 h-5 w-5 rounded-full flex items-center justify-center text-xs md:text-sm">
            {newNotifications.length <= 9 ? newNotifications.length : "9+"}
          </p>
        )}
      </div>
      {/* logout */}
      <img
        onClick={logoutHandler}
        src={authData.url}
        alt="profileimg"
        className="h-7 w-7 md:h-9 md:w-9 rounded-full object-cover"
      />
    </div>
  );
};

export default ChatMenu;
