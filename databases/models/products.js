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

      Products.belongsTo(models.Categreys, { foreignKey: "cg_id" });
      Products.belongsTo(models.Stores, { foreignKey: "store_id" });
    }
  }
  Products.init(
    {
      store_id: DataTypes.INTEGER,
      cg_id: DataTypes.INTEGER,
      name_product: DataTypes.STRING,
      image_product: DataTypes.STRING,
      detail: DataTypes.TEXT,
      options: DataTypes.STRING,
      status: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Products",
      tableName: "products",
    }
  );
  return Products;
};
