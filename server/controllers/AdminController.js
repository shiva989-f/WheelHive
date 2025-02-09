import { bucket } from "../firebase/FirebaseConfig.js";
import { CarModel } from "../models/Car.js";
import RentedCarModel from "../models/RentedCars.js";
import { UserModel } from "../models/User.js";

export const addCar = async (req, res) => {
  try {
    const {
      make,
      model,
      year,
      rentedPrice,
      availability,
      image,
      imageStoragePath,
      description,
    } = req.body;
    const role = req.user.role;
    if (role === "admin") {
      const car = await CarModel.create({
        make,
        model,
        year,
        rentedPrice,
        availability,
        image,
        imageStoragePath,
        description,
      });
      await car.save();
      res.status(201).json({ msg: "Car added in Database", success: true });
    } else {
      return res.status(403).json({ msg: "Unauthorized, You're not admin!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error ", success: false });
  }
};

// Update car
export const updateCar = async (req, res) => {
  try {
    const role = req.user.role;

    if (role === "admin") {
      const id = req.params.id;
      const data = req.body;

      const car = await CarModel.findById(id);
      if (!car) {
        res.status(404).json({ msg: "Couldn't found car", success: false });
      }
      const imagePath = car.imageStoragePath;

      if (!imagePath) {
        res.status(404).json({ msg: "Couldn't found car", success: false });
      }
      // Delete the old stored image from Firebase Storage
      await bucket.file(imagePath).delete();
      //  Update car data
      const updatedCar = await CarModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });

      if (!updatedCar) {
        res.status(404).json({ msg: "Couldn't found car", success: true });
      }
      res
        .status(200)
        .json({ msg: "Updated car data successfully", success: true });
    } else {
      return res.status(403).json({ msg: "Unauthorized, You're not admin!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error ", success: false });
  }
};

// Delete Car
export const deleteCar = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "admin") {
      const { id } = req.params;
      const car = await CarModel.findById(id);
      if (!car) {
        res.status(404).json({ msg: "Couldn't found car", success: false });
      }

      // 2. Getting storage path of image stored in firebase - start
      const imagePath = car.imageStoragePath;
      if (!imagePath) {
        res
          .status(404)
          .json({ msg: "Couldn't found image path", success: false });
      }
      // 3. Delete the image from Firebase Storage - finish deleting image
      await bucket.file(imagePath).delete();

      // Delete data of car from the mongo
      const deletedCar = await CarModel.findByIdAndDelete(id);
      if (!deletedCar) {
        res.status(404).json({ msg: "Couldn't found car", success: false });
      }
      res.status(200).json({ msg: "Car deleted successfully", success: true });
    } else {
      return res.status(403).json({ msg: "Unauthorized, You're not admin!" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error ", success: false });
  }
};

// Return Car
export const returnCar = async (req, res) => {
  try {
    const role = req.user.role;
    if (role === "admin") {
      const { id, carId } = req.body;
      const rentedCar = await RentedCarModel.findByIdAndUpdate(id, {
        isReturned: true,
      });
      const car = await CarModel.findByIdAndUpdate(carId, {
        availability: true,
      });

      if (!rentedCar || !car) {
        res
          .status(404)
          .json({ msg: "Couldn't find rented car", success: false });
      }
      res.status(200).json({ msg: "Car Returned Successfully", success: true });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal Server error ", success: false });
  }
};

// Show all customers

export const customers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users)
      res.status(404).json({ msg: "Users Not Found!", success: false });
    
    res
      .status(200)
      .json({ data: users, msg: "Data Fetched Successfully", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error", success: false });
  }
};
