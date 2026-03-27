import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("wishlist").then((data) => {
      if (data) setWishlist(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toggle = (item) => {
    setWishlist((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item],
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, toggle }}>
      {children}
    </WishlistContext.Provider>
  );
};
