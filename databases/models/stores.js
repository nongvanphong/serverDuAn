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
      email: DataTypes.STRING,
      store_phone_number: DataTypes.STRING,
      store_name: DataTypes.STRING,
      manager_phone_number: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      long: DataTypes.DECIMAL,
      image: DataTypes.STRING,
      address: DataTypes.STRING,
      status: DataTypes.TINYINT,
      refresh_token: DataTypes.STRING,
      password: DataTypes.STRING,
      describe: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Stores",
      tableName: "stores",
    }
  );
  return Stores;
};
