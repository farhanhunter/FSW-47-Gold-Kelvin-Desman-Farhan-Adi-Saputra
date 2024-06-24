import express from "express";
import presensiController from "../controllers/presensiController.mjs";

const router = express.Router();

router.get("/", (req, res) => {
  presensiController.getPresensi(req, res);
});

router.post("/", (req, res) => {
  presensiController.postPresensi(req, res, (newPresensi) => {
    req.app.get("io").emit("newPresensi", newPresensi);
    res.redirect("/");
  });
});

export default router;
