const express = require("express");
require("express-group-routes");

const AuthController = require("../src/controllers/auths.controllers");
const StoreController = require("../src/controllers/store.controllers");

const validAuth = require("../src/middlewares/validate/auth.middleware.validate");

const isAuth = require("../src/middlewares/auth.middleware");
const isPremission = require("../src/middlewares/premission.minddleware");

var router = express.Router();
router.group("/auth", (router) => {
  router.post("/register", validAuth.validLogin, AuthController.Rigister);
  router.post("/login", validAuth.validLogin, AuthController.Login);
  router.post(
    "/checkphone",
    validAuth.validPhoneNumber,
    AuthController.CheckPhone
  );

  router.post("/refreshtoken", AuthController.refreshToken);
  router.post("/logout", isAuth.isAuth, AuthController.logout);
});
//isPremission([0])
router.group("/store", (router) => {
  router.get("/all", isAuth.isAuth, isPremission([0, 1]), StoreController.all);
  router.post(
    "/register",
    isAuth.isAuth,
    isPremission([0, 1]),
    StoreController.RigisterStore
  );
});
module.exports = router;
