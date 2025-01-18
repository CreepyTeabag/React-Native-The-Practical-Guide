import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  const { width, height } = useWindowDimensions();

  let imageSize = 280;
  let containerMargin = 36;

  if (width < 360) {
    imageSize = 150;
    containerMargin = 15;
  }

  if (height < 361) {
    imageSize = 120;
    containerMargin = 15;
  }

  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
    margin: containerMargin,
  };

  const summaryFontSize = width < 360 || height < 361 ? 16 : 24;
  const summaryMarginTop = width < 360 || height < 361 ? 16 : 24;

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>GAME OVER</Title>

        <View style={[styles.imageContainer, imageStyle]}>
          <Image
            source={require("../assets/images/success.png")}
            style={styles.image}
          />
        </View>

        <Text
          style={[
            styles.summaryText,
            { marginTop: summaryMarginTop, fontSize: summaryFontSize },
          ]}
        >
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text>{" "}
          rounds to guess the number{" "}
          <Text style={styles.highlight}>{userNumber}</Text>
        </Text>

        <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
      </View>
    </ScrollView>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    textAlign: "center",
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: Colors.primary500,
  },
});
