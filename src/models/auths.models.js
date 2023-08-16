"use strict";

const { Users } = require("../../databases/models/index");

class AuthModel {
  async register(data, checkregister, transaction) {
    if (checkregister === "WEB") {
      return Users.create(data, { transaction });
    } else {
      return Users.create(data);
    }
  }
  async checkPhone(phone) {
    return Users.findOne({ where: { phone: phone } });
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
}

module.exports = new AuthModel();
