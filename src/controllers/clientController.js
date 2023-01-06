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

export async function getOrdersClientById(req, res) {
  const { id } = req;

  try {
    const { rows: orders } = await connection.query(
      `
      SELECT
        o.id AS "orderId", o.quantity, o."createdAt", o."totalPrice", c.name AS "cakeName"
      FROM
        orders o
      JOIN
        cakes c
      ON
        o."cakeId" = c.id
      WHERE
        o."clientId" = $1
      ;
    `,
      [id]
    );

    res.status(200).send(orders);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
