"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Bills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bills.belongsTo(models.Users, { foreignKey: "user_id" });
      Bills.hasMany(models.Billdetails, { foreignKey: "bill_id" });
    }
  }
  Bills.init(
    {
      user_id: DataTypes.INTEGER,
      store_id: DataTypes.INTEGER,
      total_amount: DataTypes.INTEGER,
      status: DataTypes.TINYINT,
    },
    {
      sequelize,
      modelName: "Bills",
      tableName: "bills",
    }
  );
  return Bills;
};
