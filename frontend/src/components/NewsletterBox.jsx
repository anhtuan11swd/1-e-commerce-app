import { useState } from "react";
import toast from "react-hot-toast";
import { newsletterSchema } from "../utils/validation";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const result = newsletterSchema.safeParse({ email });
    if (!result.success) {
      setError(result.error.issues[0].message);
      return;
    }

    setError("");
    toast.success("Đăng ký thành công", {
      duration: 2000,
      position: "top-center",
    });
    setEmail("");
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="flex flex-col items-center gap-4 bg-gray-50 py-10 text-center">
        <p className="font-medium text-2xl text-gray-800">
          ĐĂNG KÝ NHẬN BẢN TIN
        </p>
        <p className="text-gray-500 text-sm">
          Đăng ký để nhận thông tin mới nhất về sản phẩm và ưu đãi đặc biệt.
        </p>
        <form
          className="flex w-full max-w-md flex-col gap-2"
          onSubmit={onSubmitHandler}
        >
          <div className="flex gap-2">
            <div className="flex-1">
              <input
                className={`w-full rounded-md border px-4 py-2 text-sm outline-none ${
                  error
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
                }`}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="Nhập địa chỉ email của bạn"
                type="email"
                value={email}
              />
            </div>
            <button
              className="shrink-0 cursor-pointer rounded-md bg-gray-800 px-6 py-2 text-sm text-white transition-colors hover:bg-gray-700"
              type="submit"
            >
              ĐĂNG KÝ
            </button>
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default NewsletterBox;
