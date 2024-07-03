import Attendance from "./attendanceModel.mjs";
import User from "./userModel.mjs";

class ReasonModel {
  static async getAll() {
    try {
      const results = await Attendance.findAll({
        include: {
          model: User,
          attributes: ["nama", "role"],
        },
      });
      return results;
    } catch (error) {
      throw error;
    }
  }
}

export default ReasonModel;
