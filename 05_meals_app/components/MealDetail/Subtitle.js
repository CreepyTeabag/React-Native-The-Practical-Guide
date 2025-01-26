import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Subtitle({ children }) {
  return <Text style={styles.subtitle}>{children}</Text>;
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 22,
    margin: 6,
    textAlign: "center",
    color: "#e2b497",
    fontFamily: "delius",
    textDecorationLine: "underline",
  },
});
