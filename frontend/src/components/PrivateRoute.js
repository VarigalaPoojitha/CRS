// frontend/src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function PrivateRoute({ children, requiredRole }) {
  const { user } = useContext(AuthContext);

  // If user not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If route requires a specific role and user does not match → redirect
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  // If logged in (and role matches if required), render the protected component
  return children;
}

export default PrivateRoute;
