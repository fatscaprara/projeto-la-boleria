import express from "express";
import cors from "cors";

const app = express();

import cakeRouter from "./routes/cakeRouter.js";
import clientRouter from "./routes/clientRouter.js";
import orderRouter from "./routes/orderRouter.js";

app.use(express.json());
app.use(cors());
app.use(cakeRouter);
app.use(clientRouter);
app.use(orderRouter);

app.listen(4000, () => {
  console.log("Server listening in PORT: 4000");
});
