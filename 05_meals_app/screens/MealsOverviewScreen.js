import MealItem from "../components/MealsList/MealItem";
import MealsList from "../components/MealsList/MealsList";
import { MEALS, CATEGORIES } from "../data/dummy-data";

import { useLayoutEffect } from "react";

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
      headerStyle: { backgroundColor: color },
    });
  }, [categoryId, navigation]);

  return <MealsList items={displayedMeals} color={color} />;
}
