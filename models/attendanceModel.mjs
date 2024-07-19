import { DataTypes } from "sequelize";
import sequelize from "../config/database.mjs";
import User from "./userModel.mjs";

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    clock_in: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    clock_out: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    reason: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "attendances",
    timestamps: false,
  }
);

Attendance.belongsTo(User, { foreignKey: "user_id" });

export default Attendance;
