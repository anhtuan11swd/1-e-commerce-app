import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div>
      {/* Contact Banner */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Title text1="LIÊN" text2="HỆ" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:gap-16">
        <img
          alt="Contact us"
          className="w-full object-contain lg:w-1/2"
          src={assets.contact_img}
        />
        <div className="flex flex-1 flex-col gap-8 py-4">
          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">CỬA HÀNG</p>
            <p className="text-gray-500 text-sm">
              Tầng 3, Tòa nhà ABC, 123 Đường Lê Lợi
              <br />
              Quận 1, TP. Hồ Chí Minh, Việt Nam
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">ĐIỆN THOẠI</p>
            <p className="text-gray-500 text-sm">+84 123 456 789</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-sm">EMAIL</p>
            <p className="text-gray-500 text-sm">support@forever.com</p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="font-medium text-sm">CƠ HỘI NGHỀ NGHIỆP</p>
            <p className="text-gray-500 text-sm">
              Cùng chúng tôi xây dựng thương hiệu thời trang hàng đầu Việt Nam.
              Chúng tôi luôn tìm kiếm những tài năng mới để gia nhập đội ngũ.
            </p>
            <button
              className="w-fit cursor-pointer border border-gray-300 px-6 py-3 font-medium text-sm hover:bg-black hover:text-white active:bg-gray-700"
              type="button"
            >
              Khám phá việc làm
            </button>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default Contact;
