import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all customers
router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add customer
router.post("/", (req, res) => {
  const { name, gender, address } = req.body;
  db.query(
    "INSERT INTO customers (name, gender, address) VALUES (?, ?, ?)",
    [name, gender, address],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: "Customer added" });
    }
  );
});

export default router;
