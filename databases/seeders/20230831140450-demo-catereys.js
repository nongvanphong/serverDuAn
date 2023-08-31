"use strict";
const now = new Date();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Categreys",
      [
        {
          cg_name: "Đồ uống",
          createdAt: now,
          updatedAt: now,
        },
        {
          cg_name: "Đồ đồ ăn",
          createdAt: now,
          updatedAt: now,
        },
        {
          cg_name: "khác",
          createdAt: now,
          updatedAt: now,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categreys", null, {});
  },
};
