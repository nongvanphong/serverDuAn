"use strict";

const { Op } = require("sequelize");
const { Beverages } = require("../../../databases/models/index");

class BeveragesRepo {
  async create(data, transaction) {
    return Beverages.create(data, { transaction });
  }
}

module.exports = new BeveragesRepo();
