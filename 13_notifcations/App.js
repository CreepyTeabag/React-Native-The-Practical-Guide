import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";
import { projectId } from "./projectId";

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
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert.alert(
          "Permission required",
          "Failed to get push token for push notifications!"
        );

        return;
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      console.log("!!!pushTokenData!!!");
      console.log(pushTokenData);

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const receivedSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("!!!!notification");
        console.log(notification);
        console.log(notification.request.content.data);
      }
    );

    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("!!!!RESPONSE");
        console.log(response.notification.request.content.data);
      });

    return () => {
      receivedSubscription.remove();
      responseSubscription.remove();
    };
  }, []);

  function scheduleNotificationHandler() {
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

  function sendPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "pushTokenData.data",
        title: "Test - sent from a device",
        body: "This is a test notification",
      }),
    });
  }

  return (
    <View style={styles.container}>
      <Button
        title="Schedule notification"
        onPress={scheduleNotificationHandler}
      />
      <Button
        title="Send push notification"
        onPress={sendPushNotificationHandler}
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
    rowGap: 40,
  },
});
