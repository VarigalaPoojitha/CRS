import mysql from "mysql2";

const db = mysql.createConnection({
  host: "localhost",
  user: "crs",       // your MySQL username
  password: "Password", // your MySQL password
  database: "costume_rental"
});

db.connect(err => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ MySQL connected...");
  }
});

export default db;
