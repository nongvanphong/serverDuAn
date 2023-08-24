const httpStatus = require("../../configs/httptatus");
const storesModels = require("../models/stores.models");

exports.all = async (req, res) => {
  try {
    const user = req.user;
    const result = await storesModels.getAll(req, user.id);
    console.log("---<", result);
    return res.status(200).send({
      status: httpStatus.getStatus(200),
      data: result,
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "get all store fail!",
    });
  }
};
