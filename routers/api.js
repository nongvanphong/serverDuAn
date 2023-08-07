const express = require("express");
require("express-group-routes");
const tesst = require("../src/controllers/test");

var router = express.Router();
router.group("/auth", (router) => {
  router.get("/test", tesst.Test);
});

module.exports = router;
