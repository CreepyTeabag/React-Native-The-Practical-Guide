import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import { CATEGORIES } from "./data/dummy-data";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    lexend: require("./assets/fonts/LexendDeca-VariableFont_wght.ttf"),
    delius: require("./assets/fonts/Delius-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#FFDAC1" },
            headerTintColor: "#4d4d4d",
            contentStyle: { backgroundColor: "#F9F6F2" },
          }}
        >
          <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{
              title: "All Categories",
            }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealsOverviewScreen}
            /* options={({ route, navigation }) => {
              const catId = route.params.categoryId;
              const category = CATEGORIES.find((cat) => cat.id === catId);

              return {
                title: category.title,
                headerStyle: { backgroundColor: category.color },
              };
            }} */
          />
          <Stack.Screen
            name="MealDetail"
            component={MealDetailScreen}
            options={{
              headerRight: () => {
                return <Button title="Tap me!" />;
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fafafa",
  },
});
