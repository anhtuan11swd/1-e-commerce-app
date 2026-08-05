import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const menuItems = [
  { icon: assets.add_icon, label: "Thêm sản phẩm", to: "/add" },
  { icon: assets.order_icon, label: "Danh sách sản phẩm", to: "/list" },
  { icon: assets.parcel_icon, label: "Đơn hàng", to: "/orders" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <button
          aria-label="Close menu"
          className="fixed inset-0 z-40 cursor-pointer bg-black/40 md:hidden"
          onClick={onClose}
          type="button"
        />
      )}

      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 shrink-0 border-gray-200 border-r bg-white pt-16 transition-transform duration-300 md:sticky md:top-[57px] md:h-[calc(100vh-57px)] md:translate-x-0 md:pt-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4">
          {menuItems.map(({ icon, label, to }) => (
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-orange-50 font-semibold text-orange-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`
              }
              key={to}
              onClick={onClose}
              to={to}
            >
              <img alt="" className="w-5" src={icon} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
