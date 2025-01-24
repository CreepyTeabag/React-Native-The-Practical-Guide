import { MEALS, CATEGORIES } from "../data/dummy-data";
import { FlatList, StyleSheet, Text, View } from "react-native";

import MealItem from "../components/MealItem";

export default function MealsOverviewScreen({ route }) {
  const categoryId = route.params.categoryId;
  const color = CATEGORIES.find((cat) => cat.id === categoryId).color;

  const displayedMeals = MEALS.filter((mealItem) =>
    mealItem.categoryIds.includes(categoryId)
  );

  function renderMealItem(itemData) {
    return (
      <MealItem
        title={itemData.item.title}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        duration={itemData.item.duration}
        isGlutenFree={itemData.item.isGlutenFree}
        isVegan={itemData.item.isVegan}
        isVegetarian={itemData.item.isVegetarian}
        imageUrl={itemData.item.imageUrl}
        color={color}
      />
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
