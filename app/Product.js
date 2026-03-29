import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { item } = useLocalSearchParams();
  const { addToCart } = useCart();

  const product = item ? JSON.parse(item) : null;

  if (!product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 15 }}>
        
        <Image
          source={{ uri: product.image }}
          style={{
            width: "100%",
            height: 250,
            resizeMode: "contain",
          }}
        />

        <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
          {product.title}
        </Text>

        <Text style={{ fontSize: 16, marginVertical: 10 }}>
          ${product.price}
        </Text>

        <Text style={{ color: "#555" }}>
          {product.description || "No description available"}
        </Text>
      </ScrollView>

      {/* 🛒 STICKY ADD TO CART */}
      <Pressable
        onPress={() => addToCart(product)}
        style={{
          backgroundColor: "orange",
          padding: 15,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          Add to Cart
        </Text>
      </Pressable>
    </View>
  );
}
