const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv").config();
const randToken = require("rand-token");

const httpStatus = require("../../../configs/httptatus");
const { numberHash } = require("../../../config");
const AuthModel = require("../../models/auths.models");
const configJwt = require("../../../configs/jwt");
const moment = require("moment/moment");
const valiJwt = require("../../utils/jwtUtils");
const storesModels = require("../../models/stores.models");
const { sequelize } = require("../../../databases/models");
const OtpRepo = require("../../models/Otp.repo");
const {
  generateRandomNumbers,
  dateTime,
  SendOtp,
} = require("../../../configs/sendOtp");
const authsModels = require("../../models/auths.models");

exports.Rigister = async (req, res) => {
  try {
    const { email, phone, password } = req.register;

    const checkPhoneNumber = await AuthModel.checkPhoneMail(phone, email);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number or email already in use!",
      });

    const hashPassword = bcrypt.hashSync(password, numberHash);
    const newData = { email, phone, password: hashPassword };
    await sequelize.transaction(async (transaction) => {
      await AuthModel.register(newData, transaction);
      const otp = generateRandomNumbers(100000, 999999);
      const dataOtp = {
        email,
        codes: otp,
        endAt: dateTime(5),
      };
      await OtpRepo.create(dataOtp, transaction);
      SendOtp(email, otp);
      return res.status(201).json({
        status: httpStatus.getStatus(201),
        data: "register sussecc!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "register fail!",
    });
  }
};
exports.activated = async (req, res) => {
  try {
    const { email, code } = req.body;
    const timeNow = dateTime(0);

    const result = await AuthModel.checkMail(email, "");
    if (!result) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "email dose not exist!",
      });
    }

    if (!code) {
      console.log("tạo");
      return;
    }

    const resultOtp = await OtpRepo.verify(email, code, timeNow);
    if (!resultOtp) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "wrong otp code!",
      });
    }
    const activated = await authsModels.activated(email);
    if (!activated) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "wrong otp code!",
      });
    }
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "activaved sussecc!",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "account not activated!",
    });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (email && phone) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "can only enter phone number or gmail!",
      });
    }

    const user = await AuthModel.checkMail(email, phone);
    if (!user)
      return res.status(400).json({
        status: httpStatus.getStatus(400),
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
        email: user.email,
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
exports.CheckMailPhone = async (req, res) => {
  try {
    const { phone, email } = req.body;
    const checkPhoneNumber = await AuthModel.checkMail(email, phone);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number or email  already in use! please login",
      });

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "phone number  or email  is not used please register!",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "check your phone number  or email  fail!",
    });
  }
};

exports.refreshToken = async (req, res) => {
  // Get Bearer token from Headers
  const bearerToken = req.body.refreshToken;

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
