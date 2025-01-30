import { useNavigation } from "@react-navigation/native";
import {
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Tags from "./Tags";

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
  mealId,
}) {
  const navigation = useNavigation();

  function onOpenMealDetails() {
    navigation.navigate("MealDetail", { mealId, color });
  }

  return (
    <ImageBackground
      style={[styles.imageContainer, { borderColor: color }]}
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
        onPress={onOpenMealDetails}
      >
        <View style={styles.nameWrapper}>
          <View style={[styles.titleWrapper, { borderColor: color }]}>
            <Text style={styles.title}>{title}</Text>
          </View>
        </View>

        <Tags
          affordability={affordability}
          complexity={complexity}
          duration={duration}
          isGlutenFree={isGlutenFree}
          isVegan={isVegan}
          isVegetarian={isVegetarian}
          color={color}
        />
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "96%",
    height: 240,
    marginHorizontal: 6,
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    borderWidth: 2,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
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
    minWidth: "100%",
    width: "120%",
    borderRadius: 10,
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
    backgroundColor: "#f5f5f5dd",
    padding: 3,
    borderWidth: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "lexend",
    paddingHorizontal: 8,
    fontSize: 20,
    color: "#333333",
  },
});
