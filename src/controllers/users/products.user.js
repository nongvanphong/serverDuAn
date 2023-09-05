const httpStatus = require("../../../configs/httptatus");
const ProductsRepo = require("../../models/store/products.store");
const PI = 3.141592653589793;
exports.getAll = async (req, res) => {
  try {
    const { long, lat, id_cg } = req.body;
    let lat_2 = 12.6854297 + (5 * 180) / (PI * 6371);
    let long_2 = 108.0584348 + ((5 / 6371) * 180) / PI;

    const { count, rows } = await ProductsRepo.findAll(long, lat, id_cg);
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
