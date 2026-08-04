import { useContext } from "react";
import ShopContext from "./ShopContextDef";

const useShop = () => useContext(ShopContext);

export default useShop;
