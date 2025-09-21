import express from "express";
import cors from "cors";
import db from "./db.js";
import costumesRoute from "./routes/costumes.js";
import customersRoute from "./routes/customers.js";
import ordersRoute from "./routes/orders.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/costumes", costumesRoute);
app.use("/customers", customersRoute);
app.use("/orders", ordersRoute);

app.get("/", (req, res) => {
  res.send("Costume Rental API is running ✅");
});

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
