"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Otps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Otps.init(
    {
      codes: DataTypes.INTEGER,
      email: DataTypes.STRING,
      endAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Otps",
      tableName: "otps",
    }
  );
  return Otps;
};
