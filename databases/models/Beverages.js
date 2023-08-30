"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Beverages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Beverages.init(
    {
      store_id: DataTypes.INTEGER,

      name_product: DataTypes.STRING,
      image_product: DataTypes.STRING,
      detail: DataTypes.STRING,
      status: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Beverages",
      tableName: "beverages",
    }
  );
  return Beverages;
};
