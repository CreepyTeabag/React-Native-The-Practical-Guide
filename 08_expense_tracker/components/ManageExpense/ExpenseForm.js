import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

import Input from "./Input";
import Button from "../ui/Button";

export default function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((prev) => {
      return {
        ...prev,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const dateParts = inputs.date.value.split(".");
    const year = +dateParts[2];
    const month = dateParts[1] - 1;
    const day = +dateParts[0];
    const formattedDate = new Date(Date.UTC(year, month, day));

    const expenseData = {
      amount: +inputs.amount.value,
      date: formattedDate,
      description: inputs.description.value,
    };
    console.log(expenseData);
    const yearIsValid =
      year.toString().length === 4 && year > 1900 && year <= 2100;
    const monthIsValid = month >= 0 && month <= 11;
    const dayIsValid = day >= 1 && day <= 31;

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid =
      expenseData.date.toString() !== "Invalid Date" &&
      yearIsValid &&
      monthIsValid &&
      dayIsValid;
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "Please check your input values.");
      setInputs((prev) => {
        return {
          ...prev,
          amount: {
            value: prev.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: prev.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: prev.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "DD.MM.YYYY",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid input values. Please check your entered data!
        </Text>
      )}

      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor: GlobalStyles.colors.primary800,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 40,
    marginBottom: 16,
  },
  title: {
    marginVertical: 16,
    fontSize: 24,
    fontWeight: "bold",
    color: GlobalStyles.colors.white,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
