import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import OutlinedButton from "../components/ui/OutlinedButton";
import { Colors } from "../constants/colors";
import { deletePlace, fetchPlaceDetails } from "../util/database";
import IconButton from "../components/ui/IconButton";

export default function PlaceDetails({ route, navigation }) {
  const [fetchedPlace, setFetchedPlace] = useState();

  function showOnMapHandler() {
    navigation.navigate("Map", {
      initialLat: fetchedPlace.location.lat,
      initialLng: fetchedPlace.location.lng,
    });
  }

  const selectedPlaceId = route.params.placeId;

  useEffect(() => {
    async function loadPlaceData() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setFetchedPlace(place);
      navigation.setOptions({
        title: place.title,
      });
    }

    loadPlaceData();
  }, [selectedPlaceId]);

  if (!fetchedPlace) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View>
        <Image style={styles.image} source={{ uri: fetchedPlace.imageUri }} />
        <View style={styles.locationContainer}>
          <View style={styles.addressContainer}>
            <Text style={styles.address}>{fetchedPlace.address}</Text>
          </View>
          <OutlinedButton icon="map" onPress={showOnMapHandler}>
            View on Map
          </OutlinedButton>
        </View>
      </View>

      <IconButton
        style={styles.button}
        icon="trash"
        size={24}
        color={Colors.red500}
        onPress={() => {
          deletePlace(fetchedPlace.id);
          navigation.navigate("AllPlaces");
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  button: {
    marginBottom: 32,
    borderColor: Colors.red500,
    borderWidth: 1,
    width: 50,
    height: 50,
    borderRadius: 3,
    marginLeft: "80%",
  },
  image: {
    height: "35%",
    minHeight: 300,
    width: "100%",
  },
  locationContainer: {
    justifyContent: "center",
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
});
