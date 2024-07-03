import express from "express";
import ReasonController from "../controllers/reasonController.mjs";

const router = express.Router();

router.get("/", (req, res, next) => {
  ReasonController.getReasons(req, res, next);
});

export default router;
