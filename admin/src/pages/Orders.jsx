import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import adminApi from "../config/adminApi";

const currency = "₫";

const statusMap = {
  Delivered: "Đã giao hàng",
  "Order Placed": "Đã đặt hàng",
  "Out for delivery": "Đang trên đường giao",
  Packing: "Đang đóng gói",
  Shipped: "Đang giao hàng",
};

const statusOptions = Object.keys(statusMap);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAllOrders = async () => {
    try {
      const { data } = await adminApi.post("/order/list");
      if (data.success) {
        setOrders(data.orders);
      } else {
        toast.error(data.message || "Lỗi tải đơn hàng", {
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

  const statusHandler = async (orderId, status) => {
    try {
      const { data } = await adminApi.post("/order/status", {
        orderId,
        status,
      });
      if (data.success) {
        toast.success("Cập nhật trạng thái thành công", {
          duration: 2000,
          position: "top-center",
        });
        fetchAllOrders();
      } else {
        toast.error(data.message || "Lỗi cập nhật", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch {
      toast.error("Lỗi kết nối server", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const { data } = await adminApi.post("/order/list");
        if (data.success) {
          setOrders(data.orders);
        } else {
          toast.error(data.message || "Lỗi tải đơn hàng", {
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
    loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="mb-4 font-semibold text-xl">Quản lý đơn hàng</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400">Chưa có đơn hàng nào.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order, index) => (
            <div
              className="border border-gray-200 p-4"
              key={order._id || index}
            >
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="text-gray-500 text-sm">
                  <p>
                    Mã đơn:{" "}
                    <span className="font-medium text-black">{order._id}</span>
                  </p>
                  <p>
                    Ngày: {new Date(order.date).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <select
                  className="cursor-pointer border border-gray-300 px-3 py-2 text-sm"
                  onChange={(e) => statusHandler(order._id, e.target.value)}
                  value={order.status}
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>
                      {statusMap[status]}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3 border-gray-200 border-t pt-3">
                <p className="mb-1 font-medium text-sm">Khách hàng</p>
                <p className="text-gray-500 text-sm">{order.address?.name}</p>
                <p className="text-gray-500 text-sm">
                  {order.address?.street}, {order.address?.district},{" "}
                  {order.address?.city}
                </p>
                <p className="text-gray-500 text-sm">
                  SĐT: {order.address?.phone}
                </p>
              </div>

              <div className="border-gray-200 border-t pt-3">
                <p className="mb-2 font-medium text-sm">Sản phẩm</p>
                {order.items?.map((item) => (
                  <div
                    className="flex items-center gap-3 py-1 text-sm"
                    key={`${item.productId}-${item.size}`}
                  >
                    <img
                      alt={item.name}
                      className="w-10 object-contain"
                      src={item.image}
                    />
                    <p className="flex-1">
                      {item.name} x {item.quantity} ({item.size})
                    </p>
                    <p className="font-medium">
                      {item.price?.toLocaleString("vi-VN")}
                      {currency}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between border-gray-200 border-t pt-3 text-sm">
                <p>
                  Tổng:{" "}
                  <span className="font-medium">
                    {order.amount?.toLocaleString("vi-VN")}
                    {currency}
                  </span>
                </p>
                <p>
                  Thanh toán:{" "}
                  <span className="font-medium">
                    {order.paymentMethod === "cod"
                      ? "Tiền mặt"
                      : order.paymentMethod === "stripe"
                        ? "Stripe"
                        : order.paymentMethod}
                  </span>
                </p>
                <p>
                  Trạng thái:{" "}
                  <span
                    className={`font-medium ${
                      order.payment ? "text-green-600" : "text-orange-500"
                    }`}
                  >
                    {order.payment ? "Đã thanh toán" : "Chưa thanh toán"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
