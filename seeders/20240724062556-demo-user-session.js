"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "UserSessions",
      [
        {
          user_id: 1, // Ganti dengan ID pengguna yang sesuai
          login_time: new Date(),
          logout_time: null, // Set null jika pengguna belum logout
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("UserSessions", null, {});
  },
};
