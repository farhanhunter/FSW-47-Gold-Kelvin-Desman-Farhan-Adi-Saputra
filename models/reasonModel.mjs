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

  static async createReason({ reason, duration, user_id }) {
    try {
      const user = await User.findByPk(user_id);
      if (!user) {
        throw new Error("User not found");
      }

      const result = await Attendance.create({
        reason,
        duration,
        user_id,
        clock_in: new Date(),
        clock_out: new Date(new Date().getTime() + duration * 60000),
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default ReasonModel;
