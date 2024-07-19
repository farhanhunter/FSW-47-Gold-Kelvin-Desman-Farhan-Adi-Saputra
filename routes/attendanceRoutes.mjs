import express from "express";
import attendanceController from "../controllers/attendanceController.mjs";

const router = express.Router();

router.get("/attendances", attendanceController.getAll);
router.get("/attendances/:id", attendanceController.getById);
router.post("/attendances", attendanceController.create);
router.put("/attendances/:id", attendanceController.update);
router.delete("/attendances/:id", attendanceController.delete);

export default router;
