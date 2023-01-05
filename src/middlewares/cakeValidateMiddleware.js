import connection from "../database/db.js";
import cakeSchema from "../schemas/cakeSchema.js";

export async function cakeValidate(req, res, next) {
  const cake = req.body;

  const { error } = cakeSchema.validate(cake, { abortEarly: false });

  if (error?.details?.length) {
    const errors = error.details;

    const imageError = errors.find((error) => error.path[0] === "image");
    if (imageError) return res.sendStatus(422);

    return res.sendStatus(400);
  }

  try {
    const cakes = await connection.query(
      `
      SELECT
        *
      FROM
        cakes
      WHERE
        name = $1
        ;
    `,
      [cake.name]
    );

    if (cakes.rowCount) {
      return res.sendStatus(409);
    }

    req.cake = cake;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
