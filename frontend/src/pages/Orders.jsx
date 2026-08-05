import { useEffect, useState } from "react";
import Title from "../components/Title";
import useShop from "../context/useShop";

const statusMap = {
  Delivered: "Đã giao hàng",
  "Order Placed": "Đã đặt hàng",
  "Out for delivery": "Đang trên đường giao",
  Packing: "Đang đóng gói",
  Shipped: "Đang giao hàng",
};

const Orders = () => {
  const { currency, fetchOrders, token } = useShop();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!token) return;
    const loadOrders = async () => {
      const data = await fetchOrders();
      if (data.success) {
        setOrders(data.orders);
      }
    };
    loadOrders();
  }, [fetchOrders, token]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <Title text1="ĐƠN HÀNG" text2="CỦA TÔI" />
      </div>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div
              className="flex flex-col gap-4 border border-gray-200 p-4"
              key={order._id || index}
            >
              {order.items.map((item) => (
                <div
                  className="flex items-center gap-4"
                  key={`${item.productId}-${item.size}`}
                >
                  <img
                    alt={item.name}
                    className="w-16 object-contain"
                    src={item.image}
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item.price?.toLocaleString("vi-VN")}
                      {currency} x {item.quantity} Size {item.size}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap items-center justify-between gap-3 border-gray-200 border-t pt-3">
                <div className="text-gray-500 text-sm">
                  <p>
                    Ngày đặt: {new Date(order.date).toLocaleDateString("vi-VN")}
                  </p>
                  <p>
                    Thanh toán:{" "}
                    {order.paymentMethod === "cod" ? "Tiền mặt" : "Stripe"}
                  </p>
                  <p>
                    Tổng:{" "}
                    <span className="font-medium text-black">
                      {order.amount?.toLocaleString("vi-VN")}
                      {currency}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <p>{statusMap[order.status] || order.status}</p>
                  </div>
                  <button
                    className="cursor-pointer border border-gray-300 px-4 py-2 font-medium text-sm active:bg-gray-100"
                    type="button"
                  >
                    Theo dõi đơn hàng
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
