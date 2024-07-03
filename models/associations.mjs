import User from "./userModel.mjs";
import Attendance from "./attendanceModel.mjs";

// Definisikan asosiasi setelah kedua model didefinisikan
User.hasMany(Attendance, { foreignKey: "user_id" });
Attendance.belongsTo(User, { foreignKey: "user_id" });

export { User, Attendance };
