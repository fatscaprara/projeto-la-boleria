import express from "express";
import { postOrder } from "../controllers/orderController.js";
import { orderValidate } from "../middlewares/orderValidateMiddleware.js";

const router = express.Router();

router.post("/order", orderValidate, postOrder);

export default router;
