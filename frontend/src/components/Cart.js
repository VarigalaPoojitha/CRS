// frontend/src/components/Cart.js
import React, { useContext } from "react";
import api from "./api";
import { AuthContext } from "../context/AuthContext";

function Cart({ cart, setCart }) {
  const { user } = useContext(AuthContext); // ✅ removed token

  const placeOrder = async () => {
    if (!user) {
      alert("Please log in to place an order.");
      return;
    }

    try {
      const items = cart.map(item => ({
        product_id: item.id,
        quantity: item.quantity || 1,
        rental_days: 2,
        price: item.price, // backend expects price_at_purchase
      }));

      // ✅ no need for headers here, token auto-attached by api.js
      await api.post("/orders", { items });

      alert("Order placed successfully!");
      setCart([]); // clear cart
    } catch (err) {
      console.error("Error placing order:", err.response?.data || err.message);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-section">
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <span>{item.title}</span> {/* ✅ correct: backend sends title, not name */}
              <span>{item.quantity || 1} pcs</span>
              <span>₹{item.price}</span>
            </div>
          ))}
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;
