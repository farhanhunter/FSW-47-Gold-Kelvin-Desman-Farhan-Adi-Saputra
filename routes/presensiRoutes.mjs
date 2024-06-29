// routes/presensiRoutes.mjs
import express from "express";
import presensiController from "../controllers/presensiController.mjs";

const router = express.Router();

router.get("/", (req, res, next) => {
  presensiController.getPresensi(req, res, next);
});

router.post("/submit-presensi", (req, res, next) => {
  presensiController.postPresensi(req, res, next);
});

export default router;
