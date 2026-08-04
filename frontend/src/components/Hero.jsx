import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="mx-auto max-w-7xl border border-gray-200 px-5 py-5 sm:px-8">
      <div className="flex flex-col sm:flex-row">
        {/* Left Side */}
        <div className="flex w-full flex-col items-center justify-center gap-6 py-10 sm:w-1/2 sm:items-start sm:py-0">
          <div className="flex items-center gap-2">
            <hr className="w-10 border border-gray-400" />
            <p className="font-medium text-gray-500 text-sm tracking-widest">
              THỜI TRANG MỚI
            </p>
          </div>

          <h1 className="font-light text-3xl text-gray-800 leading-tight lg:text-5xl">
            Bộ Sưu Tập
            <br />
            Mới Nhất
          </h1>

          <div className="flex items-center gap-4">
            <p className="cursor-pointer font-medium text-gray-700 text-sm tracking-wide hover:text-black">
              MUA NGAY
            </p>
            <hr className="w-10 border border-gray-400" />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex w-full items-center justify-center sm:w-1/2">
          <img
            alt="Hero banner"
            className="w-full object-contain"
            src={assets.hero_img}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
