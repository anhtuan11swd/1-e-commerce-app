import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    toast.success("Đăng xuất thành công", {
      duration: 2000,
      position: "top-center",
    });
  };

  return (
    <div className="sticky top-0 z-30 flex items-center justify-between border-gray-200 border-b bg-white px-4 py-3 sm:px-8">
      <div className="flex items-center gap-3">
        <img alt="Logo" className="w-10" src={assets.logo} />
        <span className="font-semibold text-lg">Admin Panel</span>
      </div>
      <button
        className="cursor-pointer rounded-md bg-black px-5 py-2 text-sm text-white transition-colors hover:bg-gray-800"
        onClick={handleLogout}
        type="button"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Navbar;
