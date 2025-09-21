import express from "express";
import db from "../db.js";

const router = express.Router();

// Get all costumes
router.get("/", (req, res) => {
  db.query("SELECT * FROM costumes", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add costume
router.post("/", (req, res) => {
  const { name, age_group, gender, type, size, image } = req.body;
  db.query(
    "INSERT INTO costumes (name, age_group, gender, type, size, image) VALUES (?, ?, ?, ?, ?, ?)",
    [name, age_group, gender, type, size, image],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, message: "Costume added" });
    }
  );
});

export default router;
