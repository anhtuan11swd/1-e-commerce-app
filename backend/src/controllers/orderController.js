import "dotenv/config";
import Stripe from "stripe";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import {
  placeOrderSchema,
  updateStatusSchema,
  userOrdersSchema,
  verifyStripeSchema,
} from "../utils/validation.js";

let stripeInstance;

const getStripe = () => {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeInstance;
};

const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

const placeOrder = async (req, res) => {
  try {
    const parsed = placeOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { items, amount, address, paymentMethod } = parsed.data;
    const { userId } = req.body;

    const orderData = {
      address,
      amount,
      date: Date.now(),
      items,
      payment: false,
      paymentMethod,
      userId,
    };

    const order = new orderModel(orderData);
    await order.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ message: "Đặt hàng thành công", success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const userOrders = async (req, res) => {
  try {
    const parsed = userOrdersSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { userId } = req.body;

    const orders = await orderModel.find({ userId }).sort({ date: -1 });

    res.json({ orders, success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const allOrders = async (_req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });

    res.json({ orders, success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const updateStatus = async (req, res) => {
  try {
    const parsed = updateStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { orderId, status } = parsed.data;

    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ message: "Cập nhật trạng thái thành công", success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const placeOrderStripe = async (req, res) => {
  try {
    const parsed = placeOrderSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { items, amount, address, paymentMethod } = parsed.data;
    const { userId } = req.body;

    const orderData = {
      address,
      amount,
      date: Date.now(),
      items,
      payment: false,
      paymentMethod,
      userId,
    };

    const order = new orderModel(orderData);
    await order.save();

    const shippingFee = 50000;

    const line_items = [
      ...items.map((item) => ({
        price_data: {
          currency: "vnd",
          product_data: { name: item.name },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: "vnd",
          product_data: { name: "Phí vận chuyển" },
          unit_amount: shippingFee,
        },
        quantity: 1,
      },
    ];

    const session = await getStripe().checkout.sessions.create({
      cancel_url: `${frontendUrl}/verify?success=false&orderId=${order._id}`,
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/verify?success=true&orderId=${order._id}`,
    });

    res.json({ session_url: session.url, success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const verifyStripe = async (req, res) => {
  try {
    const parsed = verifyStripeSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { orderId, success } = parsed.data;
    const { userId } = req.body;

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ message: "Thanh toán thành công", success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ message: "Thanh toán thất bại", success: false });
    }
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

export {
  allOrders,
  placeOrder,
  placeOrderStripe,
  updateStatus,
  userOrders,
  verifyStripe,
};
