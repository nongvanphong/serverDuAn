"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kinds extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      kind_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Kinds",
      tableName: "kinds",
    }
  );
  return Kinds;
};
