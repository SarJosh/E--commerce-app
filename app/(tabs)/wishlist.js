// screens/Wishlist.js
import { View, FlatList, Button } from "react-native";
import { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/ProductCard";

export default function Wishlist() {
  const { wishlist, toggle } = useContext(WishlistContext);
  const { addToCart } = useCart();

  const moveToCart = (item) => {
    addToCart(item);     // Add to cart
    toggle(item);        // Remove from wishlist
  };

  return (
    <View style={{ flex: 1, padding: 8 }}>
      <FlatList
        data={wishlist}
        numColumns={2}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 4 }}>
            <ProductCard item={item} />
            <Button title="Move to Cart" onPress={() => moveToCart(item)} />
          </View>
        )}
      />
    </View>
  );
}