import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import GameFinishedScreen from "./components/GameFinishedScreen";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";
import ErrorModal from "./components/ErrorModal";

export default function App() {
  const [userNumber, setUserNumber] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGameOn, setIsGameOn] = useState(false);
  const [currentGuess, setCurrentGuess] = useState(() =>
    Math.floor(Math.random() * 99 + 1)
  );
  const [guessList, setGuessList] = useState([]);
  const [errorInfo, setErrorInfo] = useState({
    heading: "",
    text: "",
  });
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [searchRegion, setSearchRegion] = useState({
    min: 0,
    max: 100,
  });

  function onAddNumber(enteredNumber) {
    setUserNumber(+enteredNumber);
  }

  function onReset() {
    setUserNumber("");
  }

  function onStartGame() {
    if (isNaN(userNumber) || userNumber <= 0 || userNumber > 99) {
      setErrorInfo({
        heading: "Invalid number!",
        text: "Number has to be a number between 1 and 99",
      });
      setIsModalVisible(true);
      return;
    }

    setIsGameOn(true);
  }

  function closeErrorModal() {
    setIsModalVisible(false);
    setErrorInfo({
      heading: "",
      text: "",
    });
  }

  function onPressHigher() {
    checkPressedNumber(true);
  }

  function onPressLower() {
    checkPressedNumber(false);
  }

  function checkPressedNumber(isPressedHigher) {
    if (
      (isPressedHigher && currentGuess > userNumber) ||
      (!isPressedHigher && currentGuess < userNumber)
    ) {
      showLieModal();
      return;
    } else {
      setGuessList((prev) => [...prev, currentGuess]);

      const newSearchRegion = {
        ...searchRegion,
        ...(isPressedHigher ? { min: currentGuess } : { max: currentGuess }),
      };
      setSearchRegion(newSearchRegion);

      const newGuess = Math.floor(
        (newSearchRegion.min + newSearchRegion.max) / 2
      );

      if (newGuess === userNumber) {
        finishGame();
        return;
      } else {
        setCurrentGuess(newGuess);
      }
    }
  }

  function showLieModal() {
    setErrorInfo({
      heading: "Liar liar pants on fire!",
      text: "Do not lie, buddy",
    });
    setIsModalVisible(true);
  }

  function finishGame() {
    setIsGameFinished(true);
  }

  function onReset() {
    setUserNumber("");
    setIsModalVisible(false);
    setIsGameOn(false);
    setCurrentGuess(Math.floor(Math.random() * 99 + 1));
    setGuessList([]);
    setErrorInfo({
      heading: "",
      text: "",
    });
    setIsGameFinished(false);
    setSearchRegion({
      min: 0,
      max: 100,
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {!isGameOn && !isGameFinished && (
        <StartScreen
          userNumber={userNumber}
          onAddNumber={onAddNumber}
          onReset={onReset}
          onStartGame={onStartGame}
        />
      )}
      <ErrorModal
        isVisible={isModalVisible}
        onClose={closeErrorModal}
        errorInfo={errorInfo}
      />
      {isGameOn && !isGameFinished && (
        <GameScreen
          currentGuess={currentGuess}
          onPressLower={onPressLower}
          onPressHigher={onPressHigher}
          guessList={guessList}
        />
      )}

      {isGameFinished && (
        <GameFinishedScreen
          userNumber={userNumber}
          guessList={guessList}
          onReset={onReset}
        />
      )}

      <ErrorModal
        isVisible={isModalVisible}
        onClose={closeErrorModal}
        errorInfo={errorInfo}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
