import { Text, View } from "react-native";

export default function EmptyState({ text }) {
  return (
    <View style={{ marginTop: 50, alignItems: "center" }}>
      <Text>{text}</Text>
    </View>
  );
}
