import connection from "../database/db.js";
import orderSchema from "../schemas/orderSchema.js";

export async function orderValidate(req, res, next) {
  const order = req.body;

  const { error } = orderSchema.validate(order);
  if (error) {
    return res.sendStatus(400);
  }

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
      [order.clientId]
    );

    if (!clientById.length) {
      return res.sendStatus(404);
    }

    const { rows: cakeById } = await connection.query(
      `
      SELECT
        *
      FROM
        cakes
      WHERE
        id = $1
      ;
    `,
      [order.cakeId]
    );

    if (!cakeById.length) {
      return res.sendStatus(404);
    }

    const totalPrice = order.quantity * cakeById[0].price;
    req.order = { ...order, totalPrice };
    next();
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
