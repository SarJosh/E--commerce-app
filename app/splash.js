import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/(tabs)/home");
    }, 2500);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 50 }}>🛍️</Text>
      <Text style={{ fontSize: 22 }}>ShopElite</Text>
    </View>
  );
}
