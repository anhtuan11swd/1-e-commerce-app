import { assets } from "../assets/assets";

const policies = [
  {
    description: "Chính sách đổi trả đơn giản và nhanh chóng cho mọi sản phẩm.",
    icon: assets.exchange_icon,
    title: "ĐỔI TRẢ DỄ DÀNG",
  },
  {
    description: "Hoàn tiền 100% trong vòng 7 ngày nếu bạn không hài lòng.",
    icon: assets.quality_icon,
    title: "HOÀN TIỀN 7 NGÀY",
  },
  {
    description: "Đội ngũ hỗ trợ khách hàng luôn sẵn sàng phục vụ bạn mọi lúc.",
    icon: assets.support_img,
    title: "HỖ TRỢ 24/7",
  },
];

const OurPolicy = () => {
  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
        {policies.map((policy) => (
          <div className="flex flex-col items-center gap-3" key={policy.title}>
            <img alt={policy.title} className="w-12" src={policy.icon} />
            <p className="font-medium text-gray-800 text-sm">{policy.title}</p>
            <p className="text-gray-500 text-sm">{policy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurPolicy;
