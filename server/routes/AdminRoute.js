import {Router} from 'express'
import { addCar, customers, deleteCar, returnCar, updateCar } from '../controllers/AdminController.js'
import { CarValidator } from '../middlewares/CarValidator.js'
import {ensureAuthentication} from '../middlewares/AuthenticateUser.js'
import { BookedCars } from '../controllers/ShowCars.js'

const AdminRouter = Router()

AdminRouter.post("/add-car", ensureAuthentication, CarValidator, addCar)
AdminRouter.put("/update-car/:id", ensureAuthentication, updateCar);
AdminRouter.delete("/delete-car/:id", ensureAuthentication, deleteCar);
AdminRouter.get("/booked-cars", ensureAuthentication, BookedCars);
AdminRouter.post("/return-cars", ensureAuthentication, returnCar);
AdminRouter.get("/customers", ensureAuthentication, customers);
export default AdminRouter