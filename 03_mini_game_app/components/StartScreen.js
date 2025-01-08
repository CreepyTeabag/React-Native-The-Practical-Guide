import { StyleSheet, Text, TextInput, View, Button } from "react-native";

export default function StartScreen({
  userNumber,
  onAddNumber,
  onReset,
  onStartGame,
}) {
  return (
    <>
      <Text style={styles.header}>Guess My Number</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.smallHeader}>Enter a Number</Text>
        <TextInput
          value={userNumber}
          style={styles.input}
          onChangeText={onAddNumber}
        />

        <View style={styles.buttonContainer}>
          <Button title="Reset" onPress={onReset} />
          <Button title="Confirm" onPress={onStartGame} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: "center",
  },
  smallHeader: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    width: 50,
    padding: 8,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginHorizontal: 40,
  },
});
