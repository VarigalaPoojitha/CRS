import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Shop from "./components/Shop";
import Cart from "./components/Cart";
import Orders from "./components/Orders";
import Profile from "./components/Profile";
import SellerDashboard from "./components/SellerDashboard";
import "./styles/App.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Shop</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/orders">Orders</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/seller">Seller Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/seller" element={<SellerDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
