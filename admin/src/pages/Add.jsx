import { Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import adminApi from "../config/adminApi";
import { addProductSchema } from "../utils/validation";

const categories = ["Men", "Women", "Kids"];
const subCategories = ["Topwear", "Bottomwear", "Winterwear"];
const sizesList = ["XS", "S", "M", "L", "XL", "XXL"];

const categoryLabels = {
  Kids: "Trẻ em",
  Men: "Nam",
  Women: "Nữ",
};

const subCategoryLabels = {
  Bottomwear: "Quần",
  Topwear: "Áo",
  Winterwear: "Đồ đông",
};

const Add = () => {
  const { productId } = useParams();
  const isEdit = Boolean(productId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState([null, null, null, null]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const { data } = await adminApi.post("/product/single", {
          productId,
        });
        if (data.success) {
          const p = data.product;
          setName(p.name);
          setDescription(p.description);
          setPrice(p.price.toString());
          setCategory(p.category);
          setSubCategory(p.subCategory);
          setSizes(p.sizes);
          setBestseller(p.bestseller);
          setExistingImages(p.image || []);
        } else {
          toast.error("Không tìm thấy sản phẩm", {
            duration: 2000,
            position: "top-center",
          });
          navigate("/list");
        }
      } catch {
        toast.error("Lỗi kết nối server", {
          duration: 2000,
          position: "top-center",
        });
        navigate("/list");
      } finally {
        setFetching(false);
      }
    };

    fetchProduct();
  }, [productId, navigate]);

  const fileInputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
    setErrors((prev) => ({ ...prev, sizes: undefined }));
  };

  const handleImageChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleImageRemove = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
    if (fileInputRefs[index].current) {
      fileInputRefs[index].current.value = "";
    }
  };

  const validateForm = () => {
    const result = addProductSchema.safeParse({
      category,
      description,
      name,
      price: Number(price),
      sizes,
      subCategory,
    });

    if (!result.success) {
      const fieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0];
        if (field && !fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const hasNewImages = images.some((img) => img !== null);
    if (!isEdit && !hasNewImages) {
      toast.error("Vui lòng tải lên ít nhất một hình ảnh", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", bestseller.toString());

      if (isEdit) {
        formData.append("id", productId);
      }

      images.forEach((img, i) => {
        if (img) {
          formData.append(`image${i + 1}`, img);
        }
      });

      const endpoint = isEdit ? "/product/update" : "/product/add";
      const { data } = await adminApi.post(endpoint, formData);

      if (data.success) {
        toast.success(
          isEdit
            ? "Sản phẩm đã được cập nhật thành công"
            : "Sản phẩm đã được thêm thành công",
          { duration: 2000, position: "top-center" },
        );
        navigate("/list");
      } else {
        toast.error(data.message || "Lỗi khi lưu sản phẩm", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch {
      toast.error("Lỗi kết nối server", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center p-10">
        <span className="text-gray-400">Đang tải...</span>
      </div>
    );
  }

  return (
    <form className="mx-auto max-w-2xl p-6" onSubmit={onSubmitHandler}>
      <h2 className="mb-6 font-semibold text-xl">
        {isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
      </h2>

      {/* Image Upload */}
      <div className="mb-6">
        <label
          className="mb-2 block font-medium text-gray-700 text-sm"
          htmlFor="image-upload"
        >
          Hình ảnh
        </label>
        <div className="flex gap-3">
          {images.map((img, i) => (
            <label
              className={`group relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300 border-dashed transition-colors ${
                loading
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:border-orange-400"
              }`}
              // biome-ignore lint/suspicious/noArrayIndexKey: static list of 4 image slots
              key={`image-${i}`}
            >
              <input
                accept="image/*"
                className="hidden"
                disabled={loading}
                onChange={(e) => handleImageChange(i, e.target.files[0])}
                ref={fileInputRefs[i]}
                type="file"
              />
              {img ? (
                <>
                  <img
                    alt=""
                    className="h-full w-full object-cover"
                    src={URL.createObjectURL(img)}
                  />
                  <button
                    className="absolute top-1 right-1 cursor-pointer rounded-full bg-black/50 p-1 text-white opacity-0 transition-opacity hover:bg-black/70 group-hover:opacity-100"
                    disabled={loading}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleImageRemove(i);
                    }}
                    type="button"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </>
              ) : existingImages[i] ? (
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src={existingImages[i]}
                />
              ) : (
                <img
                  alt=""
                  className="w-8 opacity-40"
                  src={assets.upload_area}
                />
              )}
            </label>
          ))}
        </div>
        {isEdit && (
          <p className="mt-2 text-gray-400 text-xs">
            Chỉ tải lên hình mới nếu muốn thay đổi
          </p>
        )}
      </div>

      {/* Product Name */}
      <div className="mb-4">
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="product-name"
        >
          Tên sản phẩm
        </label>
        <input
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.name
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-orange-400"
          }`}
          disabled={loading}
          id="product-name"
          onChange={(e) => {
            setName(e.target.value);
            setErrors((prev) => ({ ...prev, name: undefined }));
          }}
          required
          value={name}
        />
        {errors.name && (
          <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="product-description"
        >
          Mô tả
        </label>
        <textarea
          className={`w-full resize-none rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.description
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-orange-400"
          }`}
          disabled={loading}
          id="product-description"
          onChange={(e) => {
            setDescription(e.target.value);
            setErrors((prev) => ({ ...prev, description: undefined }));
          }}
          required
          rows={3}
          value={description}
        />
        {errors.description && (
          <p className="mt-1 text-red-500 text-xs">{errors.description}</p>
        )}
      </div>

      {/* Price */}
      <div className="mb-4">
        <label
          className="mb-1 block font-medium text-gray-700 text-sm"
          htmlFor="product-price"
        >
          Giá (VND)
        </label>
        <input
          className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 ${
            errors.price
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-orange-400"
          }`}
          disabled={loading}
          id="product-price"
          min="15001"
          onChange={(e) => {
            setPrice(e.target.value);
            setErrors((prev) => ({ ...prev, price: undefined }));
          }}
          required
          type="number"
          value={price}
        />
        {errors.price && (
          <p className="mt-1 text-red-500 text-xs">{errors.price}</p>
        )}
      </div>

      {/* Category & SubCategory */}
      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="product-category"
          >
            Danh mục
          </label>
          <select
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.category
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-400"
            }`}
            disabled={loading}
            id="product-category"
            onChange={(e) => {
              setCategory(e.target.value);
              setErrors((prev) => ({ ...prev, category: undefined }));
            }}
            value={category}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {categoryLabels[c]}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-red-500 text-xs">{errors.category}</p>
          )}
        </div>
        <div>
          <label
            className="mb-1 block font-medium text-gray-700 text-sm"
            htmlFor="product-subcategory"
          >
            Loại
          </label>
          <select
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              errors.subCategory
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-orange-400"
            }`}
            disabled={loading}
            id="product-subcategory"
            onChange={(e) => {
              setSubCategory(e.target.value);
              setErrors((prev) => ({ ...prev, subCategory: undefined }));
            }}
            value={subCategory}
          >
            {subCategories.map((s) => (
              <option key={s} value={s}>
                {subCategoryLabels[s]}
              </option>
            ))}
          </select>
          {errors.subCategory && (
            <p className="mt-1 text-red-500 text-xs">{errors.subCategory}</p>
          )}
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-4">
        <label
          className="mb-2 block font-medium text-gray-700 text-sm"
          htmlFor="product-sizes"
        >
          Kích thước
        </label>
        <div className="flex flex-wrap gap-2">
          {sizesList.map((size) => (
            <button
              className={`rounded-md border px-3 py-1.5 text-sm transition-colors ${
                loading
                  ? "cursor-not-allowed border-gray-200 text-gray-400 opacity-50"
                  : sizes.includes(size)
                    ? "cursor-pointer border-orange-500 bg-orange-50 text-orange-600"
                    : "cursor-pointer border-gray-300 text-gray-600 hover:border-gray-400"
              }`}
              disabled={loading}
              key={size}
              onClick={() => handleSizeToggle(size)}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
        {errors.sizes && (
          <p className="mt-1 text-red-500 text-xs">{errors.sizes}</p>
        )}
      </div>

      {/* Bestseller */}
      <div className="mb-6">
        <label className="flex cursor-pointer items-center gap-2">
          <input
            checked={bestseller}
            className="h-4 w-4 accent-orange-500 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            onChange={(e) => setBestseller(e.target.checked)}
            type="checkbox"
          />
          <span className="font-medium text-gray-700 text-sm">Bán chạy</span>
        </label>
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3">
        <button
          className="cursor-pointer rounded-md bg-black px-6 py-2.5 font-medium text-sm text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading
            ? isEdit
              ? "Đang cập nhật..."
              : "Đang thêm..."
            : isEdit
              ? "Cập nhật sản phẩm"
              : "Thêm sản phẩm"}
        </button>
        <button
          className="cursor-pointer rounded-md border border-gray-300 px-6 py-2.5 font-medium text-sm transition-colors hover:bg-gray-50"
          onClick={() => navigate("/list")}
          type="button"
        >
          Hủy
        </button>
      </div>
    </form>
  );
};

export default Add;
