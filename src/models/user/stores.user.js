"use strict";

const { Op, on, Sequelize } = require("sequelize");
const {
  Products,
  Sizes,
  Categreys,
  Stores,
  sequelize,
} = require("../../../databases/models/index");

class StoresUserRepo {
  async findPK(store_id) {
    return Stores.findByPk(store_id, {
      attributes: [
        "email",
        "store_phone_number",
        "store_name",
        "manager_phone_number",
        "image",
        "address",
        "status",
        "describe",
      ],
    });
  }
}

module.exports = new StoresUserRepo();
