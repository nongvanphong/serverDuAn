var validator = require("validator");
const dotenv = require("dotenv").config();

const httpStatus = require("../../configs/httptatus");
const configJwt = require("../../configs/jwt");
const valiJwt = require("../utils/jwtUtils");

const UserModel = require("../models/auths.models");
exports.isAuth = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
    return res.status(401).send({
      status: httpStatus.getStatus(401),
      msg: "Bearer token not found!",
    });
  }

  const passwordToken =
    dotenv.parsed.PASSWORD_TOKEN || configJwt.accessTokenSecret;

  const verified = await valiJwt.verifyToken(
    bearerToken.slice(7),
    passwordToken
  );

  if (!verified) {
    return res.status(401).send({
      status: httpStatus.getStatus(401),
      msg: "Token expired!",
    });
  }

  const user = await UserModel.findUser(verified.payload.user_id);

  req.user = user;
  return next();
};
