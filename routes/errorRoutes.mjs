// errorRoutes.mjs
import express from "express";
import {
  handleNotFound,
  handleError,
} from "../controllers/errorController.mjs";

const router = express.Router();

// Handle 404 errors
router.use(handleNotFound);

// Handle other errors
router.use(handleError);

export default router;
