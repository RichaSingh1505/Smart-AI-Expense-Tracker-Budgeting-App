import express from "express";
import Goal from "../models/Goal.js";
import Expense from "../models/Expense.js";

const router = express.Router();

/* 🔹 CREATE GOAL */
router.post("/", async (req, res) => {
  try {
    const { title, targetAmount } = req.body;

    if (!title || !targetAmount) {
      return res.status(400).json({ message: "Title & targetAmount required" });
    }

    const goal = new Goal({
      title,
      amount: targetAmount, // mapped correctly
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 GET ALL GOALS */
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* 🔹 AI BUDGET PLANNING */
router.get("/plan/:income", async (req, res) => {
  try {
    const income = Number(req.params.income);

    if (!income || income <= 0) {
      return res.status(400).json({ message: "Valid income required" });
    }

    const expenses = await Expense.find();
    const totalExpense = expenses.reduce(
      (sum, e) => sum + Number(e.amount),
      0
    );

    const savings = income - totalExpense;

    const goals = await Goal.find();

    const plan = goals.map((goal) => ({
      goal: goal.title,
      targetAmount: goal.amount,
      monthlySaving:
        savings > 0 ? Math.ceil(goal.amount / 12) : "Not possible",
      monthsRequired:
        savings > 0 ? Math.ceil(goal.amount / savings) : "Not possible",
    }));

    res.json({
      income,
      totalExpense,
      savings,
      plan,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
