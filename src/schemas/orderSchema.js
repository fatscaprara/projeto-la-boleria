import joi from "joi";

const orderSchema = joi.object({
  clientId: joi.number().integer().required(),
  cakeId: joi.number().integer().required(),
  quantity: joi.number().integer().min(1).max(4).required(),
});

export default orderSchema;
