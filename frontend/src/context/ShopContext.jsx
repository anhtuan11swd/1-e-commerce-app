import { products } from "../assets/assets";
import ShopContext from "./ShopContextDef";

const ShopContextProvider = (props) => {
  const currency = "₫";
  const delivery_fee = 50000;

  const value = { currency, delivery_fee, products };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
