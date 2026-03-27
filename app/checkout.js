import { useRouter } from "expo-router";
import { useState, useContext } from "react";
import { Alert, Button, TextInput, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // ✅ FIX

export default function Checkout() {
  const [address, setAddress] = useState("");

  const { clearCart, cartItems, getTotal } = useCart(); // ✅ FIX
  const { guest } = useContext(AuthContext);

  const router = useRouter();

  const handleCheckout = () => {
    if (guest) {
      Alert.alert("Login Required", "Please login to continue checkout");
      router.push("/(auth)/login");
      return;
    }

    if (!address) {
      Alert.alert("Error", "Please enter delivery address");
      return;
    }

    if (!cartItems.length) {
      Alert.alert("Cart Empty", "Add items before checkout");
      return;
    }

    clearCart(); // ✅ FIX (instead of dispatch)

    router.replace("/success");
  };

  return (
    <View style={{ padding: 20 }}>
      
      <TextInput
        placeholder="Delivery Address"
        value={address}
        onChangeText={setAddress}
        style={{
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 10,
          marginBottom: 15,
        }}
      />

      <Button
        title={`Confirm Order ($${getTotal().toFixed(2)})`}
        onPress={handleCheckout}
      />
    </View>
  );
}