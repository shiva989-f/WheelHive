import { Router } from "express";
import { ShowCars } from "../controllers/ShowCars.js";

const CarRouter = Router()

CarRouter.get("/all-cars", ShowCars);

export default CarRouter;