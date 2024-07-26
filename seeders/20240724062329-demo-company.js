"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Companies",
      [
        {
          name: "Demo Company",
          address: "123 Demo Street, Demo City",
          phone_number: "123-456-7890",
          email: "contact@democompany.com",
          registration_date: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Companies", null, {});
  },
};
