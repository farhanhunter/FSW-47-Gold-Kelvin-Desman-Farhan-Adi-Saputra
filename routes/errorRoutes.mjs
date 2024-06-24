import { Router } from "express";
import { handleError } from "../controllers/errorController.mjs";

const router = Router();

// Catch all routes and handle errors
router.use("*", handleError);

export default router;
