import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { EXPENSES_API } from "@/constants/api";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();
  const theme = darkMode ? dark : light;

  const submitExpense = async () => {
    if (!title || !amount) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(EXPENSES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, amount: Number(amount) }),
      });

      if (!res.ok) throw new Error("Failed");

      Alert.alert("Success", "Expense added");
      router.replace("/");
    } catch {
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.bg }]}>
      {/* 🌗 Theme toggle */}
      <View style={styles.toggle}>
        
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>

      {/* 📦 Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.title, { color: theme.text }]}>
          Add Expense
        </Text>
        <Text style={[styles.subtitle, { color: theme.subText }]}>
          Track where your money goes
        </Text>

        {/* Input */}
        <TextInput
          placeholder="Expense name"
          placeholderTextColor={theme.placeholder}
          value={title}
          onChangeText={setTitle}
          style={[styles.input, theme.input]}
        />

        <TextInput
          placeholder="Amount (₹)"
          placeholderTextColor={theme.placeholder}
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
          style={[styles.input, theme.input]}
        />

        {/* Button */}
        <Pressable
          style={[
            styles.button,
            { backgroundColor: loading ? "#999" : theme.primary },
          ]}
          onPress={submitExpense}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Saving..." : "Add Expense"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

/* 🌞 Light Theme */
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

/* 🌙 Dark Theme */
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
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  toggle: {
    position: "absolute",
    top: 50,
    right: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    elevation: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 25,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    marginTop: 10,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
