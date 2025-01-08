import { Modal, Text, View, Button } from "react-native";

export default function ErrorModal({ isVisible, onClose, errorInfo }) {
  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={{ padding: 50 }}>
        <Text style={{ fontSize: 20, marginBottom: 20 }}>
          {errorInfo.heading}
        </Text>

        <Text style={{ marginBottom: 20 }}>{errorInfo.text}</Text>

        <Button title="okay" onPress={onClose} />
      </View>
    </Modal>
  );
}
