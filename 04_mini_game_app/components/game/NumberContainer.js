import { Text, View, StyleSheet, useWindowDimensions } from "react-native";
import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  const { width, height } = useWindowDimensions();

  const fontSize = width < 380 || height < 361 ? 18 : 20;
  const padding = width < 380 || height < 361 ? 12 : 24;
  const margin = width < 380 || height < 361 ? 12 : 24;

  return (
    <View style={[styles.container, { padding, margin }]}>
      <Text style={[styles.numberText, { fontSize }]}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: Colors.accent500,
    borderRadius: 8,
  },
  numberText: {
    color: Colors.accent500,
    fontFamily: "open-sans-bold",
  },
});
