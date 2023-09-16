var path = require("path");
const fs = require("fs");

const httpStatus = require("../../../configs/httptatus");
const { sequelize } = require("../../../databases/models");
const ProductsSizeRepo = require("../../models/store/Sizes.store");
const ProductsRepo = require("../../models/store/products.store");

const deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("erro delete file:", err);
        return false; // erro
      }
      return true; // sussecc
    });
  }
};

exports.create = async (req, res) => {
  try {
    const user = req.user;

    const { name_product, detail, price, size, cg_id } = req.body;
    const parsedBrPrice = JSON.parse(price);
    const parsedBrSize = JSON.parse(size);

    let dataBeverageOption = [];
    parsedBrSize.map((i, index) => {
      dataBeverageOption.push({
        price: parsedBrPrice[index],
        size: i,
      });
    });
    // console.log("==:", JSON.stringify(dataBeverageOption));
    const newBeverage = {
      name_product,
      detail,
      image_product: req.fileResult,
      store_id: user.id,
      cg_id,
      options: JSON.stringify(dataBeverageOption),
    };
    const result = await ProductsRepo.create(newBeverage);

    return res.status(201).json({
      status: httpStatus.getStatus(201),
      data: "ok",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "create product fail!",
    });
  }
};
exports.getAll = async (req, res) => {
  try {
    const user = req.user;
    const { count, rows } = await ProductsRepo.findStore(user.id);
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      total: count,
      data: rows,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "get all product fail!",
    });
  }
};
exports.Acction = async (req, res) => {
  try {
    const store_id = req.user.id;
    const { id, acction } = req.body;
    const result = await ProductsRepo.updateStatus(id, store_id, acction);

    if (result == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update product fail!",
      });
    }
    res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "update acction sussecc",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "update product fail!",
    });
  }
};
exports.update2 = async (req, res) => {
  try {
    const { product_id, name_product, detail, price, size, cg_id } = req.body;

    const parsedBrPrice = JSON.parse(price);
    const parsedBrSize = JSON.parse(size);
    let dataBeverageOption = [];
    parsedBrSize.map((i, index) => {
      dataBeverageOption.push({
        price: parsedBrPrice[index],
        size: i,
      });
    });

    const updateData = {
      name_product,
      detail,

      cg_id,
      options: JSON.stringify(dataBeverageOption),
    };
    const result = await ProductsRepo.updateProduct(product_id, updateData);
    if (result == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update product fail!",
      });
    }

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "ok",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "update product fail!",
    });
  }
};
exports.update1 = async (req, res) => {
  try {
    const user = req.user;
    const { id, name_product, detail, price, size, cg_id } = req.body;

    const resultData = await ProductsRepo.findByPk(id);

    const parsedBrPrice = JSON.parse(price);
    const parsedBrSize = JSON.parse(size);
    let dataBeverageOption = [];
    parsedBrSize.map((i, index) => {
      dataBeverageOption.push({
        price: parsedBrPrice[index],
        size: i,
      });
    });

    const updateData = {
      name_product,
      detail,
      image_product: req.fileResult,
      cg_id,
      options: JSON.stringify(dataBeverageOption),
    };
    const result = await ProductsRepo.updateProduct(id, updateData);

    if (result == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update product fail!",
      });
    }

    if (resultData.image_product) {
      const sourcePath = `uploads/public/store/${user.id}/product/${resultData.image_product}`;
      deleteFile(sourcePath);
    }

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "ok",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "update product fail!",
    });
  }
};
exports.delete = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.body;
    const resultData = await ProductsRepo.findByPk(id);
    const result = await ProductsRepo.delete(id);
    if (result == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "delete product fail!",
      });
    }

    if (resultData.image_product) {
      const sourcePath = `uploads/public/store/${user.id}/product/${resultData.image_product}`;
      deleteFile(sourcePath);
    }

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "ok",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "delete product fail!",
    });
  }
};
