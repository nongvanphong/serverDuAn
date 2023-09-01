const httpStatus = require("../../../configs/httptatus");
const ProductsRepo = require("../../models/store/products.store");

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
      msg: "get all product fail!",
    });
  }
};
