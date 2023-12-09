import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  // Auth here will be taken after the user has logged in
  const { token } = useSelector((state) => state.user);

  if (token) {
    if (token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
