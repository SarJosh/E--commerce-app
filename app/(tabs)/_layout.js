import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const icons = {
            home: "home",
            cart: "cart",
            wishlist: "heart",
            profile: "person",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="cart" />
      <Tabs.Screen name="wishlist" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
