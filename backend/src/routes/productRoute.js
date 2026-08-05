import express from "express";

import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import adminAuth from "../middleware/adminAuth.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Quản lý sản phẩm
 */

/**
 * @swagger
 * /api/v1/product/add:
 *   post:
 *     tags: [Product]
 *     summary: Thêm sản phẩm mới (Chỉ admin)
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [name, description, price, category, subCategory, sizes, image1]
 *             properties:
 *               name:
 *                 type: string
 *                 example: Áo thun cotton nam cổ tròn
 *               description:
 *                 type: string
 *                 example: Áo thun cotton cao cấp
 *               price:
 *                 type: number
 *                 example: 50000
 *               category:
 *                 type: string
 *                 enum: [Men, Women, Kids]
 *                 example: Men
 *               subCategory:
 *                 type: string
 *                 enum: [Topwear, Bottomwear, Winterwear]
 *                 example: Topwear
 *               sizes:
 *                 type: string
 *                 description: Mảng JSON các kích thước
 *                 example: '["S","M","L","XL"]'
 *               bestseller:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 example: "true"
 *               image1:
 *                 type: string
 *                 format: binary
 *               image2:
 *                 type: string
 *                 format: binary
 *               image3:
 *                 type: string
 *                 format: binary
 *               image4:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Sản phẩm đã được thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã được thêm thành công
 *       400:
 *         description: Lỗi xác thực hoặc không có quyền
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { maxCount: 1, name: "image1" },
    { maxCount: 1, name: "image2" },
    { maxCount: 1, name: "image3" },
    { maxCount: 1, name: "image4" },
  ]),
  addProduct,
);

/**
 * @swagger
 * /api/v1/product/remove:
 *   post:
 *     tags: [Product]
 *     summary: Xóa sản phẩm (Chỉ admin)
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Sản phẩm đã được xóa thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã được xóa thành công
 *       400:
 *         description: Lỗi xác thực hoặc không có quyền
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.post("/remove", adminAuth, removeProduct);

/**
 * @swagger
 * /api/v1/product/update:
 *   post:
 *     tags: [Product]
 *     summary: Cập nhật sản phẩm (Chỉ admin)
 *     description: Cập nhật thông tin sản phẩm. Nếu tải lên hình ảnh mới, hình ảnh cũ sẽ bị xóa khỏi Cloudinary.
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [id]
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *               name:
 *                 type: string
 *                 example: Men Round Neck Cotton T-Shirt (Updated)
 *               description:
 *                 type: string
 *                 example: Premium cotton T-Shirt - Limited Edition
 *               price:
 *                 type: number
 *                 example: 75000
 *               category:
 *                 type: string
 *                 enum: [Men, Women, Kids]
 *                 example: Men
 *               subCategory:
 *                 type: string
 *                 enum: [Topwear, Bottomwear, Winterwear]
 *                 example: Topwear
 *               sizes:
 *                 type: string
 *                 description: Mảng JSON các kích thước
 *                 example: '["S","M","L","XL","XXL"]'
 *               bestseller:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 example: "true"
 *               image1:
 *                 type: string
 *                 format: binary
 *               image2:
 *                 type: string
 *                 format: binary
 *               image3:
 *                 type: string
 *                 format: binary
 *               image4:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Sản phẩm đã được cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Sản phẩm đã được cập nhật thành công
 *       400:
 *         description: Lỗi xác thực hoặc không có quyền
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.post(
  "/update",
  adminAuth,
  upload.fields([
    { maxCount: 1, name: "image1" },
    { maxCount: 1, name: "image2" },
    { maxCount: 1, name: "image3" },
    { maxCount: 1, name: "image4" },
  ]),
  updateProduct,
);

/**
 * @swagger
 * /api/v1/product/single:
 *   post:
 *     tags: [Product]
 *     summary: Lấy thông tin chi tiết sản phẩm
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [productId]
 *             properties:
 *               productId:
 *                 type: string
 *                 example: 64f1a2b3c4d5e6f7a8b9c0d1
 *     responses:
 *       200:
 *         description: Tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       400:
 *         description: Không tìm thấy sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
productRouter.post("/single", singleProduct);

/**
 * @swagger
 * /api/v1/product/list:
 *   get:
 *     tags: [Product]
 *     summary: Lấy tất cả sản phẩm
 *     responses:
 *       200:
 *         description: Danh sách tất cả sản phẩm
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
productRouter.get("/list", listProducts);

export default productRouter;
