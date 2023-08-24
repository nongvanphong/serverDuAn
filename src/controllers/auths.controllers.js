const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv").config();
const randToken = require("rand-token");

const httpStatus = require("../../configs/httptatus");
const { numberHash } = require("../../config");
const AuthModel = require("../models/auths.models");
const configJwt = require("../../configs/jwt");
const moment = require("moment/moment");
const valiJwt = require("../utils/jwtUtils");
const storesModels = require("../models/stores.models");
const { sequelize } = require("../../databases/models");

exports.Rigister = async (req, res) => {
  try {
    const { phone, password } = req.login;

    const checkPhoneNumber = await AuthModel.checkPhone(phone);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number already in use!",
      });

    const hashPassword = bcrypt.hashSync(password, numberHash);
    const newData = { phone, password: hashPassword };

    const result = await AuthModel.register(newData);
    if (!result)
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "register fail!",
      });
    return res.status(201).json({
      status: httpStatus.getStatus(201),
      data: "register sussecc!",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "login fail!",
    });
  }
};
exports.Login = async (req, res) => {
  try {
    const { phone, password } = req.login;
    const user = await AuthModel.checkPhone(phone);
    if (!user)
      return res.status(404).json({
        status: httpStatus.getStatus(404),
        msg: "you are not registered!",
      });
    const comparePwd = await bcrypt.compareSync(password, user.password);
    if (!comparePwd) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "login fail!",
      });
    }
    if (user.status != 0)
      return res.status(403).send({
        status: httpStatus.getStatus(403),
        msg: "locked account!",
      });

    const timeLifeToken = dotenv.parsed.TOKEN_LIFE || configJwt.accessTokenLife;
    const passwordToken =
      dotenv.parsed.PASSWORD_TOKEN || configJwt.accessTokenSecret;

    // regfresh
    const timeLifeRefreshToken =
      dotenv.parsed.REFRESH_TOKEN_LIFE || configJwt.accessRefreshTokenLife;
    const passwordRefreshToken =
      dotenv.parsed.PASSWORD_REFRESH_TOKEN ||
      configJwt.accessRefreshTokenSecret;

    //Duy tri dang nhap
    const to_day = moment();

    const dataAccessToken = {
      user_id: user.id,
      expired_at: to_day.endOf("day"),
    };
    const accessToken = await valiJwt.generateToken(
      dataAccessToken,
      passwordToken,
      timeLifeToken
    );

    // tạo mã refreshtoke ngỗng nhiên
    let refresh_token = randToken.generate(configJwt.refreshTokenSize);
    // let refresh_token = await valiJwt.generateToken(
    //   dataAccessToken,
    //   passwordRefreshToken,
    //   timeLifeRefreshToken
    // );

    if (!user.refresh_token) {
      // nếu không tồn tại thì uodate
      await AuthModel.refreshToken(refresh_token, user.id);
    } else {
      // If this user already has a refresh token, get that refresh token from the database
      refresh_token = user.refresh_token;
    }

    const data = {
      accessToken,
      refresh_token,
      info: {
        id: user.id,
        user_name: user.user_name,
        phone: user.phone,
        permission: user.permission,
        status: user.status,
        image: user.image,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "login fail!",
    });
  }
};
exports.CheckPhone = async (req, res) => {
  try {
    const phone_number = req.phone_number;
    const checkPhoneNumber = await AuthModel.checkPhone(phone_number);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number already in use! please login",
      });

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "phone number is not used please register!",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "check your phone number fail!",
    });
  }
};
exports.RigisterStore = async (req, res) => {
  try {
    const {
      phone_store,
      phone,
      password,
      name_store,
      lat_store,
      long_store,
      address_store,
    } = req.body;

    const checkPhoneNumber = await AuthModel.checkPhone(phone);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number already in use!",
      });
    const checkPhoneNumberSrore = await storesModels.checkPhone(phone_store);
    if (checkPhoneNumberSrore)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number store already in use",
      });
    const hashPassword = bcrypt.hashSync(password, numberHash);

    try {
      await sequelize.transaction(async (transaction) => {
        const newData = { phone, password: hashPassword, permission: 1 };

        const result = await AuthModel.register(newData, "WEB", transaction);

        const newStore = {
          user_id: result.id,
          phone_store,
          name_store,
          lat_store,
          long_store,
          address_store,
        };

        await storesModels.register(newStore, "WEB", transaction);
      });
    } catch (error) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "register store fail!",
      });
    }
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
exports.refreshToken = async (req, res) => {
  // Get Bearer token from Headers
  const bearerToken = req.body.refreshToken;
  console.log(bearerToken);
  // if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
  //   return res.status(401).send({
  //     status: httpStatus.getStatus(401),
  //     msg: "Bearer token not found!",
  //   });
  // }
  if (!bearerToken) {
    return res.status(401).send({
      status: httpStatus.getStatus(401),
      msg: "Bearer token not found!",
    });
  }
  const timeLifeToken = dotenv.parsed.TOKEN_LIFE || configJwt.accessTokenLife;
  const passwordToken =
    dotenv.parsed.PASSWORD_TOKEN || configJwt.accessTokenSecret;

  //  let refreshToken = bearerToken.slice(7);

  // Get username from payload
  const user = await AuthModel.findRefreshToken(bearerToken);

  if (!user) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "User does not exist!",
    });
  }

  // // Create new Access token
  const dataForAccessToken = {
    user_id: user.id,
  };

  const accessToken = await valiJwt.generateToken(
    dataForAccessToken,
    passwordToken,
    timeLifeToken
  );
  if (!accessToken) {
    return res.status(401).send({
      status: httpStatus.getStatus(401),
      msg: "Access token generation failed, please try again!",
    });
  }
  console.log("----", accessToken);
  return res.status(200).json({
    status: httpStatus.getStatus(200),
    data: { accessToken },
  });
};
exports.logout = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await AuthModel.logout(id);

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "Ok",
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(401),
      msg: "logout fail!",
    });
  }
};
