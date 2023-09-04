"use strict";

const { Op } = require("sequelize");
const { Stores } = require("../../../databases/models/index");

class AuthUserRepo {
  async register(data, transaction) {
    return Stores.create(data, { transaction });
  }
  async checkPhoneMail(phone, email) {
    return Stores.findOne({
      where: { [Op.or]: [{ store_phone_number: phone }, { email: email }] },
    });
  }
  async checkMail(email, phone) {
    if (email) {
      return Stores.findOne({
        where: { email: email },
      });
    }
    return Stores.findOne({
      where: { store_phone_number: phone },
    });
  }
  async refreshToken(refresh_token, id) {
    return Stores.update(
      { refresh_token: refresh_token },
      { where: { id: id } }
    );
  }
  async findUser(id) {
    return Stores.findByPk(id);
  }
  async findRefreshToken(refresh_token) {
    return Stores.findOne({ where: { refresh_token: refresh_token } });
  }
  async logout(id) {
    return Stores.update({ refresh_token: null }, { where: { id: id } });
  }
  async activated(email) {
    return Stores.update({ status: 0 }, { where: { email: email } });
  }
}

module.exports = new AuthUserRepo();
