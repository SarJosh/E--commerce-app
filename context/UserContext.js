import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);

  // 🔄 LOAD DATA
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedAddresses = await AsyncStorage.getItem("addresses");
    const savedPayments = await AsyncStorage.getItem("payments");

    if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    if (savedPayments) setPayments(JSON.parse(savedPayments));
  };

  // 💾 SAVE ADDRESS
  const addAddress = async (address) => {
    const updated = [...addresses, address];
    setAddresses(updated);
    await AsyncStorage.setItem("addresses", JSON.stringify(updated));
  };

  // 💾 SAVE PAYMENT
  const addPayment = async (payment) => {
    const updated = [...payments, payment];
    setPayments(updated);
    await AsyncStorage.setItem("payments", JSON.stringify(updated));
  };

  return (
    <UserContext.Provider
      value={{
        addresses,
        payments,
        addAddress,
        addPayment,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);