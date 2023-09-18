"use strict";

const { Op } = require("sequelize");
const { Otps } = require("../../databases/models/index");

class OtpsRepo {
  async create(data, transaction) {
    return Otps.create(data, { transaction });
  }
  async findEmail(email) {
    return Otps.findOne({ where: { email: email } });
  }
  async delete() {
    const timenow1 = new Date().toISOString();
    return Otps.destroy({
      where: {
        endAt: {
          [Op.lt]: timenow1,
        },
      },
    });
  }
  async update(data, email, transaction) {
    return Otps.update(data, {
      where: { email: email },
      transaction: transaction,
    });
  }
  async verify(email, code) {
    const timenow1 = new Date().toISOString();

    return Otps.destroy({
      where: {
        email: email,
        codes: code,
        endAt: {
          [Op.gt]: timenow1,
        },
      },
      order: [
        ["createdAt", "DESC"], // Hoặc ['endAt', 'DESC'] để sắp xếp giảm dần
      ],
    });
  }
}

module.exports = new OtpsRepo();
