import mongoose, { Schema } from "mongoose";

const PaymentSchema = new mongoose.Schema({
  bookingId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const PaymentModel = mongoose.model("Payment", PaymentSchema)
export default PaymentModel