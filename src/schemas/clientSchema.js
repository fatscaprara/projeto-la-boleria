import joi from "joi";

const clientSchema = joi.object({
  name: joi.string().required(),
  address: joi.string().required(),
  phone: joi
    .string()
    .min(10)
    .max(11)
    .regex(/^[0-9]+$/)
    .required(),
});

export default clientSchema;
