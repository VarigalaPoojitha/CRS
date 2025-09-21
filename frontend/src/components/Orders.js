// frontend/src/components/Orders.js
import React, { useEffect, useState, useContext } from "react";
import api from "./api";
import { AuthContext } from "../context/AuthContext";

function Orders() {
  const { user } = useContext(AuthContext); // ✅ removed token
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // ✅ no manual headers — token added automatically by api.js
    api
      .get("/orders")
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err.response?.data || err.message);
        setError("Failed to load orders.");
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return <p>Please log in to view your orders.</p>;
  }

  if (loading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div className="orders-section">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <ul>
          {orders.map((o, index) => (
            <li key={index} className="order-item">
              <p>
                <strong>Order #{o.order_id}</strong> ({o.status}) — {o.order_date}
              </p>
              <p>
                {o.title} × {o.quantity} for {o.rental_days} days
              </p>
              <p>Paid: ₹{o.price_at_purchase}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
