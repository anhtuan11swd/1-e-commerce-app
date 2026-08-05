import "dotenv/config";
import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      message: "Không có quyền, vui lòng đăng nhập lại",
      success: false,
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = tokenDecode.id;
    next();
  } catch {
    return res.json({
      message: "Không có quyền, vui lòng đăng nhập lại",
      success: false,
    });
  }
};

export default authUser;
