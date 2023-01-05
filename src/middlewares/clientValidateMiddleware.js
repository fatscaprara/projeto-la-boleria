import clientSchema from "../schemas/clientSchema.js";

export async function clientValidate(req, res, next) {
  const client = req.body;

  const { error } = clientSchema.validate(client);
  if (error) {
    return res.sendStatus(400);
  }

  req.client = client;
  next();
}
