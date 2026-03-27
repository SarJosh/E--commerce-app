import { TextInput } from "react-native";

export default function CustomInput(props) {
  return (
    <TextInput
      {...props}
      style={{
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginVertical: 8,
      }}
    />
  );
}
