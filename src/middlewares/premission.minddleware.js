const httpStatus = require("../../configs/httptatus");

module.exports = (permissions) => {
  return (req, res, next) => {
    const role = req.user.permission;
    if (!req.user) {
      return res.status(401).send({
        status: httpStatus.getStatus(401),
        msg: "Token expired!",
      });
    }
    if (permissions.includes(role)) {
      return next();
    }
    return res.status(403).send({
      status: httpStatus.getStatus(403),
      msg: "You don't have permission to access this feature!",
    });
  };
};
