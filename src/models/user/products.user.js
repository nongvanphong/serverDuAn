"use strict";

const { Op, on, Sequelize } = require("sequelize");
const {
  Products,
  Sizes,
  Categreys,
  Stores,
  sequelize,
} = require("../../../databases/models/index");

class ProductsUserRepo {
  async create(data, transaction) {
    return Products.create(data, { transaction });
  }
  async findStore(req, store_id) {
    const { offset, limit } = req.paging;
    return Products.findAndCountAll({
      offset: offset,
      limit: limit,
      where: {
        store_id: store_id,
      },
      include: [
        {
          model: Sizes,
          required: false,
          attributes: ["id", "pr_id", "pr_price", "pr_size"],
        },
        // {
        //   model: Categreys,
        //   required: false,
        //   attributes: ["id", "cg_name"],
        // },
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
      group: ["id"],
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
  async all(req, lat_1, long_1, lat_2, long_2, cg_id) {
    const { offset, limit } = req.paging;

    let whereCondition = {};
    let whereConditionProduct = {};
    whereConditionProduct.status = 0;
    if (cg_id) {
      whereConditionProduct.cg_id = cg_id;
    }
    if (lat_1 && long_1 && lat_2 && long_2) {
      whereCondition.lat = {
        [Op.between]: [lat_1, lat_2],
      };
      whereCondition.long = {
        [Op.between]: [long_1, long_2],
      };
    }

    return Products.findAndCountAll({
      where: whereConditionProduct,
      offset: offset,
      limit: limit,
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

      include: [
        {
          model: Stores,
          where: whereCondition,
          required: false,
          right: true,
          attributes: [
            "store_name",
            "manager_phone_number",
            "store_phone_number",
            "address",
            "describe",
            "image",
          ],
        },
      ],
    });
  }
}

module.exports = new ProductsUserRepo();
