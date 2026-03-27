import React, { memo, useContext } from "react";
import { Pressable, Text, Image, View } from "react-native";
import { useRouter } from "expo-router";
import { MotiView } from "moti";
import { SPACING, SHADOW } from "../constants/theme";
import { useCart } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { useTheme } from "../context/ThemeContext"; // ✅ ADD THEME

function ProductCard({ item, index = 0 }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { wishlist, toggle } = useContext(WishlistContext);
  const { theme } = useTheme(); // ✅ USE THEME

  const isInWishlist = wishlist.some((i) => i.id === item.id);

  const handleNavigate = () => {
    router.push({
      pathname: "/product/[id]",
      params: { id: item.id },
    });
  };

  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ delay: index * 60, type: "timing" }}
      style={{ flex: 1 }}
    >
      <Pressable
        onPress={handleNavigate}
        style={({ pressed }) => ({
          backgroundColor: theme.colors.card, // ✅ THEME
          margin: SPACING.sm,
          padding: SPACING.md,
          borderRadius: 14,
          transform: [{ scale: pressed ? 0.96 : 1 }],
          opacity: pressed ? 0.9 : 1,
          ...SHADOW,
        })}
      >
        {/* ❤️ WISHLIST ICON */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            toggle(item);
          }}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: theme.colors.card, // ✅ MATCH THEME
            padding: 6,
            borderRadius: 20,
            zIndex: 10,
            ...SHADOW,
          }}
        >
          <Text style={{ fontSize: 16 }}>
            {isInWishlist ? "❤️" : "♡"}
          </Text>
        </Pressable>

        {/* 🖼 PRODUCT IMAGE */}
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 130, resizeMode: "contain" }}
        />

        {/* 📝 PRODUCT TITLE */}
        <Text
          numberOfLines={2}
          style={{
            fontSize: 13,
            marginTop: 6,
            color: theme.colors.text, // ✅ THEME
            minHeight: 36,
          }}
        >
          {item.title}
        </Text>

        {/* ⭐ RATING */}
        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
          <Text style={{ color: "#FFA41C", fontSize: 12 }}>
            {"★".repeat(Math.round(item.rating?.rate || 4))}
          </Text>
          <Text
            style={{
              fontSize: 11,
              marginLeft: 5,
              color: theme.colors.subText, // ✅ THEME
            }}
          >
            ({item.rating?.count || 100})
          </Text>
        </View>

        {/* 💰 PRICE */}
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 4,
            color: theme.colors.text, // ✅ THEME
          }}
        >
          ${item.price}
        </Text>

        {/* 🔥 DISCOUNT */}
        <Text
          style={{
            color: "red",
            fontSize: 12,
            marginTop: 2,
          }}
        >
          -20% OFF
        </Text>

        {/* 🛒 ADD TO CART BUTTON */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            addToCart(item);

            // 🔥 OPTIONAL: remove from wishlist if already there
            if (isInWishlist) toggle(item);
          }}
          style={({ pressed }) => ({
            marginTop: 8,
            backgroundColor: theme.colors.primary, // ✅ THEME
            paddingVertical: 8,
            borderRadius: 8,
            transform: [{ scale: pressed ? 0.95 : 1 }],
          })}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontSize: 13,
              fontWeight: "600",
            }}
          >
            Add to Cart
          </Text>
        </Pressable>
      </Pressable>
    </MotiView>
  );
}

export default memo(ProductCard);