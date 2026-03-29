import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { Alert, Button, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const [address, setAddress] = useState("");

  const { clearCart, cartItems, getTotal } = useCart();
  const { guest } = useContext(AuthContext);

  const router = useRouter();

  const handleCheckout = () => {
    if (guest) {
      Alert.alert("Login Required");
      router.push("/(auth)/login");
      return;
    }

    if (!address) {
      Alert.alert("Enter address");
      return;
    }

    clearCart();
    router.replace("/success");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <StatusBar style="dark" />

      <TextInput
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 20,
        }}
      />

      <Button
        title={`Confirm Order ($${getTotal().toFixed(2)})`}
        onPress={handleCheckout}
      />
    </SafeAreaView>
  );
}
