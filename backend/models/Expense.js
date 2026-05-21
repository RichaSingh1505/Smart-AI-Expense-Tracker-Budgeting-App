import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    title: String,
    amount: Number,
    category: String,
  },
  { timestamps: true } // 🔥 VERY IMPORTANT
);

export default mongoose.model("Expense", expenseSchema);
