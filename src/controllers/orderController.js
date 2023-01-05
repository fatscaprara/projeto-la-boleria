import connection from "../database/db.js";

export async function postOrder(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = req.order;

  try {
    await connection.query(
      `
      INSERT INTO
        orders ("clientId", "cakeId", quantity, "totalPrice")
      VALUES
        ($1, $2, $3, $4)
      ;
    `,
      [clientId, cakeId, quantity, totalPrice]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
