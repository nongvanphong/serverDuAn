var validator = require("validator");

const httpStatus = require("../../../configs/httptatus");

const validPhoneNumber = (req, res, next) => {
  const { phone = validator.trim(phone) } = req.body;
  var error = {};
  if (!phone) {
    error.phone = "Please enter the phone number";
  } else if (!validator.isMobilePhone(phone, ["vi-VN"])) {
    error.phone = "phone number is not in the correct format";
  }

  if (Object.keys(error).length !== 0) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "Request is not valid!",
      err: error,
    });
  }
  req.phone_number = phone;
  return next();
};
const validLogin = (req, res, next) => {
  const { phone = validator.trim(phone), password = validator.trim(password) } =
    req.body;
  var error = {};
  if (!phone) {
    error.phone = "Please enter the phone number";
  } else if (!validator.isMobilePhone(phone, ["vi-VN"])) {
    error.phone = "phone number is not in the correct format";
  }
  if (!password) {
    error.password = "Please enter the password";
  } else if (password.length < 6 || password.length > 15) {
    error.password = "password >=6 or <= 15";
  }

  if (Object.keys(error).length !== 0) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "Request is not valid!",
      err: error,
    });
  }
  req.login = {
    phone,
    password,
  };
  return next();
};
module.exports = {
  validPhoneNumber,
  validLogin,
};
