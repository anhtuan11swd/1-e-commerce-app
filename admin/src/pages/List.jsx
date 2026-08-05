import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import adminApi from "../config/adminApi";

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

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    let cancelled = false;

    const fetchProducts = async () => {
      try {
        const { data } = await adminApi.get("/product/list");
        if (!cancelled && data.success) {
          setProducts(data.products);
        } else if (!cancelled) {
          toast.error("Lỗi khi tải danh sách sản phẩm", {
            duration: 2000,
            position: "top-center",
          });
        }
      } catch {
        if (!cancelled) {
          toast.error("Lỗi kết nối server", {
            duration: 2000,
            position: "top-center",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const removedProduct = deleteTarget;
    const removedIndex = products.findIndex(
      (p) => p._id === removedProduct._id,
    );

    setProducts((prev) => prev.filter((p) => p._id !== removedProduct._id));
    setDeleteTarget(null);

    try {
      const { data } = await adminApi.post("/product/remove", {
        id: removedProduct._id,
      });
      if (data.success) {
        toast.success("Sản phẩm đã được xóa thành công", {
          duration: 2000,
          position: "top-center",
        });
      } else {
        setProducts((prev) => {
          const updated = [...prev];
          updated.splice(removedIndex, 0, removedProduct);
          return updated;
        });
        toast.error(data.message || "Lỗi khi xóa sản phẩm", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch {
      setProducts((prev) => {
        const updated = [...prev];
        updated.splice(removedIndex, 0, removedProduct);
        return updated;
      });
      toast.error("Lỗi kết nối server", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-10">
        <span className="text-gray-400">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 font-semibold text-xl">Danh sách sản phẩm</h2>

      {products.length === 0 ? (
        <p className="text-gray-400">Chưa có sản phẩm nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-gray-200 border-b bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Ảnh</th>
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Danh mục</th>
                <th className="px-4 py-3">Loại</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  className="border-gray-100 border-b transition-colors hover:bg-gray-50"
                  key={product._id}
                >
                  <td className="px-4 py-3">
                    <img
                      alt=""
                      className="h-12 w-12 rounded object-cover"
                      src={product.image[0]}
                    />
                  </td>
                  <td className="px-4 py-3 font-medium">{product.name}</td>
                  <td className="px-4 py-3 text-gray-500">
                    {categoryLabels[product.category]}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {subCategoryLabels[product.subCategory]}
                  </td>
                  <td className="px-4 py-3">
                    {product.price.toLocaleString("vi-VN")}₫
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="cursor-pointer text-blue-500 transition-colors hover:text-blue-700"
                        onClick={() => navigate(`/add/${product._id}`)}
                        type="button"
                      >
                        Sửa
                      </button>
                      <span className="text-gray-300">|</span>
                      <button
                        className="cursor-pointer text-red-500 transition-colors hover:text-red-700"
                        onClick={() => setDeleteTarget(product)}
                        type="button"
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 font-semibold text-lg">Xác nhận xóa</h3>
            <p className="mb-1 text-gray-600 text-sm">
              Bạn có chắc muốn xóa sản phẩm này?
            </p>
            <p className="mb-5 truncate font-medium text-sm">
              {deleteTarget.name}
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                Hủy
              </button>
              <button
                className="cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm text-white transition-colors hover:bg-red-600"
                onClick={confirmDelete}
                type="button"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
