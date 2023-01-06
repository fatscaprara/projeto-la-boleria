import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

import cakeRouter from "./routes/cakeRouter.js";
import clientRouter from "./routes/clientRouter.js";
import orderRouter from "./routes/orderRouter.js";

app.use(express.json());
app.use(cors());
app.use(cakeRouter);
app.use(clientRouter);
app.use(orderRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening in PORT: ${port}`);
});
