import express from "express";
import Expense from "../models/Expense.js";
import Goal from "../models/Goal.js";
import getRecommendations from "../ai/recommendations.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // 🔹 Current month range
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const endOfMonth = new Date();

    // 🔹 Fetch current month expenses
    const expenses = await Expense.find({
      createdAt: {
        $gte: startOfMonth,
        $lte: endOfMonth,
      },
    });

    let total = 0;
    const categories = {};

    expenses.forEach((e) => {
      total += e.amount;
      categories[e.category] =
        (categories[e.category] || 0) + e.amount;
    });

    const food = categories.Food || 0;
    const transport = categories.Transport || 0;

    // 🎯 Goal data
    const goal = await Goal.findOne();
    const budget = goal?.monthlyBudget || 10000;
    const goalAmount = goal?.targetAmount || 0;

    // 💰 Current savings & future planning
    const currentSavings = budget - total;
    const requiredSaving = goalAmount - currentSavings;

    let futureSuggestion = null;
    if (requiredSaving > 0) {
      futureSuggestion =
        "Next month apna goal achieve karne ke liye shopping aur café expenses kam rakho.";
    }

    // 🤖 AI Recommendations
    const recommendations = getRecommendations({
      total,
      food,
      transport,
      budget,
    });

    // 💡 Extra Smart Insights
    if (food < 500) {
      recommendations.push(
        "You saved money this month by avoiding cafes 👍"
      );
    }

    if (transport > total * 0.4) {
      recommendations.push(
        "Transport expense is very high. Try public transport."
      );
    }

    res.json({
      total,
      categories,
      budget,
      goal,
      recommendations,
      futureSuggestion, // 🎯 NEW
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
