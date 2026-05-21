import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import { PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

type Props = {
  categories: {
    [key: string]: number;
  };
};

export default function ExpensePieChart({ categories }: Props) {
  const chartData = Object.keys(categories)
    .filter((key) => categories[key] > 0)
    .map((key, index) => ({
      name: key,
      amount: categories[key],
      color: COLORS[index % COLORS.length],
      legendFontColor: "#333",
      legendFontSize: 14,
    }));

  if (chartData.length === 0) {
    return <Text style={styles.empty}>No data for this month</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expense Distribution</Text>

      <PieChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: () => "#000",
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
    </View>
  );
}

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9C27B0"];

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
