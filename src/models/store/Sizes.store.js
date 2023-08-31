"use strict";

const { Op } = require("sequelize");
const { Sizes } = require("../../../databases/models/index");

class ProductsSizeRepo {
  async create(data, transaction) {
    return Sizes.bulkCreate(data, { transaction });
  }
}

module.exports = new ProductsSizeRepo();
