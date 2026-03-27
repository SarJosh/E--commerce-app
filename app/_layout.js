import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { WishlistProvider } from "../context/WishlistContext";
import { UserProvider } from "../context/UserContext";

// 🔥 Separate component to access theme
function RootLayoutContent() {
  const { theme } = useTheme();

  return (
    <>
      
      <StatusBar style={theme.dark ? "light" : "dark"} />

      {/* ✅ NAVIGATION */}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WishlistProvider>
          <UserProvider>
            <CartProvider>
              <RootLayoutContent />
            </CartProvider>
          </UserProvider>
        </WishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}