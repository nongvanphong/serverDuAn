"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("stores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      phone_store: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      name_store: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      lat_store: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      long_store: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      image_store: {
        type: Sequelize.STRING(100),
      },
      address_store: {
        type: Sequelize.STRING(150),
        allowNull: false,
      },
      status: {
        type: Sequelize.TINYINT(2),
        defaultValue: 1, // mặc định la so 1 đang chờ được dueetj nếu được duyệt thì xuống 0 bị khóa lên 2
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
    await queryInterface.dropTable("stores");
  },
};
