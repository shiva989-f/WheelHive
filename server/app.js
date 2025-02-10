import express from "express";
import {configDotenv} from "dotenv";
import Razorpay from 'razorpay'
import cors from 'cors'
import './Connection/db.js'
import AuthRouter from "./routes/AuthRoute.js";
import AdminRouter from "./routes/AdminRoute.js";
import CarRouter from "./routes/AllCars.js";
import PaymentRoute from "./routes/PaymentRoute.js";

const app = express();
configDotenv()
app.use(cors())
/* app.use(cors({
  origin: [""],
  credentials: true, // Allow cookies & authentication headers
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
})); */

const PORT = process.env.PORT || 5000;

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.use(express.json())
app.use("/api/auth", AuthRouter)
app.use("/api/admin", AdminRouter)
app.use("/api/", CarRouter)
app.use("/api/payment", PaymentRoute);

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
