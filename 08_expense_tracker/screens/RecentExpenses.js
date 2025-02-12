import { StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

export default function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();

  const { expenses, setExpenses } = useContext(ExpensesContext);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }

    getExpenses();
  }, []);

  if (error && !isFetching) return <ErrorOverlay message={error} />;

  if (isFetching) return <LoadingOverlay />;

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText={"No recent expenses found."}
    />
  );
}

const styles = StyleSheet.create({});
