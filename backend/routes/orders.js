const express = require("express");
const db = require("../db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Place order
router.post("/", verifyToken, (req, res) => {
  if (req.user.role !== "customer") return res.status(403).json({ message: "Only customers can order" });

  const { items } = req.body; // [{ product_id, quantity, rental_days, price }]
  db.query("INSERT INTO orders (customer_id) VALUES (?)", [req.user.id], (err, result) => {
    if (err) return res.status(500).json(err);
    const orderId = result.insertId;

    const values = items.map(i => [orderId, i.product_id, i.quantity, i.rental_days, i.price]);
    db.query(
      "INSERT INTO order_items (order_id, product_id, quantity, rental_days, price_at_purchase) VALUES ?",
      [values],
      (err2) => {
        if (err2) return res.status(500).json(err2);
        res.json({ message: "Order placed", orderId });
      }
    );
  });
});

// Get customer orders
router.get("/", verifyToken, (req, res) => {
  if (req.user.role !== "customer") return res.status(403).json({ message: "Only customers" });

  db.query(
    "SELECT o.id as order_id, o.order_date, o.status, p.title, oi.quantity, oi.rental_days, oi.price_at_purchase " +
    "FROM orders o " +
    "JOIN order_items oi ON o.id=oi.order_id " +
    "JOIN products p ON oi.product_id=p.id " +
    "WHERE o.customer_id=?",
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

module.exports = router;
