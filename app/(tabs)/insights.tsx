import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Switch,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import { INSIGHTS_API } from "@/constants/api";

const screenWidth = Dimensions.get("window").width;

export default function Insights() {
  const [data, setData] = useState<any>(null);
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? dark : light;

  const month = new Date().getMonth() + 1;

  useEffect(() => {
    fetch(`${INSIGHTS_API}?month=${month}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || !data.categories) {
    return (
      <View style={[styles.center, { backgroundColor: theme.bg }]}>
        <Text style={{ color: theme.subText }}>
          Analyzing your finances…
        </Text>
      </View>
    );
  }

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#14B8A6"];

  const pieData = Object.keys(data.categories).map((key, i) => ({
    name: key,
    population: Number(data.categories[key]),
    color: COLORS[i % COLORS.length],
    legendFontColor: theme.text,
    legendFontSize: 12,
  }));

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.bg }]}
      showsVerticalScrollIndicator={false}
    >
      {/* 🌗 Toggle */}
      <View style={styles.toggle}>
        <Switch
          value={darkMode}
          onValueChange={setDarkMode}
          thumbColor={darkMode ? "#818cf8" : "#4f46e5"}
        />
      </View>

      {/* Header */}
      <Text style={[styles.heading, { color: theme.text }]}>
        Financial Insights
      </Text>
      <Text style={[styles.subTitle, { color: theme.subText }]}>
        Month {month} • Smart analytics
      </Text>

      {/* Total Spend Card */}
      <View style={[styles.totalCard, { backgroundColor: theme.totalCard }]}>
        <Text style={[styles.totalLabel, { color: theme.subText }]}>
          Total Spending
        </Text>
        <Text style={styles.totalAmount}>₹{data.total}</Text>
        <Text style={styles.miniNote}>This month overview</Text>
      </View>

      {/* Chart */}
      <View style={[styles.glassCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Category Breakdown
        </Text>

        <PieChart
          data={pieData}
          width={screenWidth - 32}
          height={230}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="10"
          absolute
          chartConfig={{
            backgroundGradientFrom: theme.card,
            backgroundGradientTo: theme.card,
            color: () => theme.text,
          }}
        />
      </View>

      {/* AI Suggestions */}
      <View style={[styles.glassCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          AI Smart Tips
        </Text>

        {data.recommendations?.length ? (
          data.recommendations.map((tip: string, i: number) => (
            <View key={i} style={styles.tipRow}>
              <Text style={styles.bullet}>✨</Text>
              <Text style={[styles.tipText, { color: theme.text }]}>
                {tip}
              </Text>
            </View>
          ))
        ) : (
          <Text style={{ color: theme.subText }}>
            You’re doing great this month 👍
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

/* 🌞 Light */
const light = {
  bg: "#F6F8FC",
  card: "#FFFFFF",
  text: "#0F172A",
  subText: "#64748B",
  totalCard: "#EEF2FF",
};

/* 🌙 Dark */
const dark = {
  bg: "#020617",
  card: "#0F172A",
  text: "#F8FAFC",
  subText: "#94A3B8",
  totalCard: "#1E293B",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  toggle: {
    position: "absolute",
    top: 48,
    right: 18,
    zIndex: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 60,
  },
  subTitle: {
    marginBottom: 22,
    fontSize: 14,
  },
  totalCard: {
    padding: 22,
    borderRadius: 20,
    marginBottom: 24,
  },
  totalLabel: {
    fontSize: 13,
  },
  totalAmount: {
    fontSize: 34,
    fontWeight: "900",
    marginVertical: 6,
    color: "#4f46e5",
  },
  miniNote: {
    fontSize: 12,
    color: "#94A3B8",
  },
  glassCard: {
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
  },
  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  bullet: {
    marginRight: 8,
    fontSize: 14,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
});
