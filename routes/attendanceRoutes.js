const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");

router.get("/attendances", attendanceController.getAllAttendances);
router.get("/attendances/:id", attendanceController.getAttendanceById);
router.post("/attendances", attendanceController.createAttendance);
router.put("/attendances/:id", attendanceController.updateAttendance);
router.delete("/attendances/:id", attendanceController.deleteAttendance);

module.exports = router;
