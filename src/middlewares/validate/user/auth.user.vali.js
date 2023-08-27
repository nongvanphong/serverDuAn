var validator = require("validator");

const httpStatus = require("../../../../configs/httptatus");

const validPhoneEmail = (req, res, next) => {
  const { phone, email } = req.body;
  console.log(phone, email);
  var error = {};

  if (email && email) {
    error.email_phone = "can only enter phone number or gmail!";
  }

  if (Object.keys(error).length !== 0) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "Request is not valid!",
      err: error,
    });
  }
  req.mailPhone = {
    phone,
    email,
  };
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
const valiRegister = (req, res, next) => {
  const {
    phone = validator.trim(phone),
    email = validator.trim(email),
    password = validator.trim(password),
  } = req.body;
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
  if (!validator.isEmail(email)) {
    error.email = "Invalid email!";
  }

  if (Object.keys(error).length !== 0) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "Request is not valid!",
      err: error,
    });
  }
  req.register = {
    phone,
    email,
    password,
  };
  return next();
};

module.exports = {
  validPhoneEmail,
  validLogin,
  valiRegister,
};
