import { useMemo } from "react";
import useShop from "../context/useShop";
import ProductItem from "./ProductItem";
import Title from "./Title";

const LatestCollection = () => {
  const { products } = useShop();
  const latestProducts = useMemo(() => products.slice(0, 10), [products]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Title text1="BỘ SƯU TẬP" text2="MỚI NHẤT" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {latestProducts.map((item) => (
          <ProductItem
            id={item._id}
            image={item.image}
            key={item._id}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
