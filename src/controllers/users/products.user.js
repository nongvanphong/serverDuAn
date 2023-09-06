const httpStatus = require("../../../configs/httptatus");
const ProductsUserRepo = require("../../models/user/products.user");
const KM = 111.32; // bán kính trái đất
const radius = 5;
exports.getAll = async (req, res) => {
  try {
    const { long, lat, id_cg } = req.body;
    let lat_1 = lat + -radius / KM;
    let long_1 = long + -radius / KM;
    let lat_2 = lat + radius / KM;
    let long_2 = long + radius / KM;
    // 12.6854297
    // 108.0584348
    const { count, rows } = await ProductsUserRepo.outstanding(
      req,
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
