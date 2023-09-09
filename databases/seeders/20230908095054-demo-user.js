"use strict";
const bcrypt = require("bcrypt");
const { numberHash } = require("../../config");

const password = "123456";
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
      "Users",
      [
        {
          user_name: "trần thái quang",
          email: "quang123@gamil.com",
          phone: "0395678784",
          password: bcrypt.hashSync(password, numberHash),
          status: 0,
          refresh_token: null,
          image: null,
          createdAt: now,
          updatedAt: now,
        },
        {
          user_name: "lê thịc ngọc anh",
          email: "ngoacanh@gamil.com",
          phone: "0395678785",
          password: bcrypt.hashSync(password, numberHash),
          status: 0,
          refresh_token: null,
          image: null,
          createdAt: now,
          updatedAt: now,
        },
        {
          user_name: "mai annh",
          email: "maianh@gamil.com",
          phone: "0395678786",
          password: bcrypt.hashSync(password, numberHash),
          status: 1,
          refresh_token: null,
          image: null,
          createdAt: now,
          updatedAt: now,
        },
        {
          user_name: "quang việt",
          email: "quangviet@gamil.com",
          phone: "0395678787",
          password: bcrypt.hashSync(password, numberHash),
          status: 2,
          refresh_token: null,
          image: null,
          createdAt: now,
          updatedAt: now,
        },
        {
          user_name: "đức thành",
          email: "thanh@gamil.com",
          phone: "0395678770",
          password: bcrypt.hashSync(password, numberHash),
          status: 0,
          refresh_token: null,
          image: null,
          createdAt: now,
          updatedAt: now,
        },
        {
          user_name: "tuấn sky",
          email: "tuan@gamil.com",
          phone: "0395678771",
          password: bcrypt.hashSync(password, numberHash),
          status: 0,
          refresh_token: null,
          image: null,
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
    await queryInterface.bulkDelete("Users", null, {});
  },
};
