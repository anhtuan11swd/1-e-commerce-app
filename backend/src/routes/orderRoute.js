import express from "express";

import {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";

const orderRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Quản lý đơn hàng và thanh toán
 */

/**
 * @swagger
 * /api/v1/order/place:
 *   post:
 *     tags: [Order]
 *     summary: Đặt hàng COD
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, amount, address, paymentMethod]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     price:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     size:
 *                       type: string
 *                     image:
 *                       type: string
 *               amount:
 *                 type: number
 *                 example: 550000
 *               address:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   street:
 *                     type: string
 *                   city:
 *                     type: string
 *                   district:
 *                     type: string
 *                   state:
 *                     type: string
 *                   zipcode:
 *                     type: string
 *                   country:
 *                     type: string
 *                   phone:
 *                     type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [cod]
 *     responses:
 *       200:
 *         description: Đặt hàng thành công
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
 *                   example: Đặt hàng thành công
 *       400:
 *         description: Lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/place", authUser, placeOrder);

/**
 * @swagger
 * /api/v1/order/userorders:
 *   post:
 *     tags: [Order]
 *     summary: Lấy danh sách đơn hàng của người dùng
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Danh sách đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       items:
 *                         type: array
 *                       amount:
 *                         type: number
 *                       address:
 *                         type: object
 *                       status:
 *                         type: string
 *                       paymentMethod:
 *                         type: string
 *                       payment:
 *                         type: boolean
 *                       date:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/userorders", authUser, userOrders);

/**
 * @swagger
 * /api/v1/order/list:
 *   post:
 *     tags: [Order]
 *     summary: Lấy toàn bộ đơn hàng (Admin)
 *     security:
 *       - tokenAuth: []
 *     responses:
 *       200:
 *         description: Danh sách tất cả đơn hàng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 orders:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/list", adminAuth, allOrders);

/**
 * @swagger
 * /api/v1/order/status:
 *   post:
 *     tags: [Order]
 *     summary: Cập nhật trạng thái đơn hàng (Admin)
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, status]
 *             properties:
 *               orderId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Order Placed, Packing, Shipped, Out for delivery, Delivered]
 *     responses:
 *       200:
 *         description: Cập nhật thành công
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
 *                   example: Cập nhật trạng thái thành công
 *       400:
 *         description: Lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/status", adminAuth, updateStatus);

/**
 * @swagger
 * /api/v1/order/stripe:
 *   post:
 *     tags: [Order]
 *     summary: Đặt hàng thanh toán Stripe
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [items, amount, address, paymentMethod]
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *               amount:
 *                 type: number
 *               address:
 *                 type: object
 *               paymentMethod:
 *                 type: string
 *                 enum: [stripe]
 *     responses:
 *       200:
 *         description: Tạo phiên thanh toán thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 session_url:
 *                   type: string
 *                   example: https://checkout.stripe.com/...
 *       400:
 *         description: Lỗi xác thực
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/stripe", authUser, placeOrderStripe);

/**
 * @swagger
 * /api/v1/order/verifyStripe:
 *   post:
 *     tags: [Order]
 *     summary: Xác nhận thanh toán Stripe
 *     security:
 *       - tokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [orderId, success]
 *             properties:
 *               orderId:
 *                 type: string
 *               success:
 *                 type: string
 *                 enum: ["true", "false"]
 *     responses:
 *       200:
 *         description: Xác nhận thành công
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
 *                   example: Thanh toán thành công
 *       400:
 *         description: Thanh toán thất bại
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
