import joi from "joi";

const cakeSchema = joi.object({
  name: joi.string().min(2).required(),
  price: joi.number().positive().required(),
  image: joi.string().uri().required(),
  description: joi.string().allow(""),
});

export default cakeSchema;
