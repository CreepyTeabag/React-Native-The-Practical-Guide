import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

export default function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,

    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
  },
  buttonText: {
    marginHorizontal: 8,
    marginVertical: 2,
    color: GlobalStyles.colors.white,
    textAlign: "center",
    fontWeight: "bold",
  },
  flatText: {
    color: GlobalStyles.colors.primary200,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
  },
});
