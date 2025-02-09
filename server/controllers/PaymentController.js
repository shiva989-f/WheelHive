import { instance } from "../app.js";
import crypto from "crypto";
import PaymentModel from "../models/PaymentSchema.js";
import RentedCarModel from "../models/RentedCars.js";
import { CarModel } from "../models/Car.js";

// Create order api using post method http://localhost:3000/api/order
export const order = async (req, res) => {
  const {totalPrice} = req.body
  try {
    const options = {
      amount: Number(totalPrice * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    instance.orders.create(options, (error, order) => {
      if (error)
        return res
          .status(500)
          .json({ msg: "Something went wrong!", success: false });

      res.status(200).json({ msg: "Successful", order, success: true });
    });

  } catch (error) {
    res.status(500).json({ msg: "Internal Server error ", success: false });
  }
};

// Route 2: Create verify api using post method http://localhost:3000/api/verify
export const paymentVerification = async (req, res) => {
  // carId, customerEmail, startDate, endDate, totalPrice, returnedCar
  // 6773dd911aeb2f80a972826d, kumarshiva05722@gmail.com, 2025-01-02, 2025-01-06, total days = 4, total price = 24000

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    carId,
    startDate,
    endDate,
    totalPrice,
    isReturned,
  } = req.body;

  try {
    // Create sign
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    // Create expected sign
    const expectedSign = crypto.createHmac(
      "sha256",
      process.env.RAZORPAY_KEY_SECRET
    ).update(sign.toString())
    .digest("hex")

    const isAuthentic = expectedSign === razorpay_signature
    if (isAuthentic) {
       await CarModel.findByIdAndUpdate(
         carId,
         { $set: { availability: false } }
       );

      const newRentedCar = await RentedCarModel.create({
        carId,
        email: req.user.email,
        startDate,
        endDate,
        totalPrice,
        isReturned
      })

      const rentedCar = await newRentedCar.save()

      const newPayment = await PaymentModel.create({
        bookingId: rentedCar._id,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });
      await newPayment.save()
      res.status(201).json({msg: "Car Rented successfully", success: true})
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error ", success: false });
  }
};
