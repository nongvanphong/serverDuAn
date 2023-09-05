"use strict";

const { Op } = require("sequelize");
const { Categreys } = require("../../../databases/models/index");

class CategreysRepo {
  async findAll() {
    return Categreys.findAll();
  }
}

module.exports = new CategreysRepo();
