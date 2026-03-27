import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
} from "react-native";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { COLORS } from "../constants/theme";

export default function Payments() {
  const { payments, addPayment } = useUser();

  const [card, setCard] = useState({
    name: "",
    number: "",
  });

  const handleAdd = () => {
    if (!card.name || !card.number) return;

    addPayment(card);
    setCard({ name: "", number: "" });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>

      {/* 💳 FORM */}
      <TextInput
        placeholder="Card Holder Name"
        value={card.name}
        onChangeText={(t) => setCard({ ...card, name: t })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Card Number"
        value={card.number}
        onChangeText={(t) => setCard({ ...card, number: t })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
        keyboardType="numeric"
      />

      <Pressable
        onPress={handleAdd}
        style={{
          backgroundColor: COLORS.primary,
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Add Payment Method
        </Text>
      </Pressable>

      {/* 💳 LIST */}
      <FlatList
        data={payments}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "#fff",
              padding: 10,
              marginTop: 10,
              borderRadius: 10,
            }}
          >
            <Text>{item.name}</Text>
            <Text>**** **** **** {item.number.slice(-4)}</Text>
          </View>
        )}
      />
    </View>
  );
}