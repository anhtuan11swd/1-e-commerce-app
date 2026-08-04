import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

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
          <input
            className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
            placeholder="Tên"
            required
            type="text"
          />
        )}

        <input
          className="w-full border border-gray-300 px-4 py-3 text-sm outline-none"
          placeholder="Email"
          required
          type="email"
        />

        <div className="relative">
          <input
            className="w-full border border-gray-300 px-4 py-3 pr-10 text-sm outline-none"
            placeholder="Mật khẩu"
            required
            type={showPassword ? "text" : "password"}
          />
          <button
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
            type="button"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <p className="hover:text-black">Quên mật khẩu?</p>
          {currentState === "Login" ? (
            <button
              className="cursor-pointer bg-transparent hover:text-black"
              onClick={() => setCurrentState("Sign Up")}
              type="button"
            >
              Tạo tài khoản
            </button>
          ) : (
            <button
              className="cursor-pointer bg-transparent hover:text-black"
              onClick={() => setCurrentState("Login")}
              type="button"
            >
              Đăng nhập
            </button>
          )}
        </div>

        <button
          className="mt-2 w-full cursor-pointer bg-black px-6 py-3 text-sm text-white active:bg-gray-700"
          type="submit"
        >
          {currentState === "Login" ? "Đăng nhập" : "Đăng ký"}
        </button>
      </form>
    </div>
  );
};

export default Login;
