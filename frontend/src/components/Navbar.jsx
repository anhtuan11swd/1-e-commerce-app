import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import useShop from "../context/useShop";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "TRANG CHỦ", to: "/" },
  { label: "BỘ SƯU TẬP", to: "/collection" },
  { label: "VỀ CHÚNG TÔI", to: "/about" },
  { label: "LIÊN HỆ", to: "/contact" },
];

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { getCartCount, logout, showSearch, setShowSearch, token } = useShop();
  const navigate = useNavigate();

  const desktopLinkClass = ({ isActive }) =>
    isActive
      ? "active flex flex-col items-center gap-1"
      : "flex flex-col items-center gap-1";

  return (
    <div className="relative z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <Link to="/">
          <img alt="Forever logo" className="w-36" src={assets.logo} />
        </Link>

        <ul className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavLink className={desktopLinkClass} to={to}>
                {label}
                <hr className="hidden h-[1.5px] w-2/4 border-none bg-black" />
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <img
            alt="Search"
            className="w-5 cursor-pointer"
            onClick={() => {
              setShowSearch(true);
              navigate("/collection");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setShowSearch(true);
                navigate("/collection");
              }
            }}
            src={assets.search_icon}
          />

          <div className="group relative">
            <img
              alt="Profile"
              className="w-5 cursor-pointer"
              onClick={() => {
                if (!token) navigate("/login");
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !token) navigate("/login");
              }}
              src={assets.profile_icon}
            />
            {token && (
              <div className="absolute right-0 z-10 hidden pt-4 group-hover:block">
                <div className="flex w-32 flex-col gap-2 rounded bg-gray-100 px-5 py-3 text-gray-700 text-sm">
                  <p className="cursor-pointer hover:text-black">
                    Hồ sơ của tôi
                  </p>
                  <Link to="/orders">
                    <p className="cursor-pointer hover:text-black">Đơn hàng</p>
                  </Link>
                  <button
                    className="cursor-pointer bg-transparent text-left hover:text-black"
                    onClick={logout}
                    type="button"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            )}
          </div>

          <Link className="relative" to="/cart">
            <img alt="Cart" className="w-5 min-w-5" src={assets.cart_icon} />
            {getCartCount() > 0 && (
              <p className="absolute -right-2 -bottom-2 flex h-4 w-4 items-center justify-center rounded-full bg-black text-center text-[10px] text-white leading-none">
                {getCartCount()}
              </p>
            )}
          </Link>

          <button
            aria-label="Open menu"
            className="md:hidden"
            onClick={() => setVisible(true)}
            type="button"
          >
            <img alt="" className="w-5 cursor-pointer" src={assets.menu_icon} />
          </button>
        </div>
      </div>

      {showSearch && <SearchBar />}

      {visible && (
        <button
          aria-label="Close menu"
          className="absolute inset-0 z-40 bg-black/40"
          onClick={() => setVisible(false)}
          type="button"
        />
      )}

      <div
        className={`absolute top-0 left-0 z-50 h-screen overflow-hidden bg-white transition-all duration-300 ease-in-out ${
          visible ? "w-64" : "w-0"
        }`}
      >
        <div className="flex flex-col p-4">
          <div className="mb-6 flex items-center gap-4">
            <button
              aria-label="Close menu"
              className="cursor-pointer"
              onClick={() => setVisible(false)}
              type="button"
            >
              <img
                alt=""
                className="w-3 rotate-180"
                src={assets.dropdown_icon}
              />
            </button>
            <img alt="Forever logo" className="w-36" src={assets.logo} />
          </div>

          <nav className="flex flex-col gap-3 text-lg">
            {navLinks.map(({ to, label }) => (
              <NavLink
                className={({ isActive }) =>
                  `border-l-2 py-2 pl-4 transition-colors ${
                    isActive
                      ? "border-black font-semibold"
                      : "border-transparent"
                  }`
                }
                key={to}
                onClick={() => setVisible(false)}
                to={to}
              >
                {label}
              </NavLink>
            ))}
            {token && (
              <NavLink
                className={({ isActive }) =>
                  `border-l-2 py-2 pl-4 transition-colors ${
                    isActive
                      ? "border-black font-semibold"
                      : "border-transparent"
                  }`
                }
                onClick={() => setVisible(false)}
                to="/orders"
              >
                ĐƠN HÀNG
              </NavLink>
            )}
          </nav>

          <div className="mt-6 border-gray-200 border-t pt-4">
            {token ? (
              <button
                className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                onClick={() => {
                  logout();
                  setVisible(false);
                }}
                type="button"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                className="w-full cursor-pointer rounded-md bg-black px-4 py-2 text-sm text-white transition-colors hover:bg-gray-800"
                onClick={() => {
                  navigate("/login");
                  setVisible(false);
                }}
                type="button"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
