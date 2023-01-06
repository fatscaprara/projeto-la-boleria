import express from "express";
import {
  getOrderById,
  getOrders,
  postOrder,
} from "../controllers/orderController.js";
import { dateValidate } from "../middlewares/dateValidateMiddleware.js";
import { idOrderValidate } from "../middlewares/idOrderValidateMiddleware.js";
import { orderValidate } from "../middlewares/orderValidateMiddleware.js";

const router = express.Router();

router.post("/order", orderValidate, postOrder);
router.get("/orders", dateValidate, getOrders);
router.get("/orders/:id", idOrderValidate, getOrderById);

export default router;
