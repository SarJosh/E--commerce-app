import {
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { useState, useContext } from "react";
import CustomInput from "../../components/CustomInput";
import { AuthContext } from "../../context/AuthContext";
import { COLORS, SPACING } from "../../constants/theme";
import { useRouter } from "expo-router";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handle = async () => {
    try {
      await login(email, password);
      router.replace("/(tabs)/home");
    } catch (e) {
      Alert.alert("Error", e);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Welcome Back 👋
      </Text>

      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />

      <Pressable
        onPress={handle}
        style={({ pressed }) => ({
          backgroundColor: COLORS.primary,
          padding: SPACING.md,
          borderRadius: 10,
          marginTop: 10,
          opacity: pressed ? 0.8 : 1,
        })}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>Login</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/register")}>
        <Text style={{ marginTop: 15, textAlign: "center" }}>
          Create Account
        </Text>
      </Pressable>
    </View>
  );
}