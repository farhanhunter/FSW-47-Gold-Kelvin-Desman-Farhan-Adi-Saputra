"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("AttendanceSchedules", {
      schedule_id: {
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
      clock_in: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      clock_out: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      location_lat: {
        type: Sequelize.DECIMAL(9, 6), // Adjust precision if necessary
        allowNull: true,
      },
      location_long: {
        type: Sequelize.DECIMAL(9, 6), // Adjust precision if necessary
        allowNull: true,
      },
      day_of_week: {
        type: Sequelize.TINYINT,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("AttendanceSchedules");
  },
};
