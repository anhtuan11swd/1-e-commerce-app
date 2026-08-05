import userModel from "../models/userModel.js";
import { addToCartSchema, updateCartSchema } from "../utils/validation.js";

const addToCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const parsed = addToCartSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { itemId, size } = parsed.data;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ message: "Không tìm thấy người dùng", success: false });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Đã thêm vào giỏ hàng", success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const parsed = updateCartSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { itemId, quantity, size } = parsed.data;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ message: "Không tìm thấy người dùng", success: false });
    }

    const cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Đã cập nhật giỏ hàng", success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ message: "Không tìm thấy người dùng", success: false });
    }

    const cartData = userData.cartData || {};

    res.json({ cartData, success: true });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

export { addToCart, getUserCart, updateCart };
