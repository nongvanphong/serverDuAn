"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_name: {
        type: Sequelize.STRING(50),
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING(15),
        unique: true,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(50),
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      status: {
        type: Sequelize.TINYINT(2),
        defaultValue: 1, // 0 là vẫn đang sử dụng 1 chưa kích hoạt 2 là khóa vĩnh viễn
      },
      refresh_token: {
        type: Sequelize.STRING(150),
      },
      image: {
        type: Sequelize.STRING(50),
      },
      address: {
        type: Sequelize.STRING(150),
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
    await queryInterface.addIndex("users", ["phone"], {
      unique: true,
      name: "phone_unique",
    });
    await queryInterface.addIndex("users", ["email"], {
      name: "email_index",
      unique: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
