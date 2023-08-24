const httpStatus = require("../../configs/httptatus");
const storesModels = require("../models/stores.models");

exports.all = async (req, res) => {
  try {
    const user = req.user;
    const { count, rows } = await storesModels.getAll(req, user.id);

    return res.status(200).send({
      status: httpStatus.getStatus(200),
      data: rows,
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "get all store fail!",
    });
  }
};
exports.RigisterStore = async (req, res) => {
  try {
    const user = req.user;
    const {
      phone_store,
      name_store,
      lat_store,
      long_store,
      address_store,
      describe,
      time_close,
    } = req.body;
    const newData = {
      user_id: user.id,
      phone_store,
      name_store,
      lat_store,
      long_store,
      address_store,
      describe,
      time_close,
    };

    const { count, rows } = await storesModels.getAll(req, user.id);

    if (count > 4) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "the number of stores exceeds the specified number",
      });
    }
    console.log(newData);
    const result = await storesModels.register(newData);

    if (!result)
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "register store fail!",
      });
    return res.status(201).json({
      status: httpStatus.getStatus(201),
      data: "Ok",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "register store fail!",
    });
  }
};
