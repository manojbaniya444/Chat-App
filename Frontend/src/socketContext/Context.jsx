import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

const ENDPOINT = import.meta.env.ENDPOINT || "http://localhost:8080";
//

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { authData } = useSelector((state) => state.user);
  const latestNotificationRef = useRef(null);
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

  return (
    <SocketContext.Provider value={{ socket, notifications }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
