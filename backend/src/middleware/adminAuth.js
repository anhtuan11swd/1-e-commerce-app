import "dotenv/config";
import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      message: "Không có quyền, vui lòng đăng nhập lại",
      success: false,
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        message: "Không có quyền, vui lòng đăng nhập lại",
        success: false,
      });
    }

    next();
  } catch {
    return res.json({
      message: "Không có quyền, vui lòng đăng nhập lại",
      success: false,
    });
  }
};

export default adminAuth;
