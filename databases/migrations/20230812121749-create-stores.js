"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Stores", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      store_phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      manager_phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      store_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      store_phone_number: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      lat: {
        type: Sequelize.DECIMAL(17, 15),
        allowNull: false,
      },
      long: {
        type: Sequelize.DECIMAL(18, 15),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(100),
      },
      address: {
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
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      describe: {
        type: Sequelize.STRING(5000),
      },
      refresh_token: {
        type: Sequelize.STRING(150),
      },
    });
    await queryInterface.addIndex("stores", ["store_phone_number"], {
      unique: true,
      name: "store_phone_index",
    });
    await queryInterface.addIndex("stores", ["email"], {
      name: "store_email_index",
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("stores");
  },
};
