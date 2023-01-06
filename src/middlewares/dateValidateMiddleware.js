import dateSchema from "../schemas/dateSchema.js";

export async function dateValidate(req, res, next) {
  const { date } = req.query;

  if (date) {
    const { error } = dateSchema.validate({ date });
    if (error) return res.sendStatus(400);
    req.date = date;
  }

  next();
}
