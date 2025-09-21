import React from "react";
import api from "./api";

function Cart({ cart, setCart }) {
  const placeOrder = () => {
    cart.forEach(item => {
      api.post("/orders", {
        costume_id: item.id,
        customer_id: 1,   // later link with profile
        quantity: item.quantity || 1,
        rental_days: 2
      }).then(() => {
        console.log("Order placed for:", item.name);
      }).catch(err => console.error("Error placing order:", err));
    });
    setCart([]); // clear cart
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
            </div>
          ))}
          <button onClick={placeOrder}>Place Order</button>
        </>
      )}
    </div>
  );
}

export default Cart;