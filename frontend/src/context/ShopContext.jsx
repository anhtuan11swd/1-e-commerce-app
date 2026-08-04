import { useState } from "react";
import toast from "react-hot-toast";
import { products } from "../assets/assets";
import ShopContext from "./ShopContextDef";

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const currency = "₫";
  const delivery_fee = 50000;

  const addToCart = (itemId, size) => {
    if (!size) {
      toast.error("Vui lòng chọn kích cỡ");
      return;
    }
    const cartData = structuredClone(cartItems);
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    setCartItems(cartData);
    toast.success("Đã thêm vào giỏ hàng");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalCount += cartItems[items][item];
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId][size];
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((p) => p._id === items);
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const value = {
    addToCart,
    cartItems,
    currency,
    delivery_fee,
    getCartAmount,
    getCartCount,
    products,
    search,
    setCartItems,
    setSearch,
    setShowSearch,
    showSearch,
    updateQuantity,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
