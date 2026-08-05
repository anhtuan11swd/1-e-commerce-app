import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import Title from "../components/Title";
import useShop from "../context/useShop";
import { placeOrderSchema } from "../utils/validation";

const PlaceOrder = () => {
  const { user } = useShop();
  const [method, setMethod] = useState("cod");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const result = placeOrderSchema.safeParse({
      address,
      city,
      district,
      email: user?.email || "",
      name: user?.name || "",
      phone,
      postalCode,
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

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // TODO: call place order API
      toast.success("Đặt hàng thành công", {
        duration: 2000,
        position: "top-center",
      });
      navigate("/orders");
    } catch {
      toast.error("Lỗi kết nối server", {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInputClass = (field) =>
    `w-full border px-4 py-3 text-sm outline-none ${
      loading
        ? "pointer-events-none cursor-not-allowed border-gray-300 opacity-50"
        : errors[field]
          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
    }`;

  return (
    <form
      className="mx-auto flex max-w-7xl flex-col gap-10 px-5 py-10 sm:px-8 lg:flex-row lg:gap-20"
      onSubmit={onSubmitHandler}
    >
      {/* Left Side - Delivery Information */}
      <div className="flex flex-1 flex-col gap-4">
        <Title text1="THÔNG TIN" text2="GIAO HÀNG" />

        <div>
          <input
            className={`${getInputClass("name")} cursor-not-allowed bg-gray-50`}
            disabled
            placeholder="Họ và tên"
            type="text"
            value={user?.name || ""}
          />
          {errors.name && (
            <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
          )}
        </div>

        <div>
          <input
            className={`${getInputClass("email")} cursor-not-allowed bg-gray-50`}
            disabled
            placeholder="Email"
            type="email"
            value={user?.email || ""}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            className={getInputClass("address")}
            disabled={loading}
            onChange={(e) => {
              setAddress(e.target.value);
              setErrors((prev) => ({ ...prev, address: undefined }));
            }}
            placeholder="Địa chỉ"
            type="text"
            value={address}
          />
          {errors.address && (
            <p className="mt-1 text-red-500 text-xs">{errors.address}</p>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              className={getInputClass("city")}
              disabled={loading}
              onChange={(e) => {
                setCity(e.target.value);
                setErrors((prev) => ({ ...prev, city: undefined }));
              }}
              placeholder="Thành phố"
              type="text"
              value={city}
            />
            {errors.city && (
              <p className="mt-1 text-red-500 text-xs">{errors.city}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              className={getInputClass("district")}
              disabled={loading}
              onChange={(e) => {
                setDistrict(e.target.value);
                setErrors((prev) => ({ ...prev, district: undefined }));
              }}
              placeholder="Quận/Huyện"
              type="text"
              value={district}
            />
            {errors.district && (
              <p className="mt-1 text-red-500 text-xs">{errors.district}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <input
              className={getInputClass("postalCode")}
              disabled={loading}
              inputMode="numeric"
              maxLength={6}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                setPostalCode(val);
                setErrors((prev) => ({ ...prev, postalCode: undefined }));
              }}
              placeholder="Mã bưu điện"
              type="text"
              value={postalCode}
            />
            {errors.postalCode && (
              <p className="mt-1 text-red-500 text-xs">{errors.postalCode}</p>
            )}
          </div>
          <div className="flex-1">
            <input
              className={getInputClass("phone")}
              disabled={loading}
              inputMode="numeric"
              maxLength={10}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setPhone(val);
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              placeholder="Số điện thoại"
              type="text"
              value={phone}
            />
            {errors.phone && (
              <p className="mt-1 text-red-500 text-xs">{errors.phone}</p>
            )}
          </div>
        </div>
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
              className={`flex items-center gap-3 border p-4 ${
                loading
                  ? "pointer-events-none cursor-not-allowed border-gray-300 opacity-50"
                  : "cursor-pointer" +
                    (
                      method === "stripe"
                        ? "border-green-500"
                        : "border-gray-300"
                    )
              }`}
              disabled={loading}
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
              className={`flex items-center gap-3 border p-4 ${
                loading
                  ? "pointer-events-none cursor-not-allowed border-gray-300 opacity-50"
                  : "cursor-pointer" +
                    (method === "cod" ? "border-green-500" : "border-gray-300")
              }`}
              disabled={loading}
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
            className="mt-4 w-full cursor-pointer bg-black px-6 py-3 text-sm text-white active:bg-gray-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Đang xử lý..." : "ĐẶT HÀNG"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
