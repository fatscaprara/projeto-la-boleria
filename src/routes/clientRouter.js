import express from "express";
import { postClient } from "../controllers/clientController.js";
import { clientValidate } from "../middlewares/clientValidateMiddleware.js";

const router = express.Router();

router.post("/clients", clientValidate, postClient);

export default router;
