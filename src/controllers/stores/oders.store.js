const httpStatus = require("../../../configs/httptatus");
const BillRepo = require("../../models/bill.repo");
const BilldetailRepo = require("../../models/billdetail.repo");

const { sequelize } = require("../../../databases/models");
exports.create = async (req, res) => {
  try {
    var error = {};
    var total_amoun = 0;
    let err = [];
    const { id } = req.user;
    const { store_id, product_oder } = req.body;
    const product_id = [];
    const dataDetail = [];
    product_oder.map((i) => {
      product_id.push(i.product_id);
    });

    const resultProduct = await ProductsUserRepo.all(product_id);

    var optionsProduct = [];

    if (!resultProduct[0] || resultProduct.length != product_id.length) {
      err.push({
        msg: "product is not in the system",
      });
    }
    resultProduct.map((i, index) => {
      optionsProduct.push(JSON.parse(i.options));
      const foundOrder = product_oder.find(
        (order) => order.product_id == i.id && i.status == 0
      );
      if (!foundOrder) {
        err.push({
          name_product: i.name_product,
          msg: "The product is out of stock",
        });
      } else {
        let sum = 0;
        product_oder[index].options.map((i) => {
          sum = sum + i.number * i.price;
        });
        total_amoun += sum;
        dataDetail.push({
          product_id: i.id,
          product: {
            name: i.name_product,
            options: product_oder[index].options,
            detail: i.detail,
          },
          total_cost: sum,
          //vourcher: null,
        });
      }
    });

    if (err[0]) {
      error = err;
    }

    if (Object.keys(error).length !== 0) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "Request is not valid!",
        err: error,
      });
    }

    const newBill = {
      user_id: id,
      store_id: store_id,
      total_amount: total_amoun,
    };

    await sequelize.transaction(async (transaction) => {
      const resultBill = await BillRepo.create(newBill, transaction);
      for (const item of dataDetail) {
        item.bill_id = resultBill.id;
      }
      await BilldetailRepo.create(dataDetail, transaction);
    });

    const newData = {
      store_id: store_id,
      total_amount: total_amoun,
      billdetail: dataDetail,
    };
    // console.log(id, store_id, total_amoun, dataDetail);
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: newData,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "create oder fail!",
    });
  }

  //   try {
  //     // const { test } = req.body;
  //     // const news = {
  //     //   test: { key1: "value1", key2: "value2" },
  //     // };
  //     // const a = await TestRepo.create(news);

  //     // return res.status(200).json({
  //     //   status: httpStatus.getStatus(200),
  //     //   data: "ok",
  //     // });

  //     const { test } = req.body;
  //     const news = {
  //       test: { key1: "value1", key2: "value2" },
  //     };
  //     const a = await TestRepo.find();

  //     return res.status(200).json({
  //       status: httpStatus.getStatus(200),
  //       data: a,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json({
  //       status: httpStatus.getStatus(400),
  //       msg: "create oder fail!",
  //     });
  //   }
  // };
};
exports.all = async (req, res) => {
  try {
    const { id } = req.user;
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: await BillRepo.findOderAllStore(id),
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get oder fail!",
    });
  }
};
exports.detail = async (req, res) => {
  try {
    const { id } = req.query;
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: await BillRepo.findOderAllStoreDetail(id),
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get oder fail!",
    });
  }
};
