import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    navigate("/orders");
  };

  return (
    <form
      className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-10 sm:px-8 lg:flex-row lg:gap-20"
      onSubmit={onSubmitHandler}
    >
      {/* Left Side - Delivery Information */}
      <div className="flex flex-1 flex-col gap-4">
        <Title text1="THÔNG TIN" text2="GIAO HÀNG" />

        <input
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
          placeholder="Họ và tên"
          required
          type="text"
        />

        <input
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
          placeholder="Email"
          required
          type="email"
        />
        <input
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
          placeholder="Địa chỉ"
          required
          type="text"
        />

        <div className="flex gap-4">
          <input
            className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="Thành phố"
            required
            type="text"
          />
          <input
            className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="Quận/Huyện"
            required
            type="text"
          />
        </div>

        <input
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
          placeholder="Mã bưu điện"
          required
          type="text"
        />

        <input
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
          placeholder="Số điện thoại"
          required
          type="text"
        />
      </div>

      {/* Right Side - Cart Total & Payment */}
      <div className="flex w-full flex-col gap-6 lg:w-96">
        <CartTotal />

        {/* Payment Method */}
        <div className="flex flex-col gap-4">
          <Title text1="PHƯƠNG THỨC" text2="THANH TOÁN" />

          <div className="flex flex-col gap-3">
            {/* Stripe */}
            <button
              className={`flex cursor-pointer items-center gap-3 border p-4 ${
                method === "stripe" ? "border-green-500" : "border-gray-300"
              }`}
              onClick={() => setMethod("stripe")}
              type="button"
            >
              <div
                className={`h-3.5 w-3.5 rounded-full border ${
                  method === "stripe"
                    ? "border-4 border-green-500"
                    : "border-gray-400"
                }`}
              />
              <img alt="Stripe" className="h-5" src={assets.stripe_logo} />
            </button>

            {/* Cash on Delivery */}
            <button
              className={`flex cursor-pointer items-center gap-3 border p-4 ${
                method === "cod" ? "border-green-500" : "border-gray-300"
              }`}
              onClick={() => setMethod("cod")}
              type="button"
            >
              <div
                className={`h-3.5 w-3.5 rounded-full border ${
                  method === "cod"
                    ? "border-4 border-green-500"
                    : "border-gray-400"
                }`}
              />
              <p className="text-sm">Thanh toán khi nhận hàng</p>
            </button>
          </div>

          <button
            className="mt-4 w-full cursor-pointer bg-black px-6 py-3 text-sm text-white active:bg-gray-700"
            type="submit"
          >
            ĐẶT HÀNG
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
