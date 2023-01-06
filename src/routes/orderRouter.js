import express from "express";
import { getOrders, postOrder } from "../controllers/orderController.js";
import { dateValidate } from "../middlewares/dateValidateMiddleware.js";
import { orderValidate } from "../middlewares/orderValidateMiddleware.js";

const router = express.Router();

router.post("/order", orderValidate, postOrder);
router.get("/orders", dateValidate, getOrders);

export default router;
