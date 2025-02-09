import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/AuthenticateUser.js';
import { order, paymentVerification } from "../controllers/PaymentController.js";

const PaymentRoute = Router()

PaymentRoute.post("/order", ensureAuthentication, order);
PaymentRoute.post("/verify", ensureAuthentication, paymentVerification);

export default PaymentRoute;