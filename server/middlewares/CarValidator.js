import joi from 'joi'

export const CarValidator = (req, res, next)=> {
    const Schema = joi.object({
      make: joi.string().min(3).max(60).required(),
      model: joi.string().min(2).max(60).required(),
      // year should be integer number minimum 2000 or max to the current year
      year: joi.number()
        .integer()
        .min(2000)
        .max(new Date().getFullYear())
        .required(),
      rentedPrice: joi.number().min(1000).required(),
      availability: joi.boolean().required(),
      image: joi.string().required(),
      imageStoragePath: joi.string().required(),
      description: joi.string().min(10).required(),
    });

    const {error} = Schema.validate(req.body)
    if(error){
        const message = error?.details[0]?.message || "Fill data properly";
        return res.status(400).json({ msg: message, error });
    }
    next()
}