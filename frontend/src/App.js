import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import SellerDashboard from "./components/SellerDashboard";
import Login from "./components/Login";
import Register from "./components/Register";   // ✅ import Register
import { AuthContext } from "./context/AuthContext";
import "./styles/App.css";

function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <Router>
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/seller">Seller Dashboard</Link>

        {user ? (
          <>
            <span style={{ marginLeft: "10px" }}>Hello, {user.name}</span>
            <button onClick={logout} style={{ marginLeft: "10px" }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" style={{ marginLeft: "10px" }}>
              Register
            </Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller" element={<SellerDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />  {/* ✅ register route */}
      </Routes>
    </Router>
  );
}

export default App;
