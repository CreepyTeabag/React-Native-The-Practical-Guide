import { StyleSheet, View, Text } from "react-native";
import React /* useContext */ from "react";

import MealsList from "../components/MealsList/MealsList";

// import { FavoritesContext } from "../store/context/favorites-context";
import { useSelector } from "react-redux";
import { MEALS } from "../data/dummy-data";

export default function FavoritesScreen() {
  // const favoriteMealsCtx = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);

  // const favoriteMeals = MEALS.filter((meal) =>
  //   favoriteMealsCtx.ids.includes(meal.id)
  // );
  const favoriteMeals = MEALS.filter((meal) =>
    favoriteMealIds.includes(meal.id)
  );

  if (favoriteMeals.length === 0) {
    return (
      <View style={styles.root}>
        <Text style={styles.text}>
          You have no favorites yet - start adding some!
        </Text>
      </View>
    );
  }
  return <MealsList items={favoriteMeals} color={"#ffdac1"} />;
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 70,
  },
  text: {
    fontSize: 18,
    fontFamily: "lexend",
    color: "#333333",
    textAlign: "center",
  },
});
