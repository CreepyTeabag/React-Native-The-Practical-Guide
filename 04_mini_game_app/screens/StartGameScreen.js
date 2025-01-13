import { useState } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
  const [enteredNumber, setEnteredNumber] = useState("");

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        "Invalid number!",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );

      return;
    }
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.numberInput}
        maxLength={2}
        keyboardType="number-pad"
        autoCapitalize="none"
        autoCorrect={false}
        cursorColor={"#ddb52f"}
        onChangeText={numberInputHandler}
        value={enteredNumber}
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: "center",
    marginHorizontal: 24,
    marginTop: 100,
    padding: 16,
    backgroundColor: "#3b021f",
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
  numberInput: {
    width: 50,
    height: 50,
    marginVertical: 8,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    fontSize: 32,
    fontWeight: "bold",
    color: "#ddb52f",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});
