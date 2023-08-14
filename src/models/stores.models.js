"use strict";

const { Stores } = require("../../databases/models/index");

class StoresModel {
  async register(data, checkregister, transaction) {
    if (checkregister === "WEB") {
      return Stores.create(data, { transaction });
    } else {
      return Stores.create(data);
    }
  }
  async checkPhone(phone_store) {
    return Stores.findOne({ where: { phone_store: phone_store } });
  }
}

module.exports = new StoresModel();
