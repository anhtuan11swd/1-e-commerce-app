import express from "express";

import {
  addToCart,
  getUserCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/auth.js";

const cartRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Quản lý giỏ hàng người dùng
 */

/**
 * @swagger
 * /api/v1/cart/add:
 *   post:
 *     tags: [Cart]
 *     summary: Thêm sản phẩm vào giỏ hàng
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [itemId, size]
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: 6651b2f8a1b2c3d4e5f6a7b8
 *               size:
 *                 type: string
 *                 enum: [XS, S, M, L, XL, XXL]
 *                 example: M
 *     responses:
 *       200:
 *         description: Đã thêm vào giỏ hàng
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
 *                   example: Đã thêm vào giỏ hàng
 *       400:
 *         description: Lỗi xác thực hoặc validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.post("/add", authUser, addToCart);

/**
 * @swagger
 * /api/v1/cart/update:
 *   post:
 *     tags: [Cart]
 *     summary: Cập nhật số lượng sản phẩm trong giỏ hàng
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [itemId, size, quantity]
 *             properties:
 *               itemId:
 *                 type: string
 *                 example: 6651b2f8a1b2c3d4e5f6a7b8
 *               size:
 *                 type: string
 *                 enum: [XS, S, M, L, XL, XXL]
 *                 example: M
 *               quantity:
 *                 type: number
 *                 example: 2
 *     responses:
 *       200:
 *         description: Đã cập nhật giỏ hàng
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
 *                   example: Đã cập nhật giỏ hàng
 *       400:
 *         description: Lỗi xác thực hoặc validation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.post("/update", authUser, updateCart);

/**
 * @swagger
 * /api/v1/cart/get:
 *   post:
 *     tags: [Cart]
 *     summary: Lấy dữ liệu giỏ hàng của người dùng
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Giỏ hàng của người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 cartData:
 *                   type: object
 *                   example:
 *                     6651b2f8a1b2c3d4e5f6a7b8:
 *                       M: 2
 *                       L: 1
 *                     6651b2f8a1b2c3d4e5f6a7b9:
 *                       S: 1
 *                       XL: 3
 *       400:
 *         description: Lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
cartRouter.post("/get", authUser, getUserCart);

export default cartRouter;
