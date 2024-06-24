import express from "express";
import { getPortofolio } from "../controllers/portofolioController.mjs";

const router = express.Router();

router.get("/", getPortofolio);

export default router;
