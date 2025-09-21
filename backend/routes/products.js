// backend/routes/products.js
const express = require("express");
const multer = require("multer");
const db = require("../db");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/**
 * GET /api/products
 * Public — fetch products with optional filters
 */
router.get("/", (req, res) => {
  const { category, age_group, gender, type, size } = req.query;
  let sql = "SELECT * FROM products WHERE 1=1";
  const params = [];

  if (category) { sql += " AND category=?"; params.push(category); }
  if (age_group) { sql += " AND age_group=?"; params.push(age_group); }
  if (gender) { sql += " AND gender=?"; params.push(gender); }
  if (type) { sql += " AND type=?"; params.push(type); }
  if (size) { sql += " AND size=?"; params.push(size); }

  db.query(sql, params, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
});

/**
 * POST /api/products
 * Protected — sellers add product
 */
router.post("/", verifyToken, upload.single("image"), (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden" });
  }

  const { title, description, category, age_group, gender, type, size, price } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

  db.query(
    "INSERT INTO products (seller_id, title, description, category, age_group, gender, type, size, price, image_path) VALUES (?,?,?,?,?,?,?,?,?,?)",
    [req.user.id, title, description, category, age_group, gender, type, size, price, imagePath],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      res.json({
        id: result.insertId,
        seller_id: req.user.id,
        title,
        description,
        category,
        age_group,
        gender,
        type,
        size,
        price,
        image_path: imagePath,
      });
    }
  );
});

/**
 * GET /api/products/my-products
 * Protected — sellers view their own products
 */
router.get("/my-products", verifyToken, (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden" });
  }

  db.query("SELECT * FROM products WHERE seller_id=?", [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Database error", error: err });
    res.json(results);
  });
});

/**
 * DELETE /api/products/:id
 * Protected — sellers delete their product
 */
router.delete("/:id", verifyToken, (req, res) => {
  if (req.user.role !== "seller") {
    return res.status(403).json({ message: "Forbidden" });
  }

  db.query(
    "DELETE FROM products WHERE id=? AND seller_id=?",
    [req.params.id, req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Database error", error: err });

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Product not found or not owned by seller" });
      }

      res.json({ message: "Product deleted successfully" });
    }
  );
});

module.exports = router;
