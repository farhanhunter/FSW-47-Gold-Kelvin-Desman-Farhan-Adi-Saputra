"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      Attendance.belongsTo(models.Company, { foreignKey: "company_id" });
      Attendance.belongsTo(models.AttendanceSchedule, {
        foreignKey: "schedule_id",
      });
      Attendance.belongsTo(models.User, { foreignKey: "user_id" });
    }
  }

  Attendance.init(
    {
      attendance_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "Company",
          key: "company_id",
        },
      },
      schedule_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "AttendanceSchedule",
          key: "schedule_id",
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "User",
          key: "user_id",
        },
      },
      attendance_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      attendance_type: {
        type: DataTypes.ENUM("clock_in", "clock_out"),
        allowNull: false,
      },
      remarks: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: "Attendance",
    }
  );

  return Attendance;
};
