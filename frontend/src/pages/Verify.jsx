import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import useShop from "../context/useShop";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Verify = () => {
  const { token } = useShop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!token || !orderId || !success) return;

    const verifyPayment = async () => {
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/v1/order/verifyStripe`,
          { orderId, success },
          { headers: { token } },
        );
        if (data.success) {
          toast.success("Thanh toán thành công", {
            duration: 2000,
            position: "top-center",
          });
          navigate("/orders");
        } else {
          toast.error("Thanh toán thất bại", {
            duration: 2000,
            position: "top-center",
          });
          navigate("/cart");
        }
      } catch {
        toast.error("Lỗi xác nhận thanh toán", {
          duration: 2000,
          position: "top-center",
        });
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [navigate, orderId, success, token]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-black" />
    </div>
  );
};

export default Verify;
