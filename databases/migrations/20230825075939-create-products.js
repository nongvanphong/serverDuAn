"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      store_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      kind_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      name_product: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      image_product: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      detail: {
        type: Sequelize.STRING(10000),
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT(2),
        allowNull: false,
        defaultValue: 0,
      },
      price_product: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      size_product: {
        type: Sequelize.STRING(20),
        allowNull: false,
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
    await queryInterface.dropTable("Products");
  },
};
