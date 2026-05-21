// 🤖 SMART CATEGORY DETECTION
export function autoCategory(title = "") {
  const t = title.toLowerCase();

  if (t.includes("uber") || t.includes("ola") || t.includes("bus"))
    return "Transport";

  if (
    t.includes("cafe") ||
    t.includes("coffee") ||
    t.includes("restaurant") ||
    t.includes("zomato") ||
    t.includes("swiggy")
  )
    return "Food";

  if (
    t.includes("amazon") ||
    t.includes("flipkart") ||
    t.includes("myntra")
  )
    return "Shopping";

  return "Others";
}

// 🤖 AI RECOMMENDATIONS LOGIC
export default function getRecommendations(insights) {
  const tips = [];

  const foodPercent = (insights.food / insights.total) * 100;

  // 🍔 FOOD ANALYSIS
  if (foodPercent > 40) {
    tips.push(
      "Food expenses 40% se zyada hain. Café visits kam karoge to kaafi savings ho sakti hai."
    );
  }

  // 🚕 TRANSPORT ANALYSIS
  if (insights.transport > 2000) {
    tips.push(
      "Transport cost zyada hai. Public transport ya car pooling consider karo."
    );
  }

  // 💰 BUDGET CHECK
  if (insights.budget && insights.total > insights.budget) {
    tips.push(
      "Aap apna monthly budget exceed kar chuke ho. Non-essential expenses kam karo."
    );
  }

  // ✅ POSITIVE FEEDBACK
  if (tips.length === 0) {
    tips.push("Great job! Aap apna kharcha achhe se manage kar rahe ho 👍");
  }

  return tips;
}
