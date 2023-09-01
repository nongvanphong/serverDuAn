const express = require("express");
require("express-group-routes");

const AuthUser = require("../src/controllers/users/auths.user");
const ProductUser = require("../src/controllers/users/products.user");

const AuthStore = require("../src/controllers/stores/auths.store");
const Productstore = require("../src/controllers/stores/products.store");

const uploadFile = require("../src/config/upload.config");

const userValidAuth = require("../src/middlewares/validate/user/auth.user.vali");
const vaildFile = require("../src/middlewares/file.mid");

const isAuth = require("../src/middlewares/auth.middleware");
const isPremission = require("../src/middlewares/premission.minddleware");

var router = express.Router();
// router.group("/auth", (router) => {
//   router.post("/register", validAuth.validLogin, AuthController.Rigister);
//   router.post("/login", validAuth.validLogin, AuthController.Login);
//   router.post(
//     "/checkphone",
//     validAuth.validPhoneNumber,
//     AuthController.CheckPhone
//   );

//   router.post("/refreshtoken", AuthController.refreshToken);
//   router.post("/logout", isAuth.isAuth, AuthController.logout);
// });
// //isPremission([0])
// router.group("/store", (router) => {
//   router.get("/all", isAuth.isAuth, isPremission([0, 1]), StoreController.all);
//   router.post(
//     "/register",
//     isAuth.isAuth,
//     isPremission([0, 1]),
//     StoreController.RigisterStore
//   );
// });
router.group("/store", (router) => {
  router.group("/auth", (router) => {
    router.post("/register", AuthStore.Rigister);
    router.post("/activated", AuthUser.activated);
    router.post("/login", AuthUser.Login);
    router.post("/refreshtoken", AuthUser.refreshToken);
    router.get("/logout", isAuth.isAuth, AuthUser.logout);
  });
  router.group("/product", (router) => {
    router.post(
      "/create",
      uploadFile.single("file"),
      vaildFile.storeFile,
      isAuth.isAuth,
      Productstore.create
    );
    router.get("/getall", isAuth.isAuth, Productstore.getAll);
  });
});
router.group("/user", (router) => {
  router.group("/auth", (router) => {
    router.post("/register", userValidAuth.valiRegister, AuthUser.Rigister);
    router.post("/activated", AuthUser.activated);
    router.post("/login", AuthUser.Login);
    router.post("/refreshtoken", AuthUser.refreshToken);
    router.get("/logout", isAuth.isAuth, AuthUser.logout);
    router.post(
      "/checkmailphone",
      //userValidAuth.validPhoneEmail,
      AuthUser.CheckMailPhone
    );
  });
  router.group("/product", (router) => {
    router.get("/all", isAuth.isAuth, ProductUser.getAll);
  });
});
module.exports = router;
