import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all orders
router.get("/", (req, res) => {
  db.query(
    "SELECT o.id, o.quantity, o.rental_days, o.order_date, c.name AS customer, cs.name AS costume FROM orders o JOIN customers c ON o.customer_id=c.id JOIN costumes cs ON o.costume_id=cs.id",
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
});

// Place new order
router.post("/", (req, res) => {
  const { costume_id, customer_id, quantity, rental_days } = req.body;
  db.query(
    "INSERT INTO orders (costume_id, customer_id, quantity, rental_days) VALUES (?, ?, ?, ?)",
    [costume_id, customer_id, quantity, rental_days],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: "Order placed" });
    }
  );
});

export default router;
