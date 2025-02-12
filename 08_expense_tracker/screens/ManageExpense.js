import { StyleSheet, View } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";

import IconButton from "../components/ui/IconButton";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

import { storeExpense, updateExpense, deleteExpense } from "../util/http";

import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

export default function ManageExpense({ route, navigation }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const {
    expenses,
    addExpense,
    updateExpense: updateExpenseCtx,
    deleteExpense: deleteExpenseCtx,
  } = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await deleteExpense(editedExpenseId);
      deleteExpenseCtx(editedExpenseId);

      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later.");
    }

    setIsSubmitting(false);
  }

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpenseCtx(editedExpenseId, expenseData);
        await updateExpense(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id });
      }

      navigation.goBack();
    } catch (error) {
      setError("Could not save expense - please try again later.");
    }

    setIsSubmitting(false);
  }

  if (error && !isSubmitting) return <ErrorOverlay message={error} />;

  if (isSubmitting) return <LoadingOverlay />;

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: `${GlobalStyles.colors.primary800}dd`,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  },
});
