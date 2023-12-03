import React, { useEffect, useState } from "react";
import { CreateAccount, Home, Login, Friends } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
// socket connection code might migrate later.
import io from "socket.io-client";
const ENDPOINT = "http://localhost:8080";
//

const App = () => {
  // socket connection
  const [socket, setSocket] = useState(null);
  const [activeUsers, setActiveUsers] = useState();

  const { authData } = useSelector((state) => state.user);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    // console.log("New socket initialized")

    return () => {
      newSocket.disconnect();
    };
    // change the socket when the authData changes
  },[authData]);

  // for connected user to show who is online or not
  useEffect(() => {
    if (socket === null) return;
    socket.emit("newUser", authData._id);
    socket.on("getActiveUsers", (activeUsers) => {
      console.log("active Users", activeUsers);
      setActiveUsers(activeUsers);
    });

    // cleanup function
    return () => {
      socket.off("getActiveUsers");
    };
  }, [socket]);

  //
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<CreateAccount />} />
        <Route
          path="/search-friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
