import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ShopContext from "./ShopContextDef";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const currency = "₫";
  const delivery_fee = 50000;

  const addToCart = async (itemId, size) => {
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

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/v1/cart/add`,
          { itemId, size },
          { headers: { token } },
        );
      } catch {
        // silent fail
      }
    }

    toast.success("Đã thêm vào giỏ hàng");
  };

  const updateQuantity = async (itemId, size, quantity) => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId][size];
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/v1/cart/update`,
          { itemId, quantity, size },
          { headers: { token } },
        );
      } catch {
        // silent fail
      }
    }
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

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((p) => p._id === items);
      if (!itemInfo) continue;
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          totalAmount += itemInfo.price * cartItems[items][item];
        }
      }
    }
    return totalAmount;
  };

  const logout = () => {
    setToken("");
    setCartItems({});
    setUser(null);
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Đăng xuất thành công", {
      duration: 2000,
      position: "top-center",
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/v1/product/list`, {
          signal: controller.signal,
        });
        if (data.success) {
          setProducts(data.products);
        } else {
          toast.error(data.message || "Lỗi khi tải sản phẩm", {
            duration: 2000,
            position: "top-center",
          });
        }
      } catch (err) {
        if (err.name !== "CanceledError") {
          toast.error("Lỗi kết nối server", {
            duration: 2000,
            position: "top-center",
          });
        }
      }
    };
    fetchProducts();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      const controller = new AbortController();
      const fetchCart = async () => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/v1/cart/get`,
            {},
            { headers: { token }, signal: controller.signal },
          );
          if (data.success) {
            setCartItems(data.cartData);
          }
        } catch {
          // silent fail on cart load
        }
      };
      const fetchProfile = async () => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/v1/user/profile`,
            {},
            { headers: { token }, signal: controller.signal },
          );
          if (data.success) {
            setUser(data.user);
          }
        } catch {
          // silent fail on profile load
        }
      };
      fetchCart();
      fetchProfile();
      return () => controller.abort();
    }
  }, [token]);

  const value = {
    addToCart,
    cartItems,
    currency,
    delivery_fee,
    getCartAmount,
    getCartCount,
    logout,
    products,
    search,
    setCartItems,
    setSearch,
    setShowSearch,
    setToken,
    showSearch,
    token,
    updateQuantity,
    user,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
