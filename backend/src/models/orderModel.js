import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  address: { required: true, type: Object },
  amount: { required: true, type: Number },
  date: { default: Date.now, type: Date },
  items: { required: true, type: Array },
  payment: { default: false, type: Boolean },
  paymentMethod: { required: true, type: String },
  status: { default: "Order Placed", type: String },
  userId: { ref: "user", required: true, type: mongoose.Schema.Types.ObjectId },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
