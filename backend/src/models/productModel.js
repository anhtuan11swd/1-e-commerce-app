import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  bestseller: { type: Boolean },
  category: { required: true, type: String },
  date: { required: true, type: Number },
  description: { required: true, type: String },
  image: { required: true, type: Array },
  name: { required: true, type: String },
  price: { required: true, type: Number },
  sizes: { required: true, type: Array },
  subCategory: { required: true, type: String },
});

const productModel =
  mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
