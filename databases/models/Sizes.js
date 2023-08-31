"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sizes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sizes.init(
    {
      pr_id: DataTypes.INTEGER,
      pr_price: DataTypes.INTEGER,
      pr_size: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Sizes",
      tableName: "sizes",
    }
  );
  return Sizes;
};
