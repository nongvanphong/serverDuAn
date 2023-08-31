"use strict";

const { Op, on, Sequelize } = require("sequelize");
const {
  Products,
  Sizes,
  Categreys,
} = require("../../../databases/models/index");

class ProductsRepo {
  async create(data, transaction) {
    return Products.create(data, { transaction });
  }
  async findAll() {
    return Products.findAndCountAll({
      include: [
        {
          model: Sizes,
          required: false,
          attributes: ["id", "pr_id", "pr_price", "pr_size"],
        },
        {
          model: Categreys,
          required: false,
          attributes: ["id", "cg_name"],
        },
      ],
      attributes: [
        "id",
        "store_id",
        "name_product",
        "image_product",
        "detail",
        "status",
        "createdAt",
        "updatedAt",
      ],
    });
  }
}

module.exports = new ProductsRepo();
