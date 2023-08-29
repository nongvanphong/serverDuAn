"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BeverageSize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BeverageSize.init(
    {
      br_id: DataTypes.INTEGER,
      br_price: DataTypes.INTEGER,
      br_size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BeverageSize",
      tableName: "beveragesize",
    }
  );
  return BeverageSize;
};
