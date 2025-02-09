import joi from 'joi'

export const registerValidation = (req, res, next)=> {
    const schema = joi.object({
      name: joi.string().min(3).max(60).required(),
      email: joi.string().email().required(),
      contact: joi.string().pattern(/^\d{10}$/).min(10).max(10).required(),
      password: joi.string().min(8).max(60).required(),
      confirmPassword: joi.any().valid(joi.ref('password')).required(),
      role: joi.string().valid("admin", "customer").default("customer") // Default role is 'customer'
    });

    const {error} = schema.validate(req.body)
    if (error) {
      const message = error?.details[0]?.message || "Fill data properly";
      return res.status(400).json({ msg: message, error });
    }
    next();
}

export const loginValidation = (req, res, next)=> {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(8).max(60).required(),
    });

    const {error} = schema.validate(req.body)
    if (error) {
      const message = error?.details[0]?.message || "Fill data properly";
      return res.status(400).json({ msg: message, error });
    }
    next();
}