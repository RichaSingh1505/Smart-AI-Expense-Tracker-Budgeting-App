import Expense from "../models/Expense.js";
import { autoCategory } from "../ai/recommendations.js";

// ✅ GET all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ ADD expense (AI auto category)
export const addExpense = async (req, res) => {
  const { title, amount } = req.body;

  try {
    const expense = new Expense({
      title,
      amount,
      category: autoCategory(title), // 🤖 SMART CATEGORY
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
