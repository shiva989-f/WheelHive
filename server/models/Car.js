import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rentedPrice: {
    type: Number,
    required: true,
  },
  availability: {
    type: Boolean,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageStoragePath: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const CarModel = mongoose.model("Car", CarSchema)