const httpStatus = require("../../../configs/httptatus");
const { sequelize } = require("../../../databases/models");
const ProductsSizeRepo = require("../../models/store/Sizes.store");
const ProductsRepo = require("../../models/store/products.store");
exports.create = async (req, res) => {
  try {
    const user = req.user;
    console.log(user.id);
    const { name_product, detail, pr_price, pr_size, cg_id } = req.body;
    const parsedBrPrice = JSON.parse(pr_price);
    const parsedBrSize = JSON.parse(pr_size);

    let dataBeverageOption = [];
    parsedBrSize.map((i, index) => {
      dataBeverageOption.push({
        pr_price: parsedBrPrice[index],
        pr_size: i,
      });
    });
    // console.log("==:", JSON.stringify(dataBeverageOption));
    const newBeverage = {
      name_product,
      detail,
      image_product: req.fileResult,
      store_id: user.id,
      cg_id,
      options: JSON.stringify(dataBeverageOption),
    };
    const result = await ProductsRepo.create(newBeverage);

    return res.status(201).json({
      status: httpStatus.getStatus(201),
      data: "ok",
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
    const user = req.user;
    const { count, rows } = await ProductsRepo.findStore(user.id);
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      total: count,
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get all product fail!",
    });
  }
};
exports.Acction = async (req, res) => {
  try {
    const store_id = req.user.id;
    const { id, acction } = req.body;
    const result = await ProductsRepo.updateStatus(id, store_id, acction);

    if (result == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update product fail!",
      });
    }
    res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "update acction sussecc",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "update product fail!",
    });
  }
};
