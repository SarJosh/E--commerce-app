import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Image,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { COLORS } from "../constants/theme";

const { width } = Dimensions.get("window");

const banners = [
  { id: 1, image: "https://i.imgur.com/8Km9tLL.jpg" },
  { id: 2, image: "https://i.imgur.com/5tj6S7Ol.jpg" },
  { id: 3, image: "https://i.imgur.com/2nCt3Sbl.jpg" },
];

export default function BannerCarousel() {
  const flatRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔁 AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;

      flatRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3500);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const renderItem = ({ item }) => (
    <Pressable
      style={{
        width: width - 20,
        marginHorizontal: 10,
      }}
      onPress={() => console.log("Banner clicked")}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: "100%",
          height: 160,
          borderRadius: 14,
        }}
      />
    </Pressable>
  );

  return (
    <View style={{ marginTop: 10 }}>
      {/* 🎠 CAROUSEL */}
      <FlatList
        ref={flatRef}
        data={banners}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(
            e.nativeEvent.contentOffset.x / width
          );
          setActiveIndex(index);
        }}
      />

      {/* ⚫ PAGINATION DOTS */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        {banners.map((_, index) => (
          <View
            key={index}
            style={{
              width: activeIndex === index ? 16 : 6,
              height: 6,
              borderRadius: 4,
              backgroundColor:
                activeIndex === index ? COLORS.primary : "#ccc",
              marginHorizontal: 3,
            }}
          />
        ))}
      </View>
    </View>
  );
}