import express from "express";
import {
  getOrdersClientById,
  postClient,
} from "../controllers/clientController.js";
import { clientValidate } from "../middlewares/clientValidateMiddleware.js";
import { idClientValidate } from "../middlewares/idClientValidateMiddleware.js";

const router = express.Router();

router.post("/clients", clientValidate, postClient);
router.get("/clients/:id/orders", idClientValidate, getOrdersClientById);

export default router;
