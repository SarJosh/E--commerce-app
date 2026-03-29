import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCart } from "../context/CartContext";
import { useState } from "react";

const { width } = Dimensions.get("window");

export default function ProductDetails() {
  const { item } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();

  const product = item ? JSON.parse(item) : null;
  const [active, setActive] = useState(0);

  if (!product) {
    return (
      <View style={{ padding: 20 }}>
        <Text>Product not found</Text>
      </View>
    );
  }

  // 🖼 MULTIPLE IMAGES (fallback if only one)
  const images = product.images || [product.image];

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      
      <ScrollView>
        
        {/* 🖼 IMAGE SLIDER */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={(e) => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x / width
            );
            setActive(index);
          }}
          scrollEventThrottle={16}
        >
          {images.map((img, i) => (
            <Image
              key={i}
              source={{ uri: img }}
              style={{
                width,
                height: 280,
                resizeMode: "contain",
                backgroundColor: "#f5f5f5",
              }}
            />
          ))}
        </ScrollView>

        {/* 🔘 DOT INDICATOR */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 8,
          }}
        >
          {images.map((_, i) => (
            <View
              key={i}
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
                backgroundColor: active === i ? "#000" : "#ccc",
              }}
            />
          ))}
        </View>

        {/* 📦 PRODUCT INFO */}
        <View style={{ padding: 15 }}>
          
          {/* TITLE */}
          <Text style={{ fontSize: 18, fontWeight: "600" }}>
            {product.title}
          </Text>

          {/* ⭐ RATING */}
          <View style={{ flexDirection: "row", marginTop: 6 }}>
            <Text style={{ color: "#FFA41C" }}>
              {"★".repeat(Math.round(product.rating?.rate || 4))}
            </Text>
            <Text style={{ marginLeft: 6, color: "#555" }}>
              ({product.rating?.count || 120} reviews)
            </Text>
          </View>

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
          <Text style={{ color: "red", marginTop: 4 }}>
            -20% OFF • Limited Deal
          </Text>

          {/* 🚚 DELIVERY */}
          <Text style={{ marginTop: 8, color: "#444" }}>
            FREE Delivery • Arrives in 3-5 days
          </Text>

          {/* 📝 DESCRIPTION */}
          <Text style={{ marginTop: 15, color: "#555", lineHeight: 20 }}>
            {product.description ||
              "This is a high-quality product with excellent performance and durability."}
          </Text>
        </View>
      </ScrollView>

      {/* 🛒 STICKY BOTTOM BAR */}
      <View
        style={{
          flexDirection: "row",
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        {/* ADD TO CART */}
        <Pressable
          onPress={() => addToCart(product)}
          style={{
            flex: 1,
            backgroundColor: "#ffd814",
            padding: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "600" }}>Add to Cart</Text>
        </Pressable>

        {/* BUY NOW */}
        <Pressable
          onPress={() => {
            addToCart(product);
            router.push("/checkout");
          }}
          style={{
            flex: 1,
            backgroundColor: "#ff9900",
            padding: 15,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "600" }}>
            Buy Now
          </Text>
        </Pressable>
      </View>
    </View>
  );
    }
