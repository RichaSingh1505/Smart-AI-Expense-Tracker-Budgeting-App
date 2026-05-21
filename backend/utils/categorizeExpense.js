export function categorizeExpense(title) {
  title = title.toLowerCase();

  if (title.includes("cafe") || title.includes("coffee") || title.includes("restaurant"))
    return "Food & Drinks";

  if (title.includes("uber") || title.includes("ola") || title.includes("bus") || title.includes("train"))
    return "Travel";

  if (title.includes("amazon") || title.includes("flipkart") || title.includes("mall"))
    return "Shopping";

  if (title.includes("rent") || title.includes("electricity") || title.includes("water"))
    return "Bills";

  return "Others";
}
