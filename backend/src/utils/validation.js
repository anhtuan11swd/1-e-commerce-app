import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Tên phải có ít nhất 2 ký tự")
  .max(100, "Tên phải có tối đa 100 ký tự")
  .regex(
    /^[\p{L}\s'-]+$/u,
    "Tên chỉ có thể chứa chữ cái, khoảng trắng, dấu gạch ngang và dấu nháy đơn",
  )
  .refine((val) => /\p{L}/u.test(val), "Tên phải chứa ít nhất một chữ cái")
  .refine((val) => !/\d/.test(val), "Tên không được chứa chữ số")
  .refine(
    (val) => !/[!@#$%^&*()_+=[\]{};:\\|,.<>/?`~]/.test(val),
    "Tên không được chứa ký tự đặc biệt",
  )
  .refine(
    (val) => !/[\u{1F600}-\u{1F9FF}]/u.test(val),
    "Tên không được chứa biểu tượng cảm xúc",
  )
  .refine(
    (val) => !/\s{2,}/.test(val),
    "Tên không được chứa nhiều khoảng trắng liên tiếp",
  )
  .refine((val) => !/^[\s]*$/.test(val), "Tên không được chỉ chứa khoảng trắng")
  .refine((val) => !/<[^>]*>/.test(val), "Tên không được chứa thẻ HTML")
  .refine(
    (val) =>
      !/(?:')\s*(?:or|and)\s*\d+\s*=|(?:;)\s*(?:drop|delete|insert|update|select)/i.test(
        val,
      ),
    "Tên chứa các mẫu không hợp lệ",
  );

const emailSchema = z
  .string()
  .trim()
  .email("Vui lòng nhập email hợp lệ")
  .max(255, "Email phải có tối đa 255 ký tự");

const passwordSchema = z
  .string()
  .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
  .max(64, "Mật khẩu phải có tối đa 64 ký tự")
  .refine((val) => /[a-z]/.test(val), "Mật khẩu phải chứa một chữ cái thường")
  .refine((val) => /[A-Z]/.test(val), "Mật khẩu phải chứa một chữ cái hoa")
  .refine((val) => /\d/.test(val), "Mật khẩu phải chứa một chữ số")
  .refine(
    (val) => /[!@#$%^&*()_\-+=[\]{};:\\|,.<>/?`~]/.test(val),
    "Mật khẩu phải chứa một ký tự đặc biệt",
  )
  .refine((val) => !/\s/.test(val), "Mật khẩu không được chứa khoảng trắng")
  .refine(
    (val) => !/[\u{1F600}-\u{1F9FF}]/u.test(val),
    "Mật khẩu không được chứa biểu tượng cảm xúc",
  )
  .refine((val) => !/<[^>]*>/.test(val), "Mật khẩu không được chứa thẻ HTML");

const registerSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

const adminLoginSchema = z.object({
  email: z.string().min(1, "Email là bắt buộc"),
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

const productNameSchema = z
  .string()
  .trim()
  .min(1, "Tên sản phẩm là bắt buộc")
  .max(200, "Tên sản phẩm phải có tối đa 200 ký tự")
  .refine(
    (val) => !/<[^>]*>/.test(val),
    "Tên sản phẩm không được chứa thẻ HTML",
  );

const descriptionSchema = z
  .string()
  .trim()
  .min(1, "Mô tả là bắt buộc")
  .max(2000, "Mô tả phải có tối đa 2000 ký tự");

const priceSchema = z
  .number({ invalid_type_error: "Giá phải là một con số" })
  .int("Giá phải là số nguyên")
  .min(15001, "Giá phải lớn hơn 15000");

const categorySchema = z.enum(["Men", "Women", "Kids"], {
  errorMap: () => ({ message: "Danh mục phải là Men, Women hoặc Kids" }),
});

const subCategorySchema = z.enum(["Topwear", "Bottomwear", "Winterwear"], {
  errorMap: () => ({
    message: "Danh mục con phải là Topwear, Bottomwear hoặc Winterwear",
  }),
});

const sizesSchema = z
  .array(z.enum(["XS", "S", "M", "L", "XL", "XXL"]))
  .min(1, "Cần ít nhất một kích thước");

const addProductBodySchema = z.object({
  bestseller: z.string().optional(),
  category: categorySchema,
  description: descriptionSchema,
  name: productNameSchema,
  price: priceSchema,
  sizes: sizesSchema,
  subCategory: subCategorySchema,
});

const removeProductSchema = z.object({
  id: z.string().min(1, "Mã sản phẩm là bắt buộc"),
});

const singleProductSchema = z.object({
  productId: z.string().min(1, "Mã sản phẩm là bắt buộc"),
});

const updateProductSchema = z.object({
  bestseller: z.string().optional(),
  category: categorySchema.optional(),
  description: descriptionSchema.optional(),
  id: z.string().min(1, "Mã sản phẩm là bắt buộc"),
  name: productNameSchema.optional(),
  price: priceSchema.optional(),
  sizes: sizesSchema.optional(),
  subCategory: subCategorySchema.optional(),
});

const sizeEnum = z.enum(["XS", "S", "M", "L", "XL", "XXL"]);

const addToCartSchema = z.object({
  itemId: z.string().min(1, "Mã sản phẩm là bắt buộc"),
  size: sizeEnum,
});

const updateCartSchema = z.object({
  itemId: z.string().min(1, "Mã sản phẩm là bắt buộc"),
  quantity: z
    .number({ invalid_type_error: "Số lượng phải là một con số" })
    .int("Số lượng phải là số nguyên")
    .min(0, "Số lượng phải lớn hơn hoặc bằng 0"),
  size: sizeEnum,
});

const getUserCartSchema = z.object({});

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Số điện thoại là bắt buộc")
  .refine((val) => {
    const normalized = val.replace(/^(\+84|84)/, "0").replace(/[\s.-]/g, "");
    return /^0\d{9}$/.test(normalized);
  }, "Số điện thoại phải có đúng 10 chữ số (VD: 0912345678)")
  .refine((val) => {
    const normalized = val.replace(/^(\+84|84)/, "0").replace(/[\s.-]/g, "");
    return /^0(3[2-9]|5[689]|7[06789]|8[1-9]|9[0-9])\d{7}$/.test(normalized);
  }, "Số điện thoại phải là số di động Việt Nam hợp lệ (03x, 05x, 07x, 08x, 09x)");

const zipcodeSchema = z
  .string()
  .trim()
  .min(1, "Mã bưu điện là bắt buộc")
  .regex(/^\d{5,6}$/, "Mã bưu điện phải là 5-6 chữ số");

const orderItemSchema = z.object({
  image: z.string().min(1, "Ảnh sản phẩm là bắt buộc"),
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  price: z.number().min(1, "Giá phải lớn hơn 0"),
  productId: z.string().min(1, "Mã sản phẩm là bắt buộc"),
  quantity: z.number().int().min(1, "Số lượng phải lớn hơn 0"),
  size: sizeEnum,
});

const addressSchema = z.object({
  city: z.string().min(1, "Thành phố là bắt buộc"),
  district: z.string().min(1, "Quận/Huyện là bắt buộc"),
  email: z.string().email("Email không hợp lệ"),
  name: z.string().min(1, "Họ tên là bắt buộc"),
  phone: phoneSchema,
  state: z.string().min(1, "Tỉnh/Thành phố là bắt buộc"),
  street: z.string().min(1, "Địa chỉ đường là bắt buộc"),
  zipcode: zipcodeSchema,
});

const placeOrderSchema = z.object({
  address: addressSchema,
  amount: z.number().min(1, "Tổng tiền phải lớn hơn 0"),
  items: z.array(orderItemSchema).min(1, "Cần ít nhất một sản phẩm"),
  paymentMethod: z.enum(["cod", "stripe"], {
    errorMap: () => ({
      message: "Phương thức thanh toán phải là cod hoặc stripe",
    }),
  }),
});

const userOrdersSchema = z.object({});

const updateStatusSchema = z.object({
  orderId: z.string().min(1, "Mã đơn hàng là bắt buộc"),
  status: z.enum(
    ["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"],
    {
      errorMap: () => ({ message: "Trạng thái không hợp lệ" }),
    },
  ),
});

const verifyStripeSchema = z.object({
  orderId: z.string().min(1, "Mã đơn hàng là bắt buộc"),
  success: z.enum(["true", "false"]),
});

export {
  addProductBodySchema,
  addToCartSchema,
  adminLoginSchema,
  getUserCartSchema,
  loginSchema,
  placeOrderSchema,
  registerSchema,
  removeProductSchema,
  singleProductSchema,
  updateCartSchema,
  updateProductSchema,
  updateStatusSchema,
  userOrdersSchema,
  verifyStripeSchema,
};
