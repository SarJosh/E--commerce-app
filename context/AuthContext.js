import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [guest, setGuest] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync("user").then((u) => {
      if (u) {
        setUser(JSON.parse(u));
        setGuest(false);
      }
    });
  }, []);

  const login = async (email, password) => {
    if (!email.includes("@")) throw "Invalid email";
    if (password.length < 6) throw "Password too short";

    const data = { email };
    await SecureStore.setItemAsync("user", JSON.stringify(data));
    setUser(data);
    setGuest(false);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("user");
    setUser(null);
    setGuest(true);
  };

  return (
    <AuthContext.Provider value={{ user, guest, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
