import Attendance from "../models/attendanceModel.mjs";

class AttendanceController {
  async getAll(req, res) {
    try {
      console.log("Fetching all attendances");
      const attendances = await Attendance.findAll();
      res.json(attendances);
    } catch (error) {
      console.error("Error fetching all attendances:", error.message);
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      console.log(`Fetching attendance with ID: ${req.params.id}`);
      const attendance = await Attendance.findByPk(req.params.id);
      if (attendance) {
        res.json(attendance);
      } else {
        res.status(404).json({ error: "Attendance not found" });
      }
    } catch (error) {
      console.error(
        `Error fetching attendance with ID: ${req.params.id}`,
        error.message
      );
      res.status(500).json({ error: error.message });
    }
  }

  async create(req, res) {
    try {
      console.log("Creating new attendance:", req.body);
      const newAttendance = await Attendance.create(req.body);
      res.status(201).json(newAttendance);
    } catch (error) {
      console.error("Error creating new attendance:", error.message);
      res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      console.log(`Updating attendance with ID: ${req.params.id}`, req.body);
      const [updated] = await Attendance.update(req.body, {
        where: { id: req.params.id },
      });
      if (updated) {
        const updatedAttendance = await Attendance.findByPk(req.params.id);
        res.json(updatedAttendance);
      } else {
        res.status(404).json({ error: "Attendance not found" });
      }
    } catch (error) {
      console.error(
        `Error updating attendance with ID: ${req.params.id}`,
        error.message
      );
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      console.log(`Deleting attendance with ID: ${req.params.id}`);
      const deleted = await Attendance.destroy({
        where: { id: req.params.id },
      });
      if (deleted) {
        res.json({ message: "Attendance deleted" });
      } else {
        res.status(404).json({ error: "Attendance not found" });
      }
    } catch (error) {
      console.error(
        `Error deleting attendance with ID: ${req.params.id}`,
        error.message
      );
      res.status(500).json({ error: error.message });
    }
  }
}

export default new AttendanceController();
