import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { backendURL } from "../config/adminApi";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${backendURL}/api/v1/user/admin`, {
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        toast.success("Đăng nhập thành công", {
          duration: 2000,
          position: "top-center",
        });
      } else {
        toast.error(data.message || "Thông tin đăng nhập không hợp lệ", {
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
        <div className="mb-6 text-center">
          <h1 className="font-bold text-2xl">Admin Panel</h1>
          <p className="mt-1 text-gray-500 text-sm">Đăng nhập để quản trị</p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="login-email"
            >
              Email
            </label>
            <input
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={loading}
              id="login-email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label
              className="mb-1 block font-medium text-gray-700 text-sm"
              htmlFor="login-password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm outline-none transition-colors focus:border-orange-400 focus:ring-1 focus:ring-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                id="login-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <button
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
                onClick={() => setShowPassword(!showPassword)}
                type="button"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          <button
            className="mt-2 w-full cursor-pointer rounded-md bg-black py-2.5 font-medium text-sm text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={loading}
            type="submit"
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
