import express from "express";
import Expense from "../models/Expense.js";
import { categorizeExpense } from "../utils/categorizeExpense.js";

const router = express.Router();

/* 🔹 ADD EXPENSE (POST) */
router.post("/", async (req, res) => {
  try {
    const { title, amount, category } = req.body;

    if (!title || !amount) {
      return res.status(400).json({
        message: "Title and amount are required",
      });
    }

    // 🧠 AI decides category if user didn't provide one
    const finalCategory = category || categorizeExpense(title);

    const expense = new Expense({
      title,
      amount,
      category: finalCategory,
    });

    await expense.save();

    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 GET ALL EXPENSES */
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
