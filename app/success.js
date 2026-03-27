import { Text, View } from "react-native";

export default function Success() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 22 }}>Order Successful 🎉</Text>
    </View>
  );
}
