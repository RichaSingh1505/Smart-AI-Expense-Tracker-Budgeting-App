import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
} from "react-native";
import { EXPENSES_API, INSIGHTS_API } from "@/constants/api";

interface Expense {
  title: string;
  amount: number;
  category?: string;
}

export default function Dashboard() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [futureTip, setFutureTip] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? dark : light;

  useEffect(() => {
    fetch(EXPENSES_API)
      .then(res => res.json())
      .then((data: Expense[]) => setExpenses(data))
      .catch(() => {});

    fetch(INSIGHTS_API)
      .then(res => res.json())
      .then(data => {
        setTips(data.recommendations || []);
        setFutureTip(data.futureSuggestion);
      })
      .catch(() => {});
  }, []);

  return (
    <ScrollView
      style={[styles.screen, { backgroundColor: theme.bg }]}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Toggle */}
      <View style={styles.toggle}>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          trackColor={{ false: "#c7d2fe", true: "#334155" }}
          thumbColor={darkMode ? "#818cf8" : "#4f46e5"}
        />
      </View>

      {/* Header */}
      <Text style={[styles.heading, { color: theme.text }]}>
        Dashboard
      </Text>
      <Text style={[styles.subHeading, { color: theme.subText }]}>
        Smart overview of your spending
      </Text>

      {/* Expenses Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          Recent Expenses
        </Text>

        {expenses.length === 0 ? (
          <Text style={[styles.empty, { color: theme.subText }]}>
            No expenses added yet
          </Text>
        ) : (
          expenses.slice(0, 5).map((e, i) => (
            <View key={i} style={styles.row}>
              <View>
                <Text style={[styles.expenseTitle, { color: theme.text }]}>
                  {e.title}
                </Text>
                {e.category && (
                  <Text style={[styles.category, { color: theme.subText }]}>
                    {e.category}
                  </Text>
                )}
              </View>
              <Text style={[styles.amount, { color: theme.primary }]}>
                ₹{e.amount}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* AI Insights */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.cardTitle, { color: theme.text }]}>
          AI Insights
        </Text>

        {tips.length === 0 ? (
          <Text style={[styles.empty, { color: theme.subText }]}>
            No insights available
          </Text>
        ) : (
          tips.map((tip, i) => (
            <Text key={i} style={[styles.tip, { color: theme.text }]}>
              • {tip}
            </Text>
          ))
        )}

        {futureTip && (
          <View
            style={[
              styles.futureBox,
              { backgroundColor: theme.futureBg },
            ]}
          >
            <Text style={[styles.futureText, { color: theme.futureText }]}>
              🎯 {futureTip}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

/* 🌞 Light */
const light = {
  bg: "#f8fafc",
  card: "#ffffff",
  text: "#0f172a",
  subText: "#64748b",
  primary: "#4f46e5",
  futureBg: "#eef2ff",
  futureText: "#3730a3",
};

/* 🌙 Dark */
const dark = {
  bg: "#020617",
  card: "#0f172a",
  text: "#f8fafc",
  subText: "#94a3b8",
  primary: "#818cf8",
  futureBg: "#1e293b",
  futureText: "#bfdbfe",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 18,
  },
  toggle: {
    position: "absolute",
    top: 50,
    right: 18,
    zIndex: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 60,
  },
  subHeading: {
    textAlign: "center",
    fontSize: 14,
    marginTop: 6,
    marginBottom: 24,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  empty: {
    fontSize: 14,
    fontStyle: "italic",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.4,
    borderColor: "#e5e7eb",
  },
  expenseTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  category: {
    fontSize: 12,
    marginTop: 2,
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
  },
  tip: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 22,
  },
  futureBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 14,
  },
  futureText: {
    fontSize: 14,
    fontStyle: "italic",
  },
});
