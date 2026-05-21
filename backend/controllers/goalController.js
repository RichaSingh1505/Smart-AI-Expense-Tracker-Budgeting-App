const Goal = require("../models/Goal");

// Add Goal
exports.addGoal = async (req, res) => {
  try {
    const { title, targetAmount, monthlyBudget } = req.body;

    const goal = new Goal({
      title,
      targetAmount,
      monthlyBudget,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: "Failed to save goal" });
  }
};

// Get Goals
exports.getGoals = async (req, res) => {
  try {
    const goals = await Goal.find().sort({ createdAt: -1 });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch goals" });
  }
};
