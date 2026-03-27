import { View, Text, FlatList } from "react-native";
import ProductCard from "./ProductCard";

export default function FlashSale({ products }) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}>
        🔥 Flash Sale
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={products.slice(0, 6)}
        keyExtractor={i => i.id.toString()}
        renderItem={({ item, index }) => (
          <View style={{ width: 160 }}>
            <ProductCard item={item} index={index} />
          </View>
        )}
      />
    </View>
  );
}