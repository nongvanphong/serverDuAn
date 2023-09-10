const httpStatus = require("../../../configs/httptatus");
const StoreUserRepo = require("../../models/user/stores.user");
exports.findStore = async (req, res) => {
  try {
    const { store_id } = req.query;
    const rows = await StoreUserRepo.findPK(store_id);
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get store fail!",
    });
  }
};
