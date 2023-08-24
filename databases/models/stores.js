"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Stores extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stores.init(
    {
      user_id: DataTypes.INTEGER,
      phone_store: DataTypes.STRING,
      name_store: DataTypes.STRING,
      lat_store: DataTypes.DECIMAL,
      long_store: DataTypes.DECIMAL,
      image_store: DataTypes.STRING,
      address_store: DataTypes.STRING,
      status: DataTypes.TINYINT,
      time_open: DataTypes.DATE,
      time_close: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Stores",
      tableName: "stores",
    }
  );
  return Stores;
};
