// frontend/src/components/Cart.js
import React, { useContext } from "react";
import api from "./api";
import { AuthContext } from "../context/AuthContext";

function Cart({ cart, setCart }) {
  const { user, token } = useContext(AuthContext);

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
        price: item.price, // include price since backend expects price_at_purchase
      }));

      await api.post(
        "/orders",
        { items },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order placed successfully!");
      setCart([]); // clear cart
    } catch (err) {
      console.error("Error placing order:", err);
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
              <span>{item.name}</span>
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
