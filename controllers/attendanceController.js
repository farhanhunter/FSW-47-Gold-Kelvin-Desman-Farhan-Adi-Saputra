const { Attendance } = require("../models");

exports.getAllAttendances = async (req, res) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceById = async (req, res) => {
  try {
    const attendance = await Attendance.findByPk(req.params.id);
    if (attendance) {
      res.json(attendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAttendance = async (req, res) => {
  try {
    console.log(req.body); // Log request body untuk debugging
    const { user_id, schedule_id, attendance_time, attendance_type } = req.body;
    const attendance = await Attendance.create({
      user_id,
      schedule_id,
      attendance_time: new Date(attendance_time), // Pastikan waktu diproses sebagai objek Date
      attendance_type,
    });
    res.status(201).json(attendance);
  } catch (error) {
    console.error("Error creating attendance:", error); // Log error untuk debugging
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttendance = async (req, res) => {
  try {
    const [updated] = await Attendance.update(req.body, {
      where: { attendance_id: req.params.id },
    });
    if (updated) {
      const updatedAttendance = await Attendance.findByPk(req.params.id);
      res.json(updatedAttendance);
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttendance = async (req, res) => {
  try {
    const deleted = await Attendance.destroy({
      where: { attendance_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Attendance not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
