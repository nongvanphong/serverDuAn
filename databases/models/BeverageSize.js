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
      kind_name: DataTypes.STRING,

      bs_id: DataTypes.INTEGER,
      bs_price: DataTypes.INTEGER,
      bs_size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BeverageSize",
      tableName: "beveragesize",
    }
  );
  return BeverageSize;
};
