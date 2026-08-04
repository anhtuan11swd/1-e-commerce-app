import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <hr className="border-gray-300" />
      <div className="grid grid-cols-1 gap-8 py-8 sm:grid-cols-3">
        {/* Column 1 - Logo & Description */}
        <div>
          <Link to="/">
            <img alt="Forever logo" className="mb-4 w-36" src={assets.logo} />
          </Link>
          <p className="max-w-xs text-gray-500 text-sm leading-relaxed">
            Forever - Thương hiệu thời trang hàng đầu Việt Nam. Chúng tôi mang
            đến những sản phẩm chất lượng cao với phong cách hiện đại và tinh
            tế.
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <p className="mb-4 font-medium text-gray-800 text-sm">
            LIÊN KẾT NHANH
          </p>
          <ul className="flex flex-col gap-2 text-gray-500 text-sm">
            <li>
              <Link className="transition-colors hover:text-gray-800" to="/">
                Trang chủ
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-gray-800"
                to="/collection"
              >
                Bộ sưu tập
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-gray-800"
                to="/about"
              >
                Về chúng tôi
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-gray-800"
                to="/contact"
              >
                Liên hệ
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact */}
        <div>
          <p className="mb-4 font-medium text-gray-800 text-sm">LIÊN HỆ</p>
          <ul className="flex flex-col gap-2 text-gray-500 text-sm">
            <li>
              <p>Số điện thoại: +84 123 456 789</p>
            </li>
            <li>
              <p>Email: support@forever.com</p>
            </li>
            <li>
              <p>Địa chỉ: Hà Nội, Việt Nam</p>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300" />
      <p className="py-4 text-center text-gray-500 text-xs">
        Copyright © 2026 Forever.com - All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
