import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function LoadingOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={[styles.text, styles.message]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: GlobalStyles.colors.white,
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  message: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
