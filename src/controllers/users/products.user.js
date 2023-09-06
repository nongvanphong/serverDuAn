const httpStatus = require("../../../configs/httptatus");
const ProductsUserRepo = require("../../models/user/products.user");
const PI = 3.141592653589793;
exports.getAll = async (req, res) => {
  try {
    const { long, lat, id_cg } = req.body;
    let lat_1 = 12.6854297 + -5 / 111.32;
    let long_1 = 108.0584348 + -5 / 111.32;
    let lat_2 = 12.6854297 + 5 / 111.32;
    let long_2 = 108.0584348 + 5 / 111.32;

    const { count, rows } = await ProductsUserRepo.outstanding(
      lat_1,
      long_1,
      lat_2,
      long_2
    );
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
