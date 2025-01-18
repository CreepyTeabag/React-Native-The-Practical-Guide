import {
  StyleSheet,
  View,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import Colors from "../../constants/colors";

function Card({ children }) {
  const { width, height } = useWindowDimensions();
  const cardWidth = height < 361 || width < 360 ? 320 : 360;
  const marginTop = height < 361 || width < 360 ? 18 : 36;

  return (
    <View style={[styles.card, { maxWidth: cardWidth, marginTop }]}>
      {children}
    </View>
  );
}

export default Card;

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});
