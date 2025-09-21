// frontend/src/App.js
import React, { useContext } from "react";
import { Routes, Route, NavLink } from "react-router-dom"; // ✅ use NavLink
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import SellerDashboard from "./components/SellerDashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute";
import { AuthContext } from "./context/AuthContext";
import "./styles/App.css";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Shop
        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? "active" : "")}>
          Cart
        </NavLink>
        <NavLink to="/orders" className={({ isActive }) => (isActive ? "active" : "")}>
          Orders
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
          Profile
        </NavLink>
        <NavLink to="/seller" className={({ isActive }) => (isActive ? "active" : "")}>
          Seller Dashboard
        </NavLink>

        {user ? (
          <>
            <span style={{ marginLeft: "10px" }}>Hello, {user.name}</span>
            <button onClick={logout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ marginLeft: "10px" }}
            >
              Register
            </NavLink>
          </>
        )}
      </nav>

      <Routes>
        {/* Public */}
        <Route path="/" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected */}
        <Route
          path="/cart"
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Role-based */}
        <Route
          path="/seller"
          element={
            <PrivateRoute requiredRole="seller">
              <SellerDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
