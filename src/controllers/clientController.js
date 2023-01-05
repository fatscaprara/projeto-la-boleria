import connection from "../database/db.js";

export async function postClient(req, res) {
  const { name, address, phone } = req.client;

  try {
    await connection.query(
      `
      INSERT INTO
        clients (name, address, phone)
      VALUES
        ($1, $2, $3)
      ;
    `,
      [name, address, phone]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
