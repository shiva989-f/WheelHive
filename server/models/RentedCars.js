import mongoose from "mongoose";

const RentedCar = new mongoose.Schema({
  carId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Car",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isReturned: {
    type: Boolean,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const RentedCarModel = mongoose.model("RentedCars", RentedCar)
export default RentedCarModel