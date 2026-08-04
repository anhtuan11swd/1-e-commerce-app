import Title from "../components/Title";
import useShop from "../context/useShop";

const Orders = () => {
  const { products, currency } = useShop();
  const sampleOrders = products.slice(1, 4);

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="mb-8">
        <Title text1="ĐƠN HÀNG" text2="CỦA TÔI" />
      </div>

      <div className="flex flex-col gap-4">
        {sampleOrders.map((item, index) => (
          <div
            className="flex flex-col items-start gap-4 border border-gray-200 p-4 sm:flex-row sm:items-center"
            key={item._id}
          >
            <img
              alt={item.name}
              className="w-16 object-contain"
              src={item.image[0]}
            />
            <div className="flex flex-1 flex-col gap-1">
              <p className="font-medium text-sm">{item.name}</p>
              <p className="text-gray-500 text-sm">
                {item.price.toLocaleString("vi-VN")}
                {currency} x {index + 1} Size {item.sizes[0]}
              </p>
              <p className="text-gray-500 text-sm">
                Ngày đặt: {new Date().toDateString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p>Sẵn sàng giao hàng</p>
              </div>
              <button
                className="cursor-pointer border border-gray-300 px-4 py-2 font-medium text-sm active:bg-gray-100"
                type="button"
              >
                Theo dõi đơn hàng
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
