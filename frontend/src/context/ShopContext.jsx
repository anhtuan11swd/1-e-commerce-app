import { useState } from "react";
import { products } from "../assets/assets";
import ShopContext from "./ShopContextDef";

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const currency = "₫";
  const delivery_fee = 50000;

  const value = {
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
