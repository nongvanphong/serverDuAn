const httpStatus = require("../../../configs/httptatus");
const ProductsUserRepo = require("../../models/user/products.user");
const KM = 111.32; // bán kính trái đất
const radius = 5;
exports.getAll = async (req, res) => {
  try {
    //  const { long, lat, cg_id } = req.query;
    const { cg_id } = req.query;
    // const latFloat = parseFloat(lat);
    // const longFloat = parseFloat(long);
    // let lat_1 = latFloat - radius / KM;
    // let long_1 = longFloat - radius / KM;
    // let lat_2 = latFloat + radius / KM;
    // let long_2 = longFloat + radius / KM;
    // 12.6854297
    // 108.0584348

    const { count, rows } = await ProductsUserRepo.all(
      req,
      // lat_1,
      // long_1,
      // lat_2,
      // long_2,
      cg_id
    );
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
exports.getStoreProduct = async (req, res) => {
  try {
    const { store_id } = req.query;
    const { count, rows } = await ProductsUserRepo.findStore(req, store_id);

    const size = Object.values(count);

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      total: size.length,
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get store product fail!",
    });
  }
};
