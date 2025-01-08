import { StyleSheet, View, FlatList, Button, Text } from "react-native";

export default function GameScreen({
  currentGuess,
  onPressLower,
  onPressHigher,
  guessList,
}) {
  return (
    <View>
      <Text style={styles.header}>Opponent's guess</Text>

      <Text style={styles.header}>{currentGuess}</Text>

      <View>
        <Text style={styles.smallHeader}>Is your number higher or lower?</Text>

        <View style={styles.buttonContainer}>
          <Button title="-" onPress={onPressLower} />
          <Button title="+" onPress={onPressHigher} />
        </View>

        <View style={styles.guessList}>
          <FlatList
            data={guessList}
            renderItem={(itemData) => {
              return (
                <Text key={itemData.item}>
                  #{itemData.index + 1} Opponent's guess: {itemData.item}
                </Text>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginHorizontal: 40,
  },
  guessList: {
    height: 300,
    borderWidth: 1,
    borderColor: "#dddddd",
    margin: 40,
  },
});
