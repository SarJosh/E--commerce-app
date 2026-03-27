import {
  View,
  FlatList,
  TextInput,
  Text,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import { useState } from "react";

import useProducts from "../../hooks/useProducts";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import BannerCarousel from "../../components/BannerCarousel";
import { COLORS, SPACING } from "../../constants/theme";

export default function Home() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [refreshing, setRefreshing] = useState(false);

  const categories = ["All", "Phones", "Fashion", "Electronics", "Gaming"];

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  // ✅ SAFE FILTER (handles undefined values)
  const filtered = products.filter((p) => {
    const title = p?.title?.toLowerCase() || "";

    const matchSearch = title.includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      p?.customCategory === selectedCategory;

    return matchSearch && matchCategory;
  });

  // ✅ LOADING STATE (fixed keys)
  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        renderItem={() => <Loader />}
      />
    );
  }

  const Header = () => (
    <View style={{ backgroundColor: COLORS.white }}>
      
      {/* 🔍 SEARCH */}
      <View style={{ padding: SPACING.md }}>
        <TextInput
          placeholder="Search products..."
          value={search}
          onChangeText={setSearch}
          style={{
            backgroundColor: "#f1f1f1",
            padding: 12,
            borderRadius: 10,
          }}
        />
      </View>

      {/* 🎠 BANNER */}
      <BannerCarousel />

      {/* 🧭 CATEGORY FILTER */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ padding: SPACING.md }}
      >
        {categories.map((cat) => {
          const active = selectedCategory === cat;

          return (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: active ? COLORS.primary : "#eee",
                borderRadius: 20,
                marginRight: 10,
              }}
            >
              <Text style={{ color: active ? "#fff" : "#000" }}>
                {cat}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* 🔥 TITLE */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: "bold",
          marginLeft: 12,
          marginTop: 10,
        }}
      >
        Products
      </Text>
    </View>
  );

  return (
    <FlatList
      data={filtered}
      numColumns={2}
      keyExtractor={(item, index) =>
        item.id?.toString() || index.toString()
      }
      ListHeaderComponent={Header}
      stickyHeaderIndices={[0]}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item, index }) => (
        <ProductCard item={item} index={index} />
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 20 }}>
          No products found
        </Text>
      }
    />
  );
}