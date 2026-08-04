import useShop from "../context/useShop";
import ProductItem from "./ProductItem";
import Title from "./Title";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useShop();

  const related = products
    .filter(
      (item) => item.category === category && item.subCategory === subCategory,
    )
    .slice(0, 5);

  if (related.length === 0) return null;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <Title text1="SẢN PHẨM" text2="LIÊN QUAN" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {related.map((item) => (
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

export default RelatedProducts;
