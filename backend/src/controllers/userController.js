import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import userModel from "../models/userModel.js";
import {
  adminLoginSchema,
  loginSchema,
  registerSchema,
} from "../utils/validation.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const parsed = registerSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { name, email, password } = parsed.data;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        message: "Người dùng đã tồn tại",
        success: false,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      email,
      name,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const loginUser = async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { email, password } = parsed.data;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Thông tin đăng nhập không hợp lệ",
        success: false,
      });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const adminLogin = async (req, res) => {
  try {
    const parsed = adminLoginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.json({
        message: parsed.error.issues[0].message,
        success: false,
      });
    }

    const { email, password } = parsed.data;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ message: "Thông tin đăng nhập không hợp lệ", success: false });
    }
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId).select("name email");
    if (!user) {
      return res.json({
        message: "Người dùng không tồn tại",
        success: false,
      });
    }
    res.json({ success: true, user });
  } catch {
    res.json({ message: "Lỗi", success: false });
  }
};

export { adminLogin, getProfile, loginUser, registerUser };
