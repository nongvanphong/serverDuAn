"use strict";

const { Op } = require("sequelize");
const {
  Bills,
  Products,
  Users,
  Billdetails,
  sequelize,
} = require("../../databases/models/index");

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
  async findOderAllStore(id) {
    return Bills.findAll({
      where: {
        status: 0,
        store_id: id,
      },
      include: [
        {
          model: Users,
          required: false,
          attributes: ["user_name", "email", "phone", "address", "image"],
        },
        {
          model: Billdetails,
          required: false,
          attributes: ["product", "total_cost"],
        },
      ],
    });
  }
  async findOderAllStoreDetail(id) {
    return Bills.findAll({
      where: {
        status: 0,
        id: id,
      },
      include: [
        {
          model: Billdetails,
          required: false,
        },
      ],
    });
  }
}

module.exports = new BillRepo();
