const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
const dotenv = require("dotenv").config();
const randToken = require("rand-token");
const Excel = require("exceljs");

const httpStatus = require("../../../configs/httptatus");
const { numberHash } = require("../../../config");
const AuthModel = require("../../models/auths.models");
const configJwt = require("../../../configs/jwt");
const moment = require("moment/moment");
const valiJwt = require("../../utils/jwtUtils");
const storesModels = require("../../models/stores.models");
const { sequelize } = require("../../../databases/models");
const OtpRepo = require("../../models/Otp.repo");
const {
  generateRandomNumbers,
  dateTime,
  SendOtp,
  SendForgotPassword,
} = require("../../../configs/sendOtp");
const authsModels = require("../../models/auths.models");

exports.Rigister = async (req, res) => {
  try {
    const { email, phone, password } = req.register;

    const checkPhoneNumber = await AuthModel.checkPhoneMail(phone, email);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number or email already in use!",
      });

    const hashPassword = bcrypt.hashSync(password, numberHash);
    const newData = { email, phone, password: hashPassword };
    await sequelize.transaction(async (transaction) => {
      await AuthModel.register(newData, transaction);
      const otp = generateRandomNumbers(100000, 999999);
      const dataOtp = {
        email,
        codes: otp,
        endAt: dateTime(3),
      };
      await OtpRepo.create(dataOtp, transaction);
      SendOtp(email, otp);
      return res.status(201).json({
        status: httpStatus.getStatus(201),
        data: "register sussecc!",
      });
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "register fail!",
    });
  }
};
exports.activated = async (req, res) => {
  try {
    const { email, code } = req.body;
    await OtpRepo.delete();

    const result = await AuthModel.checkMail(email, "");
    if (!result) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "email dose not exist!",
      });
    }

    if (!code) {
      const checkEmail = await OtpRepo.findEmail(email);
      if (checkEmail) {
        return res.status(400).json({
          status: httpStatus.getStatus(400),
          msg: "the otp code has not expired please resend later!",
        });
      }
      await sequelize.transaction(async (transaction) => {
        const otp = generateRandomNumbers(100000, 999999);
        const dataOtp = {
          email,
          codes: otp,
          endAt: dateTime(3),
        };
        await OtpRepo.create(dataOtp, transaction);
        SendOtp(email, otp);
        return res.status(200).json({
          status: httpStatus.getStatus(200),
          data: "send otp sussecc!",
        });
      });
      return;
    }

    const resultOtp = await OtpRepo.verify(email, code);
    if (resultOtp == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "wrong otp code!",
      });
    }
    const activated = await authsModels.activated(email);
    if (!activated) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "wrong otp code!",
      });
    }
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "activaved sussecc!",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "account not activated!",
    });
  }
};
exports.Login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    if (email && phone) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "can only enter phone number or gmail!",
      });
    }

    const user = await AuthModel.checkMail(email, phone);
    if (!user)
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "you are not registered!",
      });
    const comparePwd = await bcrypt.compareSync(password, user.password);
    if (!comparePwd) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "login fail!",
      });
    }
    if (user.status === 2)
      return res.status(403).send({
        status: httpStatus.getStatus(403),
        msg: "locked account!",
      });
    if (user.status === 1)
      return res.status(403).send({
        status: httpStatus.getStatus(403),
        msg: "account not acctive!",
      });
    const timeLifeToken = dotenv.parsed.TOKEN_LIFE || configJwt.accessTokenLife;
    const passwordToken =
      dotenv.parsed.PASSWORD_TOKEN || configJwt.accessTokenSecret;

    //Duy tri dang nhap
    const to_day = moment();

    const dataAccessToken = {
      user_id: user.id,
      expired_at: to_day.endOf("day"),
    };
    const accessToken = await valiJwt.generateToken(
      dataAccessToken,
      passwordToken,
      timeLifeToken
    );

    // tạo mã refreshtoke ngỗng nhiên
    let refresh_token = randToken.generate(configJwt.refreshTokenSize);
    // let refresh_token = await valiJwt.generateToken(
    //   dataAccessToken,
    //   passwordRefreshToken,
    //   timeLifeRefreshToken
    // );

    if (!user.refresh_token) {
      // nếu không tồn tại thì uodate
      await AuthModel.refreshToken(refresh_token, user.id);
    } else {
      // If this user already has a refresh token, get that refresh token from the database
      refresh_token = user.refresh_token;
    }

    const data = {
      accessToken,
      refresh_token,
      info: {
        id: user.id,
        user_name: user.user_name,
        phone: user.phone,
        email: user.email,
        status: user.status,
        image: user.image,
        address: user.address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "login fail!",
    });
  }
};
exports.CheckMailPhone = async (req, res) => {
  try {
    const { phone, email } = req.body;
    const checkPhoneNumber = await AuthModel.checkMail(email, phone);
    if (checkPhoneNumber)
      return res.status(409).json({
        status: httpStatus.getStatus(409),
        msg: "Phone number or email  already in use! please login",
      });

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "phone number  or email  is not used please register!",
    });
  } catch (error) {
    return res.status(400).json({
      status: httpStatus.getStatus(400),
      msg: "check your phone number  or email  fail!",
    });
  }
};

exports.refreshToken = async (req, res) => {
  // Get Bearer token from Headers
  const bearerToken = req.body.refreshToken;

  // if (!bearerToken || !bearerToken.startsWith("Bearer ")) {
  //   return res.status(401).send({
  //     status: httpStatus.getStatus(401),
  //     msg: "Bearer token not found!",
  //   });
  // }
  if (!bearerToken) {
    return res.status(401).send({
      status: httpStatus.getStatus(401),
      msg: "Bearer token not found!",
    });
  }
  const timeLifeToken = dotenv.parsed.TOKEN_LIFE || configJwt.accessTokenLife;
  const passwordToken =
    dotenv.parsed.PASSWORD_TOKEN || configJwt.accessTokenSecret;

  //  let refreshToken = bearerToken.slice(7);

  // Get username from payload
  const user = await AuthModel.findRefreshToken(bearerToken);

  if (!user) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "User does not exist!",
    });
  }

  // // Create new Access token
  const dataForAccessToken = {
    user_id: user.id,
  };

  const accessToken = await valiJwt.generateToken(
    dataForAccessToken,
    passwordToken,
    timeLifeToken
  );
  if (!accessToken) {
    return res.status(401).send({
      status: httpStatus.getStatus(401),
      msg: "Access token generation failed, please try again!",
    });
  }

  return res.status(200).json({
    status: httpStatus.getStatus(200),
    data: { accessToken },
  });
};
exports.logout = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await AuthModel.logout(id);

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "Ok",
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "logout fail!",
    });
  }
};
exports.updateUserName = async (req, res) => {
  try {
    const { id } = req.user;
    const { user_name } = req.body;
    const resultUser = await AuthModel.findUser(id);

    if (resultUser.user_name === user_name) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "data not change",
      });
    }
    const dataUpdate = {
      user_name: user_name,
    };

    const updateName = await AuthModel.update(dataUpdate, id);

    if (updateName == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update user name fail!",
      });
    }
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: {
        user_name: user_name,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "update user name fail!",
    });
  }
};
exports.updatePassword = async (req, res) => {
  try {
    const { id } = req.user;
    const { new_password, old_password } = req.body;
    const resultUser = await AuthModel.findUser(id);

    if (!resultUser.password) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "update password fail!",
      });
    }
    const comparePwd = await bcrypt.compareSync(
      old_password,
      resultUser.password
    );
    if (!comparePwd) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: " New passwords do not match !",
      });
    }
    const compareNewPass = await bcrypt.compareSync(
      new_password,
      resultUser.password
    );
    if (compareNewPass) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "data no change!",
      });
    }
    const dataUpdate = {
      password: bcrypt.hashSync(new_password, numberHash),
    };
    const updateName = await AuthModel.update(dataUpdate, id);
    if (updateName == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update password fail!",
      });
    }
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "ok",
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "update password fail!",
    });
  }
};
exports.updateAddess = async (req, res) => {
  try {
    const { id } = req.user;
    const { address } = req.body;
    const resultUser = await AuthModel.findUser(id);

    if (resultUser.address === address) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "data not change",
      });
    }
    const dataUpdate = {
      address: address,
    };

    const update = await AuthModel.update(dataUpdate, id);

    if (update == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update address fail!",
      });
    }
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: {
        address: address,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "update address fail!",
    });
  }
};

exports.updateAVT = async (req, res) => {
  try {
    const { id } = req.user;

    const resultUser = await AuthModel.findUser(id);

    const dataUpdate = {
      image: req.fileResult,
    };

    const update = await AuthModel.update(dataUpdate, id);

    if (update == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "update avatar fail!",
      });
    }
    if (resultUser) {
      if (resultUser.image) {
        const sourcePath = `uploads/public/user/${user.id}/avatar/${resultUser.image}`;
        deleteFile(sourcePath);
      }
    }
    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: {
        image: req.fileResult,
      },
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "update avatar fail!",
    });
  }
};
exports.forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const resultUser = await AuthModel.checkMail(email, "");

    if (!resultUser) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "email is incorrect!",
      });
    }
    if (!resultUser.email) {
      return res.status(400).send({
        status: httpStatus.getStatus(400),
        msg: "email is incorrect!",
      });
    }
    const password = `${generateRandomNumbers(1000000000, 9999999999)}`;
    const dataUpdate = {
      password: bcrypt.hashSync(password, numberHash),
    };

    const updateName = await AuthModel.forgotPassword(dataUpdate, email);
    if (updateName == 0) {
      return res.status(400).json({
        status: httpStatus.getStatus(400),
        msg: "forgot password fail!",
      });
    }

    SendForgotPassword(email, password);

    return res.status(200).json({
      status: httpStatus.getStatus(200),
      data: "ok",
    });
  } catch (error) {
    return res.status(400).send({
      status: httpStatus.getStatus(400),
      msg: "forgot password fail!",
    });
  }
};

// exports.t = async (req, res) => {
//   try {
//     console.log("1");
//     const filepath = path.join(
//       __dirname,
//       "..",
//       "..",
//       "..",
//       "databases",
//       "seeders",
//       "dvhcvn.xlsx"
//     );
//     console.log(filepath);
//     // Tạo một workbook từ tệp Excel
//     const workbook = new Excel.Workbook();
//     workbook.xlsx.readFile(filepath).then(() => {
//       // Chọn hoja bạn muốn truy vấn
//       const worksheet = workbook.getWorksheet("Sheet1");

//       const columnsArray = [];
//       const columnsArray1 = [];
//       const columnsArray2 = [];
//       // Lặp qua từng hàng trong hoja
//       worksheet.eachRow((row, rowNumber) => {
//         // if (rowNumber === 1) {
//         //   // Bỏ qua hàng đầu tiên nếu đó là tiêu đề
//         //   return;
//         // }

//         const rowData = row.values;
//         const existingColumn = columnsArray.find(
//           (column) => column.province_id === rowData[2]
//         );
//         if (!existingColumn) {
//           columnsArray.push({
//             province_id: rowData[2],
//             name: rowData[1],
//           });
//         }
//         const existingColumn1 = columnsArray1.find(
//           (column) => column.district_id === rowData[4]
//         );
//         if (!existingColumn1) {
//           columnsArray1.push({
//             district_id: rowData[4],
//             name: rowData[3],
//             province_id: rowData[2],
//           });
//         }
//         const existingColumn2 = columnsArray2.find(
//           (column) => column.wards_id === rowData[6]
//         );
//         if (!existingColumn2) {
//           columnsArray2.push({
//             wards_id: rowData[6],
//             name: rowData[5],
//             district_id: rowData[4],
//           });
//         }
//       });
//       console.log(columnsArray2);
//     });
//   } catch (error) {
//     console.log("err=>", error);
//     return res.status(400).send({
//       status: httpStatus.getStatus(400),
//       msg: "xxxxxxxxxxxxxxxxxx",
//     });
//   }
// };
