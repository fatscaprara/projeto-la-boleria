import connection from "../database/db.js";

export async function idClientValidate(req, res, next) {
  const { id } = req.params;

  try {
    const { rows: clientById } = await connection.query(
      `
      SELECT
        *
      FROM
        clients
      WHERE
        id = $1
      ;
    `,
      [id]
    );

    if (!clientById.length) {
      return res.sendStatus(404);
    }

    req.id = id;
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
