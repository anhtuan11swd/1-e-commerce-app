import { z } from "zod";

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
  errorMap: () => ({ message: "Danh mục phải là Nam, Nữ hoặc Trẻ em" }),
});

const subCategorySchema = z.enum(["Topwear", "Bottomwear", "Winterwear"], {
  errorMap: () => ({
    message: "Loại phải là Áo, Quần hoặc Đồ đông",
  }),
});

const sizesSchema = z
  .array(z.enum(["XS", "S", "M", "L", "XL", "XXL"]))
  .min(1, "Cần ít nhất một kích thước");

const addProductSchema = z.object({
  category: categorySchema,
  description: descriptionSchema,
  name: productNameSchema,
  price: priceSchema,
  sizes: sizesSchema,
  subCategory: subCategorySchema,
});

export { addProductSchema };
