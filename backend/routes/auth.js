const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const { SECRET } = require("../middleware/auth");

const router = express.Router();

// Register (auto-login after registration)
router.post("/register", async (req, res) => {
  const { name, email, password, gender, address, role } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name, email, password_hash, gender, address, role) VALUES (?,?,?,?,?,?)",
      [name, email, hash, gender, address, role],
      (err, result) => {
        if (err) return res.status(500).json(err);

        // Create JWT token right after registration
        const userId = result.insertId;
        const token = jwt.sign({ id: userId, role }, SECRET, { expiresIn: "1h" });

        res.json({
          token,
          user: { id: userId, name, email, role, gender, address },
        });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ message: "Invalid" });

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: "Invalid" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        gender: user.gender,
        address: user.address,
      },
    });
  });
});

module.exports = router;
