"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          company_id: 1, // Ganti dengan ID perusahaan yang sesuai
          username: "demoUser",
          password: "hashed_password_here", // Ganti dengan password yang sudah di-hash
          email: "user@democompany.com",
          role: "employee",
          phone_number: "123-456-7890",
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
