"use strict";

const { Users } = require("../../databases/models/index");

class AuthModel {
  async register(data) {
    return Users.create(data);
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
}

module.exports = new AuthModel();
