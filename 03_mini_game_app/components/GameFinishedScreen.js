import { StyleSheet, Text, View, Button } from "react-native";

export default function GameFinishedScreen({ userNumber, guessList, onReset }) {
  return (
    <View>
      <Text style={styles.header}>Your number is {userNumber} 🥳</Text>
      <Text style={{ marginBottom: 20 }}>
        Your phone needed {guessList.length} rounds to guess the number{" "}
        {userNumber}
      </Text>

      <Button title="Start a new game" onPress={onReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
});
