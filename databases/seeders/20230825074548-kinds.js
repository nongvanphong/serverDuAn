"use strict";
const now = new Date();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("kinds", [
      {
        kind_name: "Đồ uống",
        createdAt: now,
        updatedAt: now,
      },
      {
        kind_name: "Đồ ăn",
        createdAt: now,
        updatedAt: now,
      },
      {
        kind_name: "Khác",
        createdAt: now,
        updatedAt: now,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Kinds", null, {});
  },
};
