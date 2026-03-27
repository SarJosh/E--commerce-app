import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  // 🌙 Load saved theme
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("theme");
      if (saved !== null) {
        setDark(JSON.parse(saved));
      }
    })();
  }, []);

  // 💾 Save theme
  useEffect(() => {
    AsyncStorage.setItem("theme", JSON.stringify(dark));
  }, [dark]);

  // 🎨 Theme object
  const theme = {
    dark,
    colors: {
      background: dark ? "#121212" : "#ffffff",
      card: dark ? "#1e1e1e" : "#ffffff",
      text: dark ? "#ffffff" : "#000000",
      subText: dark ? "#bbbbbb" : "#555555",
      border: dark ? "#333" : "#e0e0e0",
      primary: "#4CAF50",
    },
  };

  const toggleTheme = () => setDark((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        dark,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);