"use strict";

const { Op } = require("sequelize");
const { BeverageSize } = require("../../../databases/models/index");

class BeveragesSizeRepo {
  async create(data, transaction) {
    return BeverageSize.bulkCreate(data, { transaction });
  }
}

module.exports = new BeveragesSizeRepo();
