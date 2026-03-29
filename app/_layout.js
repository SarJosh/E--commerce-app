import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider } from "../context/ThemeContext";
import { WishlistProvider } from "../context/WishlistContext";
import { UserProvider } from "../context/UserContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <UserProvider>
              <CartProvider>

                <Stack screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="product" />
                  <Stack.Screen name="checkout" />
                  <Stack.Screen name="success" />
                </Stack>

              </CartProvider>
            </UserProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
