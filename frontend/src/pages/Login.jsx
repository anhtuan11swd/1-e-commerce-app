import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useShop from "../context/useShop";
import { loginSchema, registerSchema } from "../utils/validation";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { setToken, token } = useShop();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const validateForm = () => {
    const schema = currentState === "Login" ? loginSchema : registerSchema;
    const result = schema.safeParse({ email, name, password });

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
      const url =
        currentState === "Login"
          ? `${backendUrl}/api/v1/user/login`
          : `${backendUrl}/api/v1/user/register`;

      const body =
        currentState === "Login"
          ? { email, password }
          : { email, name, password };

      const { data } = await axios.post(url, body);

      if (data.success) {
        if (currentState === "Login") {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Đăng nhập thành công", {
            duration: 2000,
            position: "top-center",
          });
        } else {
          toast.success("Đăng ký thành công, vui lòng đăng nhập", {
            duration: 2000,
            position: "top-center",
          });
          setCurrentState("Login");
          setEmail("");
          setPassword("");
          setErrors({});
        }
      } else {
        toast.error(data.message || "Đã có lỗi xảy ra", {
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

  const getInputClass = (field) =>
    `w-full border px-4 py-3 text-sm outline-none ${
      loading
        ? "pointer-events-none cursor-not-allowed border-gray-300 opacity-50"
        : errors[field]
          ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
          : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
    }`;

  return (
    <div className="flex items-center justify-center px-5 py-10">
      <form
        className="flex w-full max-w-md flex-col gap-5"
        onSubmit={onSubmitHandler}
      >
        <div className="mb-4 flex flex-col items-center gap-2">
          <p className="font-light text-3xl">
            {currentState === "Login" ? "Đăng nhập" : "Đăng ký"}
          </p>
          <div className="h-[1px] w-16 bg-gray-400" />
        </div>

        {currentState !== "Login" && (
          <div>
            <input
              className={getInputClass("name")}
              disabled={loading}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Tên"
              type="text"
              value={name}
            />
            {errors.name && (
              <p className="mt-1 text-red-500 text-xs">{errors.name}</p>
            )}
          </div>
        )}

        <div>
          <input
            className={getInputClass("email")}
            disabled={loading}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            placeholder="Email"
            type="email"
            value={email}
          />
          {errors.email && (
            <p className="mt-1 text-red-500 text-xs">{errors.email}</p>
          )}
        </div>

        <div>
          <div className="relative">
            <input
              className={`w-full border px-4 py-3 pr-10 text-sm outline-none ${
                loading
                  ? "pointer-events-none cursor-not-allowed border-gray-300 opacity-50"
                  : errors.password
                    ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-300 focus:border-black focus:ring-1 focus:ring-black"
              }`}
              disabled={loading}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              placeholder="Mật khẩu"
              type={showPassword ? "text" : "password"}
              value={password}
            />
            <button
              className={`absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 ${
                loading
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={loading}
              onClick={() => setShowPassword(!showPassword)}
              type="button"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <p
            className={`${
              loading
                ? "pointer-events-none cursor-not-allowed opacity-50"
                : "cursor-pointer hover:text-black"
            }`}
          >
            Quên mật khẩu?
          </p>
          {currentState === "Login" ? (
            <button
              className={`bg-transparent ${
                loading
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:text-black"
              }`}
              disabled={loading}
              onClick={() => {
                setCurrentState("Sign Up");
                setErrors({});
              }}
              type="button"
            >
              Tạo tài khoản
            </button>
          ) : (
            <button
              className={`bg-transparent ${
                loading
                  ? "pointer-events-none cursor-not-allowed opacity-50"
                  : "cursor-pointer hover:text-black"
              }`}
              disabled={loading}
              onClick={() => {
                setCurrentState("Login");
                setErrors({});
              }}
              type="button"
            >
              Đăng nhập
            </button>
          )}
        </div>

        <button
          className="mt-2 w-full cursor-pointer bg-black px-6 py-3 text-sm text-white active:bg-gray-700 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          disabled={loading}
          type="submit"
        >
          {loading
            ? "Đang xử lý..."
            : currentState === "Login"
              ? "Đăng nhập"
              : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default Login;
