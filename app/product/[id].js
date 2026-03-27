import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useCart } from "../../context/CartContext";
import { SPACING } from "../../constants/theme";
import { useProducts } from "../../hooks/useProducts";

const { width } = Dimensions.get("window");

export default function Details() {
  const { id } = useLocalSearchParams();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);

  const product = useMemo(() => {
    return products.find((p) => p.id === id);
  }, [id, products]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Image
          source={{ uri: product.image }}
          style={{ width, height: 250 }}
          resizeMode="contain"
        />

        <View style={{ padding: SPACING.md }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {product.title}
          </Text>

          <Text style={{ marginTop: 5 }}>
            {"★".repeat(Math.round(product.rating?.rate || 4))} (
            {product.rating?.count || 100})
          </Text>

          <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
            ${product.price}
          </Text>

          <Text style={{ color: "red" }}>-20% OFF</Text>

          <Text style={{ marginTop: 10, color: "#555" }}>
            {product.description}
          </Text>

          {/* Quantity */}
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Pressable onPress={() => setQty((q) => Math.max(1, q - 1))}>
              <Text>-</Text>
            </Pressable>

            <Text style={{ marginHorizontal: 15 }}>{qty}</Text>

            <Pressable onPress={() => setQty((q) => q + 1)}>
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Bar */}
      <View style={{ flexDirection: "row", padding: 10 }}>
        <Pressable
          onPress={() => addToCart({ ...product, qty })}
          style={{ flex: 1, backgroundColor: "#FFA41C", padding: 12 }}
        >
          <Text style={{ textAlign: "center" }}>Add to Cart</Text>
        </Pressable>
      </View>
    </View>
  );
}