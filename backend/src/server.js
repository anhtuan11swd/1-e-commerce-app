import "dotenv/config";
import cors from "cors";
import express from "express";
import connectCloudinary from "./config/cloudinary.js";
import connectDB from "./config/mongodb.js";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();

app.get("/", (_req, res) => {
  res.send("API hoạt động");
});

app.listen(port, () => {
  console.log(`Server khởi động trên cổng ${port}`);
});
