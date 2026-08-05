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
  .refine((val) => !/<[^>]*>/.test(val), "Tên không được chứa thẻ HTML");

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

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Mật khẩu là bắt buộc"),
});

const registerSchema = z.object({
  email: emailSchema,
  name: nameSchema,
  password: passwordSchema,
});

const placeOrderSchema = z.object({
  address: z
    .string()
    .trim()
    .min(1, "Địa chỉ là bắt buộc")
    .max(500, "Địa chỉ phải có tối đa 500 ký tự"),
  city: z
    .string()
    .trim()
    .min(1, "Thành phố là bắt buộc")
    .max(100, "Thành phố phải có tối đa 100 ký tự"),
  district: z
    .string()
    .trim()
    .min(1, "Quận/Huyện là bắt buộc")
    .max(100, "Quận/Huyện phải có tối đa 100 ký tự"),
  email: emailSchema,
  name: nameSchema,
  phone: z
    .string()
    .trim()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^0\d{9}$/, "Số điện thoại phải có đúng 10 chữ số"),
  postalCode: z
    .string()
    .trim()
    .min(1, "Mã bưu điện là bắt buộc")
    .regex(/^\d{5,6}$/, "Mã bưu điện phải là 5-6 chữ số"),
});

const newsletterSchema = z.object({
  email: emailSchema,
});

export { loginSchema, newsletterSchema, placeOrderSchema, registerSchema };
