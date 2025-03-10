import { Text, StyleSheet, Platform } from "react-native";

import Colors from "../../constants/colors";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    maxWidth: "80%",
    width: 300,
    padding: 12,
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: Colors.white,
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    // borderWidth: Platform.select({ ios: 0, android: 2 }),
    // borderColor: Colors.white,
  },
});
