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

export async function getOrders(req, res) {
  const date = req.date;
  let query = `
    SELECT
      c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
      ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
      o.id AS "orderId", o."createdAt", o.quantity, o."totalPrice"
    FROM
      clients c
    JOIN
      orders o
    ON
      o."clientId" = c.id
    JOIN
      cakes ca
    ON
      o."cakeId" = ca.id
    ;
  `;
  let queryParams = null;
  if (date) {
    query = `
      SELECT
        c.id AS "clientId", c.name AS "clientName", c.address AS "clientAddress", c.phone AS "clientPhone",
        ca.id AS "cakeId", ca.name AS "cakeName", ca.price AS "cakePrice", ca.description AS "cakeDescription", ca.image AS "cakeImage",
        o.id AS "orderId", o."createdAt", o.quantity, o."totalPrice"
      FROM
       clients c
      JOIN
        orders o
      ON
        o."clientId" = c.id
      JOIN
        cakes ca
      ON
        o."cakeId" = ca.id
      WHERE
      o."createdAt" BETWEEN $1 AND $2
      ;
    `;
    queryParams = [`${date} 00:00:00`, `${date} 23:59:59`];
  }
  try {
    const { rows: orders } = await connection.query(query, queryParams);

    if (!orders.length) {
      return res.status(404).send([]);
    }

    const newOrders = orders.map(
      ({
        clientId,
        clientName,
        clientAddress,
        clientPhone,
        cakeId,
        cakeName,
        cakePrice,
        cakeDescription,
        cakeImage,
        orderId,
        createdAt,
        quantity,
        totalPrice,
      }) => ({
        client: {
          id: clientId,
          name: clientName,
          address: clientAddress,
          phone: clientPhone,
        },
        cake: {
          id: cakeId,
          name: cakeName,
          price: cakePrice,
          description: cakeDescription,
          image: cakeImage,
        },
        orderId: orderId,
        createAt: createdAt,
        quantity: quantity,
        totalPrice: totalPrice,
      })
    );

    res.status(200).send(newOrders);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
