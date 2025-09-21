const jwt = require("jsonwebtoken");
const SECRET = "your_secret_key";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) return res.status(403).json({ message: "No token" });

  jwt.verify(token.split(" ")[1], SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken, SECRET };
