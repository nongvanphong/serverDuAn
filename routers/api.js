const express = require("express");
require("express-group-routes");

const Auth = require("../src/controllers/auths");

const validAuth = require("../src/middlewares/auth.middleware");

var router = express.Router();
router.group("/auth", (router) => {
  router.post("/register", validAuth.validLogin, Auth.Rigister);
  router.post("/login", validAuth.validLogin, Auth.Login);
  router.post("/checkphone", validAuth.validPhoneNumber, Auth.CheckPhone);
});

module.exports = router;
