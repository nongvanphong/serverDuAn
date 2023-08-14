const httpStatus = require("../../configs/httptatus");

exports.all = (req, res) => {
  try {
    const user = req.user;
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "get all store fail!",
    });
  }
};
