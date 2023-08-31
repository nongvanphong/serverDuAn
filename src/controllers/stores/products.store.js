const httpStatus = require("../../../configs/httptatus");
const { sequelize } = require("../../../databases/models");
const ProductsSizeRepo = require("../../models/store/Sizes.store");
const ProductsRepo = require("../../models/store/products.store");
exports.create = async (req, res) => {
  try {
    const user = req.user;

    const { name_product, detail, pr_price, pr_size, cg_id } = req.body;
    const parsedBrPrice = JSON.parse(pr_price);
    const parsedBrSize = JSON.parse(pr_size);
    await sequelize.transaction(async (transaction) => {
      const newBeverage = {
        name_product,
        detail,
        image_product: req.fileResult,
        store_id: user.id,
        cg_id,
      };
      const result = await ProductsRepo.create(newBeverage, transaction);

      let dataBeverageOption = [];
      parsedBrSize.map((i, index) => {
        dataBeverageOption.push({
          pr_id: result.dataValues.id,
          pr_price: parsedBrPrice[index],
          pr_size: i,
        });
      });

      await ProductsSizeRepo.create(dataBeverageOption, transaction);

      return res.status(201).json({
        status: httpStatus.getStatus(201),
        data: "ok",
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "create beverage fail!",
    });
  }
};
exports.getAll = async (req, res) => {
  try {
    const { count, rows } = await ProductsRepo.findAll();
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      total: count,
      data: rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get all beverage fail!",
    });
  }
};
