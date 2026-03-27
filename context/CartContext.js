import { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const CartContext = createContext();

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "SET_CART":
      return action.payload;

    case "ADD":
      const exists = state.find(i => i.id === action.payload.id);

      if (exists) {
        return state.map(i =>
          i.id === action.payload.id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }

      return [...state, { ...action.payload, qty: action.payload.qty || 1 }];

    case "INCREASE":
      return state.map(i =>
        i.id === action.payload
          ? { ...i, qty: i.qty + 1 }
          : i
      );

    case "DECREASE":
      return state
        .map(i =>
          i.id === action.payload
            ? { ...i, qty: i.qty - 1 }
            : i
        )
        .filter(i => i.qty > 0);

    case "REMOVE":
      return state.filter(i => i.id !== action.payload);

    case "CLEAR":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    (async () => {
      const data = await AsyncStorage.getItem("cart");
      if (data) {
        dispatch({ type: "SET_CART", payload: JSON.parse(data) });
      }
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const addToCart = (item) => {
    dispatch({ type: "ADD", payload: item });
  };

  const increaseQty = (id) => dispatch({ type: "INCREASE", payload: id });
  const decreaseQty = (id) => dispatch({ type: "DECREASE", payload: id });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", payload: id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  const getTotal = () =>
    state.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};