"use strict";

const { Op } = require("sequelize");
const { Users } = require("../../databases/models/index");

class AuthModel {
  async register(data, transaction) {
    return Users.create(data, { transaction });
  }
  async checkPhoneMail(phone, email) {
    return Users.findOne({
      where: { [Op.or]: [{ phone: phone }, { email: email }] },
    });
  }
  async checkMail(email, phone) {
    if (email) {
      return Users.findOne({
        where: { email: email },
      });
    }
    return Users.findOne({
      where: { phone: phone },
    });
  }
  async refreshToken(refresh_token, id) {
    return Users.update(
      { refresh_token: refresh_token },
      { where: { id: id } }
    );
  }
  async findUser(id) {
    return Users.findByPk(id);
  }
  async findRefreshToken(refresh_token) {
    return Users.findOne({ where: { refresh_token: refresh_token } });
  }
  async logout(id) {
    return Users.update({ refresh_token: null }, { where: { id: id } });
  }
  async activated(email) {
    return Users.update({ status: 0 }, { where: { email: email } });
  }
}

module.exports = new AuthModel();
