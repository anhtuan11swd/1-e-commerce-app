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

export {
  addProductBodySchema,
  adminLoginSchema,
  loginSchema,
  registerSchema,
  removeProductSchema,
  singleProductSchema,
  updateProductSchema,
};
