import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  Switch,
  SafeAreaView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Goal = {
  id: string;
  title: string;
  targetAmount: number;
  monthlyBudget: number;
};

export default function GoalsScreen() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [budget, setBudget] = useState("");
  const [goals, setGoals] = useState<Goal[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const theme = darkMode ? dark : light;

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem("goals");
      if (stored) setGoals(JSON.parse(stored));
    })();
  }, []);

  const saveGoal = async () => {
    if (!title || !amount || !budget) return;

    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      targetAmount: Number(amount),
      monthlyBudget: Number(budget),
    };

    const updated = [newGoal, ...goals];
    setGoals(updated);
    await AsyncStorage.setItem("goals", JSON.stringify(updated));

    setTitle("");
    setAmount("");
    setBudget("");
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: theme.bg,marginTop: 30}]}>
      {/* 🔘 TOGGLE — NOW 100% VISIBLE */}
      <View style={styles.topBar}>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* HEADER */}
      <Text style={[styles.heading, { color: theme.text }]}>
        Goals Planner
      </Text>
      <Text style={[styles.subHeading, { color: theme.subText }]}>
        Smart saving starts here
      </Text>

      {/* INPUT CARD */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <TextInput
          placeholder="Goal name"
          placeholderTextColor={theme.placeholder}
          value={title}
          onChangeText={setTitle}
          style={[styles.input, theme.input]}
        />

        <TextInput
          placeholder="Target Amount ₹"
          keyboardType="numeric"
          placeholderTextColor={theme.placeholder}
          value={amount}
          onChangeText={setAmount}
          style={[styles.input, theme.input]}
        />

        <TextInput
          placeholder="Monthly Budget ₹"
          keyboardType="numeric"
          placeholderTextColor={theme.placeholder}
          value={budget}
          onChangeText={setBudget}
          style={[styles.input, theme.input]}
        />

        <Pressable
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={saveGoal}
        >
          <Text style={styles.buttonText}>Save Goal</Text>
        </Pressable>
      </View>

      {/* GOALS LIST */}
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => (
          <View style={[styles.goalCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.goalTitle, { color: theme.text }]}>
              {item.title}
            </Text>

            <View style={styles.row}>
              <Text style={{ color: theme.subText }}>Target</Text>
              <Text style={{ color: theme.text }}>
                ₹{item.targetAmount}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={{ color: theme.subText }}>Monthly</Text>
              <Text style={{ color: theme.text }}>
                ₹{item.monthlyBudget}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

/* 🌞 Light */
const light = {
  bg: "#F8FAFC",
  card: "#FFFFFF",
  text: "#0F172A",
  subText: "#64748B",
  placeholder: "#94A3B8",
  primary: "#4f46e5",
  input: {
    borderColor: "#E5E7EB",
    color: "#000",
  },
};

/* 🌙 Dark */
const dark = {
  bg: "#020617",
  card: "#0F172A",
  text: "#F8FAFC",
  subText: "#94A3B8",
  placeholder: "#64748B",
  primary: "#818cf8",
  input: {
    borderColor: "#334155",
    color: "#fff",
  },
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
  },
  topBar: {
    alignItems: "flex-end",
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
  },
  subHeading: {
    marginBottom: 24,
    fontSize: 14,
  },
  card: {
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    fontSize: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  goalCard: {
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
});
