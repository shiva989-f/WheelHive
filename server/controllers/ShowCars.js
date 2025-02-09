import { CarModel } from "../models/Car.js"
import RentedCarModel from "../models/RentedCars.js";

export const ShowCars = async (req, res)=> {
    try {
        const cars = await CarModel.find();
        res.status(200).json({data: cars, msg: "Data Fetched Successfully", success: true,})
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error", success: false})
    }
}

export const BookedCars = async (req, res)=> {
    try {
      const bookedCars = await RentedCarModel.find().populate({
        path: "carId",
        model: "Car",
      });
      
      res
        .status(200)
        .json({ data: bookedCars, msg: "Data Fetched Successfully", success: true });
    } catch (error) {
        res.status(500).json({msg: "Internal Server Error", success: false})
    }
}