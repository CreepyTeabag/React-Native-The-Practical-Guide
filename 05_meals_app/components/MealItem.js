import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MealItem({
  title,
  affordability,
  complexity,
  duration,
  isGlutenFree,
  isVegan,
  isVegetarian,
  imageUrl,
  color,
}) {
  const affordabilityText =
    affordability === "affordable"
      ? "💵"
      : affordability === "pricey"
      ? "💵 💵"
      : "💵 💵 💵";

  const complexityText =
    complexity === "simple" ? "🧑‍🍳" : complexity === "hard" ? "🧑‍🍳 🧑‍🍳" : "🧑‍🍳🧑‍🍳🧑‍🍳";

  const durationText =
    duration <= 30 ? "⏳" : duration <= 60 ? "⏳ ⏳" : "⏳ ⏳ ⏳";

  return (
    <ImageBackground
      style={styles.imageContainer}
      source={{ uri: imageUrl }}
      resizeMode="cover"
      imageStyle={styles.backgroundImage}
    >
      <Pressable
        style={({ pressed }) => [
          styles.container,
          pressed ? styles.itemPressed : null,
        ]}
        android_ripple={{ color }}
      >
        <View style={styles.nameWrapper}>
          <View style={[styles.titleWrapper, { borderColor: color }]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <View style={styles.tagsWrapper}>
          <View style={[styles.tag, { backgroundColor: color }]}>
            <Text style={styles.tagText}>Price: {affordabilityText}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: color }]}>
            <Text style={styles.tagText}>Complexity: {complexityText}</Text>
          </View>
          <View style={[styles.tag, { backgroundColor: color }]}>
            <Text style={styles.tagText}>Time: {durationText}</Text>
          </View>
          {isGlutenFree && (
            <View style={[styles.tag, { backgroundColor: color }]}>
              <Text style={styles.tagText}>✅ gluten free</Text>
            </View>
          )}
          {isVegan && (
            <View style={[styles.tag, { backgroundColor: color }]}>
              <Text style={styles.tagText}>✅ vegan</Text>
            </View>
          )}
          {isVegetarian && (
            <View style={[styles.tag, { backgroundColor: color }]}>
              <Text style={styles.tagText}>✅ vegetarian</Text>
            </View>
          )}
        </View>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "96%",
    height: 240,
    marginHorizontal: 6,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    elevation: 6,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 240,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  backgroundImage: {
    borderRadius: 16,
    minWidth: "100%",
    width: "120%",
  },
  itemPressed: {
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 0 },
  },
  nameWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  titleWrapper: {
    borderRadius: 16,
    backgroundColor: "#f5f5f5aa",
    padding: 3,

    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "delius",
    paddingHorizontal: 8,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    // textShadowColor: "#00000080",
  },
  tagsWrapper: {
    flex: 1,
    minWidth: 20,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tag: {
    backgroundColor: "green",
    borderRadius: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 5,
    elevation: 3,
  },
  tagText: {
    fontSize: 16,
    fontFamily: "delius",
  },
});
