import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

const createStyles = (width) => {
  const itemSize = Math.min(160, width / 2 - 32);

  return { width: itemSize, height: itemSize, maxHeight: itemSize };
};

const CategoryGridTile = ({ title, color, onPress }) => {
  const { width } = useWindowDimensions();
  const extraStyles = createStyles(width);

  return (
    <View style={[styles.gridItem, extraStyles, { backgroundColor: color }]}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        android_ripple={{ color: "#808080" }}
        onPress={onPress}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    //  backgroundColor: "#f5f5f5",
    borderRadius: 8,
    elevation: 6,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: "black",
    //  fontFamily: "lexend",
    fontFamily: "delius",
    textAlign: "center",
  },
});
