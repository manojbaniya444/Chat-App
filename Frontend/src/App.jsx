import React, { useEffect, useState } from "react";
import { CreateAccount, Home, Login, Friends } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
// socket connection code might migrate later.
import { useSocket } from "./socketContext/Context";
import { setActiveUsers } from "./app/index";

const App = () => {
  const { authData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { socket } = useSocket();

  // for connected user to show who is online or not
  useEffect(() => {
    if (socket === null) return;
    socket.emit("newUser", authData?._id);
    socket.on("getActiveUsers", (activeUsers) => {
      dispatch(setActiveUsers(activeUsers));
    });
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
