import { useMemo, useState } from "react";
import { assets } from "../assets/assets";
import ProductItem from "../components/ProductItem";
import Title from "../components/Title";
import useShop from "../context/useShop";

const categories = ["Men", "Women", "Kids"];
const subCategories = ["Topwear", "Bottomwear", "Winterwear"];

const categoryLabels = { Kids: "Trẻ em", Men: "Nam", Women: "Nữ" };
const subCategoryLabels = {
  Bottomwear: "Quần",
  Topwear: "Áo",
  Winterwear: "Đồ đông",
};

const removeDiacritics = (str) =>
  str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");

const Collection = () => {
  const { products, search } = useShop();

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const toggleSubCategory = (value) => {
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const filterProducts = useMemo(() => {
    let productsCopy = products.slice();

    if (search) {
      const normalizedSearch = removeDiacritics(search.toLowerCase());
      productsCopy = productsCopy.filter((item) =>
        removeDiacritics(item.name.toLowerCase()).includes(normalizedSearch),
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category),
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory),
      );
    }

    return productsCopy;
  }, [products, search, category, subCategory]);

  const sortedProducts = useMemo(() => {
    const fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        fpCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        fpCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return fpCopy;
  }, [filterProducts, sortType]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:gap-10">
        {/* Sidebar Filter */}
        <div className="min-w-60">
          <p
            className="my-2 flex cursor-pointer items-center gap-2 font-semibold text-sm"
            onClick={() => setShowFilter(!showFilter)}
            onKeyDown={(e) => {
              if (e.key === "Enter") setShowFilter(!showFilter);
            }}
          >
            BỘ LỌC
            <img
              alt=""
              className={`h-3 transition-transform ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
            />
          </p>

          {/* Category Filter */}
          <div
            className={`flex flex-col gap-2 py-4 text-sm ${showFilter ? "block" : "hidden"} sm:block`}
          >
            <p className="mb-2 font-medium text-sm">DANH MỤC</p>
            {categories.map((item) => (
              <label
                className="flex cursor-pointer items-center gap-2"
                key={item}
              >
                <input
                  checked={category.includes(item)}
                  onChange={() => toggleCategory(item)}
                  type="checkbox"
                />
                {categoryLabels[item]}
              </label>
            ))}
          </div>

          {/* SubCategory Filter */}
          <div
            className={`flex flex-col gap-2 py-4 text-sm ${showFilter ? "block" : "hidden"} sm:block`}
          >
            <p className="mb-2 font-medium text-sm">LOẠI</p>
            {subCategories.map((item) => (
              <label
                className="flex cursor-pointer items-center gap-2"
                key={item}
              >
                <input
                  checked={subCategory.includes(item)}
                  onChange={() => toggleSubCategory(item)}
                  type="checkbox"
                />
                {subCategoryLabels[item]}
              </label>
            ))}
          </div>
        </div>

        {/* Product Section */}
        <div className="flex-1">
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Title text1="BỘ SƯU TẬP" text2="TẤT CẢ" />
            <select
              className="cursor-pointer rounded-md border border-gray-300 px-3 py-2 text-sm outline-none"
              onChange={(e) => setSortType(e.target.value)}
              value={sortType}
            >
              <option value="relevant">Sắp xếp: Mặc định</option>
              <option value="low-high">Giá: Thấp → Cao</option>
              <option value="high-low">Giá: Cao → Thấp</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {sortedProducts.map((item) => (
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
      </div>
    </div>
  );
};

export default Collection;
