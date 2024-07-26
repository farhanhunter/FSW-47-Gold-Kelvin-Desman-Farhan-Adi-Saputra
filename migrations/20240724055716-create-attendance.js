"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Attendances", {
      attendance_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      company_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "company_id",
        },
      },
      schedule_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "AttendanceSchedules",
          key: "schedule_id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "user_id",
        },
      },
      attendance_time: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      attendance_type: {
        type: Sequelize.ENUM("clock_in", "clock_out"),
        allowNull: false,
      },
      remarks: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Attendances");
  },
};
