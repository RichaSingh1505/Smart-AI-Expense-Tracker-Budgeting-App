import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { Expense } from "../../types/Expense";
import { EXPENSES_API } from "@/constants/api";

export default function Home() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    try {
      const response = await fetch(EXPENSES_API);
      const data = await response.json();
      setExpenses(data.slice(0, 5)); // ✅ recent 5
    } catch (error) {
      console.log("Error fetching expenses", error);
    }
  };

  // 🔥 refresh when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
    }, [])
  );

  const colors = {
    bg: isDark ? "#0F172A" : "#F1F5F9",
    card: isDark ? "#1E293B" : "#FFFFFF",
    text: isDark ? "#FFFFFF" : "#0F172A",
    textLight: isDark ? "#CBD5E1" : "#475569",
    button: isDark ? "#222222" : "#22C55E",
    buttonText: "#FFFFFF",
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      {/* Dark Mode Toggle */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => setIsDark(!isDark)}
          style={[
            styles.themeToggle,
            { backgroundColor: isDark ? "#FFFFFF" : "#000000" },
          ]}
        >
          <Text
            style={{
              color: isDark ? "#000000" : "#FFFFFF",
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            {isDark ? "☀ Light" : "🌙 Dark"}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.title, { color: colors.text }]}>
        Smart AI Expense Tracker & Budgeting App
      </Text>

      <Text style={[styles.subtitle, { color: colors.textLight }]}>
        Control your money, intelligently
      </Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.cardTitle, { color: colors.text }]}>
          Start Tracking
        </Text>

        <Text style={{ color: colors.textLight, marginBottom: 20 }}>
          Log expenses and get AI-powered insights.
        </Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.button }]}
          onPress={() => router.push("/add-expense")}
        >
          <Text style={styles.buttonText}>➕ Add Expense</Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.listTitle, { color: colors.text }]}>
        Recent Expenses
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <Text style={{ color: colors.textLight, textAlign: "center" }}>
            No expenses added yet
          </Text>
        }
        renderItem={({ item }) => (
          <View style={[styles.expenseItem, { backgroundColor: colors.card }]}>
            <View>
              <Text style={{ color: colors.text, fontWeight: "600" }}>
                {item.title}
              </Text>
              <Text style={{ color: colors.textLight, fontSize: 12 }}>
                {item.category ?? "General"} •{" "}
                {item.createdAt
                  ? new Date(item.createdAt).toDateString()
                  : ""}
              </Text>
            </View>
            <Text style={{ color: "#EF4444", fontWeight: "bold" }}>
              ₹{item.amount}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 100 },
  topBar: { position: "absolute", top: 60, right: 20, zIndex: 10 },
  themeToggle: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 4,
  },
  title: { fontSize: 26, fontWeight: "bold", textAlign: "center" },
  subtitle: { textAlign: "center", marginBottom: 20 },
  card: { padding: 24, borderRadius: 20, marginBottom: 20 },
  cardTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  button: { padding: 14, borderRadius: 14, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  listTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  expenseItem: {
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
