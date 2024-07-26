"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Attendances",
      [
        {
          company_id: 1, // Ganti dengan ID perusahaan yang sesuai
          schedule_id: 1, // Ganti dengan ID jadwal yang sesuai
          user_id: 1, // Ganti dengan ID pengguna yang sesuai
          attendance_time: new Date(),
          attendance_type: "clock_in",
          remarks: "On time",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Attendances", null, {});
  },
};
