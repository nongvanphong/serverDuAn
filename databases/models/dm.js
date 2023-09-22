"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Dms extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dms.init(
    {
      test: {
        type: DataTypes.JSON,
      },
    },
    {
      sequelize,
      modelName: "Dms",
      tableName: "dms",
    }
  );
  return Dms;
};
