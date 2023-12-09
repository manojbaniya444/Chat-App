import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

const ENDPOINT = "https://kurakaani.onrender.com";
//

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [friendIsTypingMessages, setFriendIsTypingMessages] = useState(false);

  const { authData } = useSelector((state) => state.user);
  const { messages, currentChatId } = useSelector((state) => state.chat);

  // new socket initialization
  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [authData]);

  useEffect(() => {
    if (socket === null) return;

    // Function to handle notifications
    const handleNotification = (notificationDetails) => {
      if (notificationDetails.chatId === currentChatId) {
        // If the notification is for the current chat, mark it as read
        const readNotification = { ...notificationDetails, isRead: true };
        setNotifications((prev) => [readNotification, ...prev]);
      } else {
        // If it's for a different chat, mark it as unread
        setNotifications((prev) => [notificationDetails, ...prev]);
      }
    };

    // closure related issue got here
    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, currentChatId]);

  // check if the friend is currently typing messages or not
  useEffect(() => {
    if (socket === null) return;
    socket.on("get typing", (typingDetails) => {
      if (currentChatId !== typingDetails.chatId) return;
      setFriendIsTypingMessages(true);
    });

    socket.on("get stop typing", (typingDetails) => {
      if (currentChatId !== typingDetails.chatId) return;
      setFriendIsTypingMessages(false);
    });

    return () => {
      socket.off("get typing");
      socket.off("get stop typing");
    };
  }, [socket, currentChatId]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notifications,
        setNotifications,
        friendIsTypingMessages,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
