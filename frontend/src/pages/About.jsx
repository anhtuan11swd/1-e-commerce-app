import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div>
      {/* About Banner */}
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Title text1="VỀ" text2="CHÚNG TÔI" />
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:flex-row lg:gap-16">
        <img
          alt="About us"
          className="w-full object-contain lg:w-1/2"
          src={assets.about_img}
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 text-sm leading-relaxed lg:w-1/2">
          <p>
            Forever được thành lập với sứ mệnh mang đến cho khách hàng những sản
            phẩm thời trang chất lượng cao với phong cách hiện đại và tinh tế.
            Chúng tôi tin rằng thời trang không chỉ là quần áo mà còn là cách
            thể hiện bản thân.
          </p>
          <p>
            Với hơn 10 năm kinh nghiệm trong ngành thời trang, chúng tôi đã
            không ngừng phát triển và đổi mới để đáp ứng nhu cầu ngày càng đa
            dạng của khách hàng. Từ những thiết kế đơn giản đến những bộ sưu tập
            cao cấp, mỗi sản phẩm đều được chăm chút tỉ mỉ.
          </p>
          <p>
            Cam kết của chúng tôi là mang đến trải nghiệm mua sắm tốt nhất với
            dịch vụ khách hàng xuất sắc, chính sách đổi trả dễ dàng và giao hàng
            nhanh chóng trên toàn quốc.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <Title text1="TẠI SAO" text2="CHỌN CHÚNG TÔI" />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-3 text-center">
            <img alt="Quality" className="w-12" src={assets.quality_icon} />
            <p className="font-medium text-sm">ĐẢM BẢO CHẤT LƯỢNG</p>
            <p className="text-gray-500 text-sm">
              Mỗi sản phẩm đều được kiểm tra chất lượng nghiêm ngặt trước khi
              đến tay khách hàng.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <img alt="Exchange" className="w-12" src={assets.exchange_icon} />
            <p className="font-medium text-sm">TIỆN LỢI</p>
            <p className="text-gray-500 text-sm">
              Mua sắm dễ dàng với giao diện thân thiện, thanh toán an toàn và
              giao hàng nhanh chóng.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 text-center">
            <img alt="Support" className="w-12" src={assets.support_img} />
            <p className="font-medium text-sm">HỖ TRỢ KHÁCH HÀNG</p>
            <p className="text-gray-500 text-sm">
              Đội ngũ hỗ trợ khách hàng luôn sẵn sàng phục vụ bạn 24/7 với thái
              độ nhiệt tình nhất.
            </p>
          </div>
        </div>
      </div>

      <NewsletterBox />
    </div>
  );
};

export default About;
