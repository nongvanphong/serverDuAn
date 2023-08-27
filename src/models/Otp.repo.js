"use strict";

const { Op } = require("sequelize");
const { Otps } = require("../../databases/models/index");

class OtpsRepo {
  async create(data, transaction) {
    return Otps.create(data, { transaction });
  }
  async findPk(email) {
    return Otps.findByPk(email);
  }
  async update(data, email, transaction) {
    return Otps.update(data, {
      where: { email: email },
      transaction: transaction,
    });
  }
  async verify(email, code) {
    const timenow1 = new Date().toISOString();

    return Otps.findOne({
      where: {
        email: email,
        codes: code,
        endAt: {
          [Op.gt]: timenow1,
        },
      },
    });
  }
}

module.exports = new OtpsRepo();
