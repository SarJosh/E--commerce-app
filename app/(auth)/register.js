import { View, Text, Pressable, Alert } from "react-native";
import { useState } from "react";
import CustomInput from "../../components/CustomInput";
import { COLORS, SPACING } from "../../constants/theme";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        Create Account 🚀
      </Text>

      <CustomInput placeholder="Email" value={email} onChangeText={setEmail} />
      <CustomInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />

      <Pressable
        onPress={() => {
          Alert.alert("Success", "Account created");
          router.replace("/(auth)/login");
        }}
        style={{
          backgroundColor: COLORS.primary,
          padding: SPACING.md,
          borderRadius: 10,
          marginTop: 10,
        }}
      >
        <Text style={{ color: "#fff", textAlign: "center" }}>
          Register
        </Text>
      </Pressable>
    </View>
  );
}