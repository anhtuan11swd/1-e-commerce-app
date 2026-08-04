import { Link } from "react-router-dom";
import useShop from "../context/useShop";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useShop();

  return (
    <Link className="group block" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-md bg-gray-100">
        <img
          alt={name}
          className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
          src={image[0]}
        />
      </div>
      <div className="mt-3">
        <p className="truncate text-gray-700 text-sm">{name}</p>
        <p className="mt-1 font-medium text-gray-800 text-sm">
          {price.toLocaleString("vi-VN")}
          {currency}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
