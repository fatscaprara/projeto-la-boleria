import express from "express";
import { postCakes } from "../controllers/cakeController.js";
import { cakeValidate } from "../middlewares/cakeValidateMiddleware.js";

const router = express.Router();

router.post("/cakes", cakeValidate, postCakes);

export default router;
