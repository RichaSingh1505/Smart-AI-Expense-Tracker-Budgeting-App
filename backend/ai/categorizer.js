function categorizeExpense(title) {
  title = title.toLowerCase();

  if (title.includes("cafe") || title.includes("coffee"))
    return "Food";

  if (title.includes("uber") || title.includes("bus"))
    return "Transport";

  if (title.includes("netflix") || title.includes("spotify"))
    return "Entertainment";

  if (title.includes("rent") || title.includes("electricity"))
    return "Bills";

  return "Others";
}

module.exports = categorizeExpense;
