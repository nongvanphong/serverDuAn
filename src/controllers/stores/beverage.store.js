const httpStatus = require("../../../configs/httptatus");
const { sequelize } = require("../../../databases/models");
const BeveragesSizeRepo = require("../../models/store/beverageSize.store");
const BeveragesRepo = require("../../models/store/beverage.store");
exports.create = async (req, res) => {
  try {
    const user = req.user;

    const { name_product, detail, br_price, br_size } = req.body;
    const parsedBrPrice = JSON.parse(br_price);
    const parsedBrSize = JSON.parse(br_size);
    await sequelize.transaction(async (transaction) => {
      const newBeverage = {
        name_product,
        detail,
        image_product: req.fileResult,
        store_id: user.id,
      };
      const result = await BeveragesRepo.create(newBeverage, transaction);

      let dataBeverageOption = [];
      parsedBrSize.map((i, index) => {
        dataBeverageOption.push({
          br_id: result.dataValues.id,
          br_price: parsedBrPrice[index],
          br_size: i,
        });
      });

      await BeveragesSizeRepo.create(dataBeverageOption, transaction);

      return res.status(201).json({
        status: httpStatus.getStatus(201),
        data: "ok",
      });
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "create beverage fail!",
    });
  }
};
