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

export default function Addresses() {
  const { addresses, addAddress } = useUser();

  const [form, setForm] = useState({
    name: "",
    street: "",
    city: "",
  });

  const handleAdd = () => {
    if (!form.name || !form.street || !form.city) return;

    addAddress(form);
    setForm({ name: "", street: "", city: "" });
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      
      {/* 📝 FORM */}
      <TextInput
        placeholder="Full Name"
        value={form.name}
        onChangeText={(t) => setForm({ ...form, name: t })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Street Address"
        value={form.street}
        onChangeText={(t) => setForm({ ...form, street: t })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="City"
        value={form.city}
        onChangeText={(t) => setForm({ ...form, city: t })}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
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
          Add Address
        </Text>
      </Pressable>

      {/* 📦 LIST */}
      <FlatList
        data={addresses}
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
            <Text>{item.street}</Text>
            <Text>{item.city}</Text>
          </View>
        )}
      />
    </View>
  );
}