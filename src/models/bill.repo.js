"use strict";

const { Op } = require("sequelize");
const { Bills, Products, sequelize } = require("../../databases/models/index");

class BillRepo {
  async create(data, transaction) {
    return Bills.create(data, { transaction });
  }
  async find() {
    return Products.findAll({
      //   where: {
      //     "test.size": "x",
      //   },
      // where: sequelize.where(
      //   sequelize.fn(
      //     "JSON_CONTAINS",
      //     sequelize.col("test"),
      //     JSON.stringify([{ price: 2500, size: "x2", number: 2 }])
      //   ),
      //   true
      // ),
      //   where: {
      //     test: {
      //       [Op.contains]: [{ price: 2000, size: "x", number: 2 }],
      //     },
      //   },
    });
  }

  async update(data, email, transaction) {
    return Otps.update(data, {
      where: { email: email },
      transaction: transaction,
    });
  }
}

module.exports = new BillRepo();
