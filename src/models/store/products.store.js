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
  async findStore(store_id) {
    return Products.findAndCountAll({
      where: {
        store_id: store_id,
      },
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
  async findAll(long, lat, id_cg) {
    let whereCondition = {};
    whereCondition.status = {
      status: 0,
    };
    if (long) {
      whereCondition.long = {
        [Op.between]: [-long, long],
      };
    }
    if (lat) {
      whereCondition.lat = {
        [Op.between]: [-lat, lat],
      };
    }
    return Products.findAndCountAll({
      where: whereCondition,
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
  async updateStatus(id, store_id, status) {
    return Products.update(
      { status: status },
      { where: { id: id, store_id: store_id } }
    );
  }
}

module.exports = new ProductsRepo();
