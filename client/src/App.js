import React, { useState } from "react";
import Shop from "./Shop";
import Cart from "./Cart";
import Orders from "./Orders";
import Profile from "./Profile";
import "./App.css";

function App() {
  const [page, setPage] = useState("shop");
  const [cart, setCart] = useState([]);

  const addToCart = (costume) => {
    setCart([...cart, { ...costume, quantity: 1 }]);
  };

  return (
    <div>
      <header>
        <h1>Costume Management System</h1>
      </header>

      <div className="nav">
        <button onClick={() => setPage("shop")} className={page === "shop" ? "active" : ""}>Shop</button>
        <button onClick={() => setPage("cart")} className={page === "cart" ? "active" : ""}>Cart ({cart.length})</button>
        <button onClick={() => setPage("orders")} className={page === "orders" ? "active" : ""}>Orders</button>
        <button onClick={() => setPage("profile")} className={page === "profile" ? "active" : ""}>Profile</button>
      </div>

      {page === "shop" && <Shop addToCart={addToCart} />}
      {page === "cart" && <Cart cart={cart} setCart={setCart} />}
      {page === "orders" && <Orders />}
      {page === "profile" && <Profile />}
    </div>
  );
}

export default App;