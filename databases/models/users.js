"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      user_name: DataTypes.STRING(50),
      email: DataTypes.STRING(50),
      phone: DataTypes.STRING(20),
      password: DataTypes.STRING(100),
      status: DataTypes.TINYINT(2),
      refresh_token: DataTypes.STRING(150),
      image: DataTypes.STRING(50),
      address: DataTypes.STRING(150),
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "users",
    }
  );

  return Users;
};
