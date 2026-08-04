import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import useShop from "../context/useShop";

const Cart = () => {
  const { cartItems, currency, products, updateQuantity } = useShop();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const cartData = useMemo(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            quantity: cartItems[items][item],
            size: item,
          });
        }
      }
    }
    return tempData;
  }, [cartItems]);

  const confirmDelete = () => {
    if (deleteTarget) {
      updateQuantity(deleteTarget._id, deleteTarget.size, 0);
      setDeleteTarget(null);
      toast.success("Đã xóa sản phẩm khỏi giỏ hàng");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <Title text1="GIỎ" text2="HÀNG" />
      </div>

      {cartData.length === 0 ? (
        <div className="flex flex-col items-center gap-4 py-20">
          <p className="text-gray-500 text-sm">Giỏ hàng trống</p>
          <button
            className="cursor-pointer bg-black px-6 py-3 text-sm text-white active:bg-gray-700"
            onClick={() => window.history.back()}
            type="button"
          >
            TIẾP TỤC MUA SẮM
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          {/* Cart Items */}
          <div className="flex flex-1 flex-col gap-4">
            {cartData.map((item) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;

              return (
                <div
                  className="flex items-center gap-4 border-gray-200 border-b py-4"
                  key={`${item._id}-${item.size}`}
                >
                  <img
                    alt={productData.name}
                    className="w-16 object-contain"
                    src={productData.image[0]}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-medium text-sm">{productData.name}</p>
                    <p className="text-gray-500 text-sm">
                      {productData.price.toLocaleString("vi-VN")}
                      {currency}
                    </p>
                    <p className="text-gray-500 text-sm">Size: {item.size}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      className="w-16 border border-gray-300 px-2 py-1 text-center text-sm outline-none"
                      min={1}
                      onChange={(e) =>
                        updateQuantity(
                          item._id,
                          item.size,
                          Number(e.target.value),
                        )
                      }
                      type="number"
                      value={item.quantity}
                    />
                    <button
                      className="cursor-pointer bg-transparent p-0"
                      onClick={() => setDeleteTarget(item)}
                      type="button"
                    >
                      <img alt="Xóa" className="w-5" src={assets.bin_icon} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Cart Total */}
          <div className="flex justify-end">
            <CartTotal />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h3 className="mb-2 font-medium text-lg">Xác nhận xóa</h3>
            <p className="mb-6 text-gray-500 text-sm">
              Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?
            </p>
            <div className="flex justify-end gap-3">
              <button
                className="cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm"
                onClick={() => setDeleteTarget(null)}
                type="button"
              >
                Hủy
              </button>
              <button
                className="cursor-pointer rounded-md bg-black px-4 py-2 text-sm text-white active:bg-gray-700"
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

export default Cart;
