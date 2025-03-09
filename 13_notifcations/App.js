import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

export default function App() {
  function scheduleNotificationHandler() {
    requestPermissionsAsync();

    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification",
        body: "This is the body of the notification",
        data: { userName: "Sophie" },
      },
      trigger: {
        seconds: 2,
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log("error", error));
  }

  async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync();
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule notification"
        onPress={scheduleNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
