"use strict";

const { Op, on, Sequelize } = require("sequelize");
const {
  Products,

  Categreys,
} = require("../../../databases/models/index");

class ProductsRepo {
  async create(data) {
    return Products.create(data);
  }
  async findStore(store_id) {
    return Products.findAndCountAll({
      where: {
        store_id: store_id,
      },
      include: [
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
        "options",
        "createdAt",
        "updatedAt",
      ],
    });
  }
  async findAll() {
    let whereCondition = {};
    whereCondition.status = {
      status: 0,
    };

    return Products.findAndCountAll({
      where: whereCondition,
      include: [
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
  async updateStatus(id, store_id, status) {
    return Products.update(
      { status: status },
      { where: { id: id, store_id: store_id } }
    );
  }
}

module.exports = new ProductsRepo();
