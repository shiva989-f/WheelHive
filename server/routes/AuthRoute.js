import {Router} from 'express'
import { login, register } from '../controllers/AuthController.js'
import { loginValidation, registerValidation } from '../middlewares/AuthValidator.js'

const AuthRouter = Router()

AuthRouter.post("/register", registerValidation, register)
AuthRouter.post("/login", loginValidation,login)

export default AuthRouter