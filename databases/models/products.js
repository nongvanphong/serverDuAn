"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init(
    {
      store_id: DataTypes.INTEGER,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      kind_id: INTEGER,
      name_product: STRING,
      image_product: STRING,
      detail: STRING,
      status: TINYINT,
      price_product: STRING,
      size_product: STRING,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "products",
    }
  );
  return Products;
};
