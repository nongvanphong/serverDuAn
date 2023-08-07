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
      password: {
        allowNull: false,
        type: Sequelize.STRING(100),
      },
      permission: {
        type: Sequelize.TINYINT(2),
        defaultValue: 0, // 0 là user  1 là cửa hàng 2 là admin
      },
      status: {
        type: Sequelize.TINYINT(2),
        defaultValue: 0, // 0 là vẫn đang sử dụng 1 là khóa tạm thời 2 là khóa vĩnh viễn
      },
      refresh_token: {
        type: Sequelize.STRING(255),
      },
      image: {
        type: Sequelize.STRING(50),
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
