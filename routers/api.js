const express = require("express");
require("express-group-routes");
const Auth = require("../src/controllers/auths");

var router = express.Router();
router.group("/auth", (router) => {
  router.post("/register", Auth.Rigister);
  router.post("/Login", Auth.Login);
});

module.exports = router;
