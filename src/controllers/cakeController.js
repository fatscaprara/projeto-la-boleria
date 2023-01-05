import connection from "../database/db.js";

export async function postCakes(req, res) {
  const cake = req.cake;

  try {
    await connection.query(
      `
      INSERT INTO
        cakes (name, price, image, description)
      VALUES
        ($1, $2, $3, $4)
      ;
    `,
      [cake.name, cake.price, cake.image, cake.description]
    );

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}
