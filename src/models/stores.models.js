"use strict";

const { Stores } = require("../../databases/models/index");

class StoresModel {
  async register(data) {
    return Stores.create(data);
  }
  async checkPhone(phone_store) {
    return Stores.findOne({ where: { phone_store: phone_store } });
  }
  async getAll(req, user_id) {
    return Stores.findAndCountAll({ where: { user_id: user_id } });
  }
}

module.exports = new StoresModel();
