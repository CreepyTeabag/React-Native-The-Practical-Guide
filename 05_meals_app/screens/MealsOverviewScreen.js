import { MEALS, CATEGORIES } from "../data/dummy-data";
import { FlatList, StyleSheet, Text, View } from "react-native";

import MealItem from "../components/MealItem";
import { useEffect, useLayoutEffect } from "react";

export default function MealsOverviewScreen({ route, navigation }) {
  const categoryId = route.params.categoryId;
  const color = CATEGORIES.find((cat) => cat.id === categoryId).color;

  const displayedMeals = MEALS.filter((mealItem) =>
    mealItem.categoryIds.includes(categoryId)
  );

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find((cat) => cat.id === categoryId).title;

    navigation.setOptions({
      title: categoryTitle,
    });
  }, [categoryId, navigation]);

  function renderMealItem(itemData) {
    const item = itemData.item;

    return (
      <MealItem
        title={item.title}
        affordability={item.affordability}
        complexity={item.complexity}
        duration={item.duration}
        isGlutenFree={item.isGlutenFree}
        isVegan={item.isVegan}
        isVegetarian={item.isVegetarian}
        imageUrl={item.imageUrl}
        color={color}
        mealId={item.id}
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
