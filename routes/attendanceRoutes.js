const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const authenticateJWT = require("../middleware/authenticateJWT");

router.get("/attendances", attendanceController.getAllAttendances);
router.get("/attendances/:id", attendanceController.getAttendanceById);
router.post(
  "/attendances",
  authenticateJWT,
  attendanceController.createAttendance
);
router.put(
  "/attendances/:id",
  authenticateJWT,
  attendanceController.updateAttendance
);
router.delete(
  "/attendances/:id",
  authenticateJWT,
  attendanceController.deleteAttendance
);

module.exports = router;
