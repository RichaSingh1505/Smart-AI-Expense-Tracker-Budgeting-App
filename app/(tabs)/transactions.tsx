import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { EXPENSES_API } from "@/constants/api";

type Expense = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  createdAt: string;
};

export default function Transactions() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? dark : light;

  useEffect(() => {
    fetch(EXPENSES_API)
      .then(res => res.json())
      .then((data: Expense[]) => setExpenses(data))
      .catch(err => console.log(err));
  }, []);

  const renderItem = ({ item }: { item: Expense }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      {/* Top Row */}
      <View style={styles.row}>
        <Text style={[styles.title, { color: theme.text }]}>
          {item.title}
        </Text>
        <Text style={[styles.amount, { color: theme.amount }]}>
          ₹ {item.amount}
        </Text>
      </View>

      {/* Bottom Row */}
      <View style={styles.row}>
        <Text
          style={[
            styles.category,
            {
              color: theme.categoryText,
              backgroundColor: theme.categoryBg,
            },
          ]}
        >
          {item.category}
        </Text>
        <Text style={[styles.date, { color: theme.subText }]}>
          {new Date(item.createdAt).toDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.bg }]}>
      
      {/* 🌗 Theme Toggle */}
      <View style={styles.toggle}>
        
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      <Text style={[styles.heading, { color: theme.text }]}>
        Transaction History
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

/* 🌞 Light Theme */
const light = {
  bg: "#F2F4F8",
  card: "#FFFFFF",
  text: "#1C1C1E",
  subText: "#8E8E93",
  amount: "#E53935",
  categoryBg: "#E8F0FF",
  categoryText: "#3A7AFE",
};

/* 🌙 Dark Theme */
const dark = {
  bg: "#0F172A",
  card: "#1E293B",
  text: "#F8FAFC",
  subText: "#94A3B8",
  amount: "#F87171",
  categoryBg: "#1E3A8A",
  categoryText: "#BFDBFE",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  toggle: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 10,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginTop: 80,
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  amount: {
    fontSize: 17,
    fontWeight: "700",
  },
  category: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "500",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    overflow: "hidden",
  },
  date: {
    marginTop: 10,
    fontSize: 12,
  },
});
