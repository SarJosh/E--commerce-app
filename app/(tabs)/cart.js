import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { useCart } from "../../context/CartContext"; // ✅ USE HOOK
import { COLORS, SHADOW } from "../../constants/theme";
import { useRouter } from "expo-router";

export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    getTotal,
  } = useCart();

  const router = useRouter();

  // 🧮 TOTAL
  const total = getTotal();

  // 🧺 EMPTY STATE
  if (!cartItems.length) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 18, marginBottom: 10 }}>
          🛒 Your cart is empty
        </Text>

        <Pressable
          onPress={() => router.push("/")}
          style={{
            backgroundColor: COLORS.primary,
            padding: 12,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>Start Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ padding: 10 }}>
        {cartItems.map((item) => (
          <View
            key={item.id}
            style={{
              flexDirection: "row",
              backgroundColor: "#fff",
              marginBottom: 12,
              padding: 10,
              borderRadius: 12,
              ...SHADOW,
            }}
          >
            {/* 🖼 IMAGE */}
            <Image
              source={{ uri: item.image }}
              style={{ width: 80, height: 80 }}
              resizeMode="contain"
            />

            {/* 📝 DETAILS */}
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text numberOfLines={2} style={{ fontWeight: "600" }}>
                {item.title}
              </Text>

              <Text
                style={{
                  marginTop: 4,
                  fontSize: 16,
                  fontWeight: "bold",
                }}
              >
                ${item.price}
              </Text>

              {/* 🔢 QUANTITY CONTROLS */}
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <Pressable
                  onPress={() => decreaseQty(item.id)}
                  style={{
                    backgroundColor: "#eee",
                    padding: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text>-</Text>
                </Pressable>

                <Text style={{ marginHorizontal: 12 }}>
                  {item.quantity}
                </Text>

                <Pressable
                  onPress={() => increaseQty(item.id)}
                  style={{
                    backgroundColor: "#eee",
                    padding: 6,
                    borderRadius: 6,
                  }}
                >
                  <Text>+</Text>
                </Pressable>

                {/* ❌ REMOVE */}
                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  style={{ marginLeft: 20 }}
                >
                  <Text style={{ color: "red" }}>Remove</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* 💳 STICKY CHECKOUT BAR */}
      <View
        style={{
          padding: 15,
          borderTopWidth: 1,
          borderColor: "#eee",
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Subtotal: ${total.toFixed(2)}
        </Text>

        <Pressable
          onPress={() => router.push("/checkout")}
          style={{
            backgroundColor: COLORS.primary,
            padding: 14,
            borderRadius: 10,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "#fff",
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            Proceed to Checkout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}