const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <div className="flex flex-col items-center gap-4 bg-gray-50 py-10 text-center">
        <p className="font-medium text-2xl text-gray-800">
          ĐĂNG KÝ NHẬN BẢN TIN
        </p>
        <p className="text-gray-500 text-sm">
          Đăng ký để nhận thông tin mới nhất về sản phẩm và ưu đãi đặc biệt.
        </p>
        <form className="flex w-full max-w-md gap-2" onSubmit={onSubmitHandler}>
          <input
            className="min-w-0 flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
            placeholder="Nhập địa chỉ email của bạn"
            type="email"
          />
          <button
            className="shrink-0 cursor-pointer rounded-md bg-gray-800 px-6 py-2 text-sm text-white transition-colors hover:bg-gray-700"
            type="submit"
          >
            ĐĂNG KÝ
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterBox;
