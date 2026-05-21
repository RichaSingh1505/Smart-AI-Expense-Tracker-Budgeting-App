import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import expenseRoutes from "./routes/expenses.js";
import insightsRoutes from "./routes/insights.js";
import goalRoutes from "./routes/goals.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/insights", insightsRoutes);
app.use("/api/goals", goalRoutes);

// db connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log("MongoDB Error:", err));

// server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
