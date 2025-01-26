import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Tags({
  affordability,
  complexity,
  duration,
  isGlutenFree,
  isVegan,
  isVegetarian,
  //   color,
  extraStyles,
}) {
  const affordabilityText =
    affordability === "affordable"
      ? "💵"
      : affordability === "pricey"
      ? "💵 💵"
      : "💵 💵 💵";

  const complexityText =
    complexity === "simple" ? "🧑‍🍳" : complexity === "hard" ? "🧑‍🍳 🧑‍🍳" : "🧑‍🍳🧑‍🍳🧑‍🍳";

  const durationText =
    duration <= 30 ? "⏳" : duration <= 60 ? "⏳ ⏳" : "⏳ ⏳ ⏳";

  const color = "#e2b497";

  return (
    <View style={[styles.tagsWrapper, extraStyles ?? null]}>
      <View style={[styles.tag, { backgroundColor: color }]}>
        <Text style={styles.tagText}>Price: {affordabilityText}</Text>
      </View>
      <View style={[styles.tag, { backgroundColor: color }]}>
        <Text style={styles.tagText}>Complexity: {complexityText}</Text>
      </View>
      <View style={[styles.tag, { backgroundColor: color }]}>
        <Text style={styles.tagText}>Time: {durationText}</Text>
      </View>
      {isGlutenFree && (
        <View style={[styles.tag, { backgroundColor: color }]}>
          <Text style={styles.tagText}>✅ gluten free</Text>
        </View>
      )}
      {isVegan && (
        <View style={[styles.tag, { backgroundColor: color }]}>
          <Text style={styles.tagText}>✅ vegan</Text>
        </View>
      )}
      {isVegetarian && (
        <View style={[styles.tag, { backgroundColor: color }]}>
          <Text style={styles.tagText}>✅ vegetarian</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tagsWrapper: {
    flex: 1,
    minWidth: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tag: {
    backgroundColor: "green",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#5a3222",
  },
  tagText: {
    fontSize: 16,
    fontFamily: "delius",
  },
});
