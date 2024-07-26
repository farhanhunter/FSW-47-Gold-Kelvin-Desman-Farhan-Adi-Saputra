const { AttendanceSchedule } = require("../models");

exports.getAllAttendanceSchedules = async (req, res) => {
  try {
    const schedules = await AttendanceSchedule.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAttendanceScheduleById = async (req, res) => {
  try {
    const schedule = await AttendanceSchedule.findByPk(req.params.id);
    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).json({ message: "Attendance schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createAttendanceSchedule = async (req, res) => {
  try {
    const schedule = await AttendanceSchedule.create(req.body);
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAttendanceSchedule = async (req, res) => {
  try {
    const [updated] = await AttendanceSchedule.update(req.body, {
      where: { schedule_id: req.params.id },
    });
    if (updated) {
      const updatedSchedule = await AttendanceSchedule.findByPk(req.params.id);
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ message: "Attendance schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAttendanceSchedule = async (req, res) => {
  try {
    const deleted = await AttendanceSchedule.destroy({
      where: { schedule_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Attendance schedule not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
