import connection from "../database/db.js";

export async function idOrderValidate(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: orderById } = await connection.query(
      `
      SELECT
        *
      FROM
        orders
      WHERE
        id = $1
      ;
    `,
      [id]
    );

    if (!orderById.length) {
      return res.sendStatus(404);
    }

    req.id = id;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
