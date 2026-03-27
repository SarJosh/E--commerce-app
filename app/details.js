import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useContext, useMemo, useState } from "react";
import { CartContext } from "../context/CartContext";
import { SPACING } from "../constants/theme";
import { useProducts } from "../hooks/useProducts"; // ✅ MAKE SURE YOU HAVE THIS

const { width } = Dimensions.get("window");

export default function Details() {
  const { id } = useLocalSearchParams(); // ✅ GET ID
  const { products } = useProducts(); // ✅ GET ALL PRODUCTS
  const { dispatch } = useContext(CartContext);
  const [qty, setQty] = useState(1);

  // ✅ FIND PRODUCT USING ID
  const product = useMemo(() => {
    return products.find((p) => p.id?.toString() === id);
  }, [id, products]);

  // 🚨 LOADING / FALLBACK
  if (!product) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading product...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* 🔽 MAIN CONTENT */}
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* 🖼 IMAGE */}
        <ScrollView horizontal pagingEnabled>
          <Image
            source={{ uri: product.image }}
            style={{ width, height: 250 }}
            resizeMode="contain"
          />
        </ScrollView>

        <View style={{ padding: SPACING.md }}>
          
          {/* 📝 TITLE */}
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {product.title}
          </Text>

          {/* ⭐ RATING */}
          <Text style={{ marginTop: 5 }}>
            {"★".repeat(Math.round(product.rating?.rate || 4))} 
            ({product.rating?.count || 100})
          </Text>

          {/* 💰 PRICE */}
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            ${product.price}
          </Text>

          {/* 🔥 DISCOUNT */}
          <Text style={{ color: "red" }}>-20% OFF</Text>

          {/* 📄 DESCRIPTION */}
          <Text style={{ marginTop: 10, color: "#555" }}>
            {product.description}
          </Text>

          {/* 🔢 QUANTITY */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable
              onPress={() => setQty((q) => Math.max(1, q - 1))}
              style={{ padding: 10, backgroundColor: "#eee" }}
            >
              <Text>-</Text>
            </Pressable>

            <Text style={{ marginHorizontal: 15 }}>{qty}</Text>

            <Pressable
              onPress={() => setQty((q) => q + 1)}
              style={{ padding: 10, backgroundColor: "#eee" }}
            >
              <Text>+</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* 🔥 STICKY ACTION BAR */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          flexDirection: "row",
          backgroundColor: "#fff",
          padding: 10,
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        {/* 🛒 ADD TO CART */}
        <Pressable
          onPress={() =>
            dispatch({
              type: "ADD",
              payload: { ...product, quantity: qty },
            })
          }
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor: "#FFA41C",
            padding: 12,
            borderRadius: 8,
            marginRight: 5,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          })}
        >
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Add to Cart
          </Text>
        </Pressable>

        {/* ⚡ BUY NOW */}
        <Pressable
          style={({ pressed }) => ({
            flex: 1,
            backgroundColor: "#FF6A00",
            padding: 12,
            borderRadius: 8,
            transform: [{ scale: pressed ? 0.96 : 1 }],
          })}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Buy Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
}