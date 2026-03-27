import {
  View,
  Text,
  Image,
  Pressable,
  Switch,
} from "react-native";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { SPACING, FONT, SHADOW } from "../../constants/theme";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext"; // ✅ ADD

export default function Profile() {
  const { user, guest, logout } = useContext(AuthContext);
  const { theme, dark, toggleTheme } = useTheme(); // ✅ ADD
  const [img, setImg] = useState(null);
  const router = useRouter();

  const pick = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({});
    if (!res.canceled) setImg(res.assets[0].uri);
  };

  // 👤 GUEST MODE
  if (guest) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.background,
        }}
      >
        <Text style={{ fontSize: FONT.large, color: theme.colors.text }}>
          You are browsing as Guest
        </Text>

        <Pressable
          onPress={() => router.push("/(auth)/login")}
          style={{
            backgroundColor: theme.colors.primary,
            padding: SPACING.md,
            marginTop: 20,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#fff" }}>Login</Text>
        </Pressable>
      </View>
    );
  }

  // 🔥 ACTION CARD COMPONENT
  const ActionCard = ({ title, icon, route }) => (
    <Pressable
      onPress={() => router.push(route)}
      style={({ pressed }) => ({
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.colors.card, // ✅ THEME
        padding: SPACING.md,
        marginBottom: 12,
        borderRadius: 12,
        transform: [{ scale: pressed ? 0.97 : 1 }],
        ...SHADOW,
      })}
    >
      <Ionicons name={icon} size={22} color={theme.colors.primary} />

      <Text
        style={{
          marginLeft: 15,
          fontSize: 15,
          flex: 1,
          color: theme.colors.text, // ✅ THEME
        }}
      >
        {title}
      </Text>

      <Ionicons name="chevron-forward" size={20} color={theme.colors.subText} />
    </Pressable>
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      
      {/* 🔝 HEADER */}
      <View style={{ alignItems: "center", padding: 20 }}>
        <Image
          source={{ uri: img || "https://i.pravatar.cc/150" }}
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: theme.colors.primary,
          }}
        />

        <Text
          style={{
            fontSize: FONT.title,
            marginTop: 10,
            color: theme.colors.text, // ✅ THEME
          }}
        >
          {user?.email}
        </Text>

        <Pressable onPress={pick}>
          <Text style={{ color: theme.colors.primary, marginTop: 5 }}>
            Edit Profile
          </Text>
        </Pressable>
      </View>

      {/* ⚙️ ACTIONS */}
      <View style={{ padding: 20 }}>

        <ActionCard title="Orders" icon="cube-outline" route="/orders" />
        <ActionCard title="Addresses" icon="location-outline" route="/addresses" />
        <ActionCard title="Payment Methods" icon="card-outline" route="/payments" />

        {/* 🌙 DARK MODE TOGGLE */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: theme.colors.card,
            padding: SPACING.md,
            borderRadius: 12,
            marginTop: 10,
            ...SHADOW,
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 15 }}>
            {dark ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </Text>

          <Switch value={dark} onValueChange={toggleTheme} />
        </View>

        {/* 🚪 LOGOUT */}
        <Pressable
          onPress={logout}
          style={{
            backgroundColor: "red",
            padding: SPACING.md,
            borderRadius: 10,
            marginTop: 20,
          }}
        >
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </View>
  );
}