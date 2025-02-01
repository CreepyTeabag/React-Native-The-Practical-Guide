import { StyleSheet, View } from "react-native";
import React from "react";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.9,
    date: new Date("2025-01-12"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2025-01-25"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2025-01-03"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2025-02-01"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 12.99,
    date: new Date("2025-01-31"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2025-01-25"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2025-01-03"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: new Date("2025-02-01"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 12.99,
    date: new Date("2025-01-31"),
  },
];

export default function ExpensesOutput({ expenses, expensesPeriod }) {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 12,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
