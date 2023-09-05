const httpStatus = require("../../../configs/httptatus");

const CategreysRepo = require("../../models/store/categreys.store.repo");

exports.getAll = async (req, res) => {
  try {
    const result = await CategreysRepo.findAll();
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: result,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get all categrey fail!",
    });
  }
};
