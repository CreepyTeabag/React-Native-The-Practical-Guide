import { ImageBackground, StyleSheet, Text, View } from "react-native";

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
      <View style={styles.container}>
        <View style={styles.nameWrapper}>
          <View style={[styles.titleWrapper]}>
            <Text style={[styles.title, { textShadowColor: color }]}>
              {title}
            </Text>
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
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "96%",
    height: 240,
    elevation: 6,
    marginHorizontal: 6,
    marginVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    overflow: "hidden",
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
    borderRadius: 8,
    minWidth: "100%",
    width: "120%",
  },
  nameWrapper: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  titleWrapper: {
    borderRadius: 8,
    backgroundColor: "#f5f5f590",
    padding: 3,
  },
  title: {
    fontSize: 24,
    fontFamily: "delius",
    paddingHorizontal: 8,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
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
