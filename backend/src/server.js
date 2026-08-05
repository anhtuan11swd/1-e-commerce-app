import "dotenv/config";
import cors from "cors";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";
import setupSwagger from "./config/swagger.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = [process.env.FRONTEND_URL, process.env.ADMIN_URL].filter(
  Boolean,
);

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: allowedOrigins.length > 0 ? allowedOrigins : "*",
  }),
);

connectDB();
connectCloudinary();
setupSwagger(app);

app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", productRouter);

app.get("/", (_req, res) => {
  res.send("API hoạt động");
});

app.listen(port, () => {
  console.log(`Server khởi động trên cổng ${port}`);
  console.log(`Tài liệu API: http://localhost:${port}/api-docs`);
});
