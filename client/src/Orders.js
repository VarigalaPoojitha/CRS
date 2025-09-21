import React, { useEffect, useState } from "react";
import api from "./api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error fetching orders:", err));
  }, []);

  return (
    <div className="orders-section">
      <h2>Orders</h2>
      {orders.map(o => (
        <div key={o.id} className="order-item">
          <span>{o.customer} ordered {o.quantity} x {o.costume}</span>
          <span>({o.rental_days} days)</span>
        </div>
      ))}
    </div>
  );
}

export default Orders;