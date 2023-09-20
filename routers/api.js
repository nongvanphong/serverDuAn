const express = require("express");
require("express-group-routes");

const AuthUser = require("../src/controllers/users/auths.user");
const ProductUser = require("../src/controllers/users/products.user");
const CategreysUser = require("../src/controllers/users/categreys.user");
const StoreUser = require("../src/controllers/users/store.user");
const OderUser = require("../src/controllers/users/oders.user");

const AuthStore = require("../src/controllers/stores/auths.store");
const Productstore = require("../src/controllers/stores/products.store");
const CategreysStore = require("../src/controllers/stores/categreys.store");

const uploadFile = require("../src/config/upload.config");

const userValidAuth = require("../src/middlewares/validate/user/auth.user.vali");
const vaildFile = require("../src/middlewares/file.mid");

const isAuth = require("../src/middlewares/auth.middleware");
const isAuthStore = require("../src/middlewares/authStore.middleware");
const isPremission = require("../src/middlewares/premission.minddleware");

const { paging } = require("../src/middlewares/paging.mid");

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
    router.post("/activated", AuthStore.activated);
    router.post("/login", AuthStore.Login);
    router.post("/refreshtoken", AuthStore.refreshToken);
    router.get("/logout", isAuthStore.isAuthStore, AuthStore.logout);
  });
  router.group("/product", (router) => {
    router.post(
      "/create",
      uploadFile.single("file"),
      isAuthStore.isAuthStore,
      vaildFile.storeFile,
      Productstore.create
    );
    router.post(
      "/update1",
      uploadFile.single("file"),
      isAuthStore.isAuthStore,
      vaildFile.storeFile,
      Productstore.update1
    );
    router.post("/update2", isAuthStore.isAuthStore, Productstore.update2);
    router.post("/delete", isAuthStore.isAuthStore, Productstore.delete);
    router.get("/all", isAuthStore.isAuthStore, Productstore.getAll);
    router.post("/acction", isAuthStore.isAuthStore, Productstore.Acction);
  });
  router.group("/categrey", (router) => {
    router.get("/all", isAuthStore.isAuthStore, CategreysStore.getAll);
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
    router.post("/update/username", isAuth.isAuth, AuthUser.updateUserName);
    router.post("/update/password", isAuth.isAuth, AuthUser.updatePassword);

    router.post("/update/address", isAuth.isAuth, AuthUser.updateAddess);
    router.post(
      "/update/avatar",
      uploadFile.single("file"),
      isAuth.isAuth,
      vaildFile.userFile,
      AuthUser.updateAVT
    );
    router.post("/forgotpassword", AuthUser.forgotpassword);
  });
  router.group("/product", (router) => {
    router.get("/all", isAuth.isAuth, paging, ProductUser.getAll);
    router.get("/store", isAuth.isAuth, paging, ProductUser.getStoreProduct);
  });
  router.group("/categrey", (router) => {
    router.get("/all", isAuth.isAuth, CategreysUser.getAll);
  });
  router.group("/store", (router) => {
    router.get("/store", isAuth.isAuth, StoreUser.findStore);
  });
  router.group("/oder", (router) => {
    router.post("/create", isAuth.isAuth, OderUser.create);
  });
});
module.exports = router;
