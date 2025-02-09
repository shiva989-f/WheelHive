import { UserModel } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// http://localhost:3000/api/auth/register
export const register = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;
    const user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(409)
        .json({ msg: "User already exist, Please login", success: false });

    const check_contact = await UserModel.findOne({contact})
    if (check_contact) {
      return res
        .status(409)
        .json({ msg: "User with same contact already exist, Please login", success: false });
    }


    const newUser = await UserModel.create({
      name,
      email,
      password,
      contact,
      role,
    });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ msg: "Register successfully!", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server error " + error, success: false });
  }
};

// http://localhost:3000/api/auth/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ msg: "User not found, Please Register!", success: false });

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch)
      return res
        .status(401)
        .json({ msg: "Password doesn't match", success: false });

    const jwtToken = jwt.sign(
      { email: user.email, phone: user.contact, _id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    res.status(200).json({
        msg: "Login successfully!",
        success: true,
        jwtToken,
        name: user.name,
        role: user.role
    })
  } catch (error) {
    res.status(500).json({msg: 'Internal server error', success: true})
  }

};
