import { useState } from "react";
import { products } from "../assets/assets";
import ShopContext from "./ShopContextDef";

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const currency = "₫";
  const delivery_fee = 50000;

  const addToCart = (itemId, size) => {
    const updated = { ...cartItems };
    if (!updated[itemId]) {
      updated[itemId] = {};
    }
    updated[itemId][size] = (updated[itemId][size] || 0) + 1;
    setCartItems(updated);
  };

  const value = {
    addToCart,
    cartItems,
    currency,
    delivery_fee,
    products,
    search,
    setSearch,
    setShowSearch,
    showSearch,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
