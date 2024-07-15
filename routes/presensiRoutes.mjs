// routes/presensiRoutes.mjs
import express from "express";
import presensiController from "../controllers/presensiController.mjs";

const router = express.Router();

router.get("/", presensiController.getPresensi.bind(presensiController));
router.post(
  "/submit-presensi",
  presensiController.postPresensi.bind(presensiController)
);
router.put(
  "/update-presensi/:id",
  presensiController.updatePresensi.bind(presensiController)
);

export default router;
