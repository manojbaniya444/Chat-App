import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SocketContext = createContext();

const ENDPOINT = import.meta.env.ENDPOINT || "http://localhost:8080";
//

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  const { authData } = useSelector((state) => state.user);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [authData]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
