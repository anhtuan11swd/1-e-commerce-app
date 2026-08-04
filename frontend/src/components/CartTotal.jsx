import { useNavigate } from "react-router-dom";
import useShop from "../context/useShop";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useShop();
  const navigate = useNavigate();

  const total = getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee;

  return (
    <div className="flex w-full flex-col gap-3 border-gray-200 border-t pt-6 sm:w-96">
      <div className="flex justify-between text-sm">
        <p className="text-gray-500">Tạm tính</p>
        <p className="font-medium">
          {getCartAmount().toLocaleString("vi-VN")}
          {currency}
        </p>
      </div>
      <div className="flex justify-between text-sm">
        <p className="text-gray-500">Phí vận chuyển</p>
        <p className="font-medium">
          {delivery_fee.toLocaleString("vi-VN")}
          {currency}
        </p>
      </div>
      <hr className="border-gray-200" />
      <div className="flex justify-between text-sm">
        <p className="font-medium">Tổng thanh toán</p>
        <p className="font-medium">
          {total.toLocaleString("vi-VN")}
          {currency}
        </p>
      </div>
      <button
        className="mt-2 w-full cursor-pointer bg-black px-6 py-3 text-sm text-white active:bg-gray-700"
        onClick={() => navigate("/place-order")}
        type="button"
      >
        TIẾN HÀNH THANH TOÁN
      </button>
    </div>
  );
};

export default CartTotal;
