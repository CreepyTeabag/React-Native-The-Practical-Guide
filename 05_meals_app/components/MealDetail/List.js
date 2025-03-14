import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function List({ items }) {
  return items.map((item) => (
    <View key={item} style={styles.listItem}>
      <View style={styles.bullet}></View>
      <Text style={styles.itemText}>{item}</Text>
    </View>
  ));
}

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  itemText: {
    color: "#333333",
    fontFamily: "lexend",
    fontSize: 18,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: "#333333",
    marginRight: 8,
  },
});
