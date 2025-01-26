import { useLayoutEffect } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { MEALS } from "../data/dummy-data";
import Tags from "../components/Tags";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";

export default function MealDetailScreen({ route, navigation }) {
  const { mealId, color } = route.params;

  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
    });
  }, [mealId, navigation]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        <Text style={styles.title}>{selectedMeal.title}</Text>

        <View style={styles.tagsWrapper}>
          <Tags
            affordability={selectedMeal.affordability}
            complexity={selectedMeal.complexity}
            duration={selectedMeal.duration}
            isGlutenFree={selectedMeal.isGlutenFree}
            isVegan={selectedMeal.isVegan}
            isVegetarian={selectedMeal.isVegetarian}
            color={color}
            extraStyles={{
              width: "100%",
              minWidth: "100%",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              columnGap: 8,
            }}
          />
        </View>

        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List items={selectedMeal.ingredients} />

          <Subtitle>Steps</Subtitle>
          <List items={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginBottom: 32,
  },
  tagsWrapper: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 6,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontSize: 26,
    margin: 8,
    textAlign: "center",
    color: "white",
    fontFamily: "delius",
    textDecorationLine: "underline",
  },
  listContainer: {
    maxWidth: "80%",
  },
});
