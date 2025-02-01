import { StyleSheet, FlatList, View } from "react-native";
import MealItem from "./MealItem";

export default function MealsList({ items, color }) {
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
        data={items}
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
