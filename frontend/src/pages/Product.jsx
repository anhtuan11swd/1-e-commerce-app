import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";
import useShop from "../context/useShop";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useShop();

  const productData = useMemo(
    () => products.find((item) => item._id === productId),
    [products, productId],
  );

  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll to top on product change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  const displayImage = image || productData?.image?.[0] || "";

  if (!productData) return <div className="opacity-0" />;

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      {/* Product Info */}
      <div className="flex flex-col gap-6 sm:flex-row sm:gap-10">
        {/* Image Gallery */}
        <div className="flex w-full flex-col gap-3 sm:w-1/2 sm:flex-row">
          <div className="flex gap-2 sm:flex-col">
            {productData.image.map((item) => (
              <button
                className={`w-16 cursor-pointer border p-0 ${
                  displayImage === item
                    ? "border-orange-500"
                    : "border-gray-200"
                }`}
                key={item}
                onClick={() => setImage(item)}
                type="button"
              >
                <img alt={`${productData.name}`} src={item} />
              </button>
            ))}
          </div>
          <div className="flex-1">
            <img
              alt={productData.name}
              className="w-full object-contain"
              src={displayImage}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex w-full flex-1 flex-col gap-4 sm:w-1/2">
          <h1 className="font-medium text-2xl">{productData.name}</h1>

          {/* Stars */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <img
                alt="star"
                className="w-3.5"
                key={i}
                src={assets.star_icon}
              />
            ))}
            <p className="ml-2 text-gray-500 text-sm">(122)</p>
          </div>

          {/* Price */}
          <p className="font-medium text-2xl">
            {productData.price.toLocaleString("vi-VN")}
            {currency}
          </p>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed md:w-4/5">
            {productData.description}
          </p>

          {/* Size Selection */}
          <div className="flex flex-col gap-3">
            <p className="font-medium text-sm">CHỌN KÍCH CỠ</p>
            <div className="flex gap-2">
              {productData.sizes.map((item) => (
                <button
                  className={`cursor-pointer border px-4 py-2 text-sm ${
                    size === item
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-300"
                  }`}
                  key={item}
                  onClick={() => setSize(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="mt-2 w-48 cursor-pointer bg-black px-8 py-3 text-sm text-white active:bg-gray-700"
            onClick={() => addToCart(productData._id, size)}
            type="button"
          >
            THÊM VÀO GIỎ
          </button>

          <hr className="mt-4 w-full border-gray-200 sm:w-4/5" />

          {/* Info */}
          <div className="flex flex-col gap-1 text-gray-500 text-sm">
            <p>✓ Hàng chính hãng 100%</p>
            <p>✓ Miễn phí đổi trả trong 7 ngày</p>
            <p>✓ Giao hàng toàn quốc</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews Tabs */}
      <div className="mt-16">
        <div className="flex gap-6 border-b">
          <button
            className="cursor-pointer border-black border-b-2 pb-3 font-medium text-sm"
            type="button"
          >
            Mô tả
          </button>
          <button
            className="cursor-pointer pb-3 text-gray-400 text-sm"
            type="button"
          >
            Đánh giá (122)
          </button>
        </div>
        <div className="flex flex-col gap-4 py-6 text-gray-600 text-sm leading-relaxed">
          <p>{productData.description}</p>
          <p>
            Sản phẩm được thiết kế với chất liệu cao cấp, mang lại cảm giác
            thoải mái và phong cách thời trang hiện đại. Phù hợp cho nhiều hoạt
            động trong đời sống hàng ngày.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
